import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { Model } from 'mongoose';

import { MessagesEnum } from '../../common/enums';
import { TUserDocument, User } from '../../schemas/user.schema';
import TokenService from '../token/token.service';
import IUser from './interfaces/IUser';
import { IUserLogin } from './interfaces/IUserLogin';
import { IUserRegistry } from './interfaces/IUserRegistry';
import { IUserWithTokens } from './interfaces/IUserWithTokens';

@Injectable()
export default class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<TUserDocument>,
    private readonly tokenService: TokenService,
  ) {}

  public async registry(dto: IUserRegistry): Promise<IUser> {
    const { email, password, lastName, firstName } = dto;

    const candidate = await this.userModel.findOne({ email });

    if (candidate) {
      throw new HttpException(MessagesEnum.EMAIL_IS_BUSY, HttpStatus.CONFLICT);
    }

    const hashPassword = await hash(password, +process.env.SALT_ROUNDS);
    await this.userModel.create({ ...dto, password: hashPassword });

    const user = await this.userModel.findOne({ email });

    return { id: user.id, email, lastName, firstName };
  }

  public async login(dto: IUserLogin): Promise<IUserWithTokens> {
    const { email, password } = dto;
    const candidate = await this.userModel
      .findOne({ email })
      .select('+password');

    if (!candidate) {
      throw new HttpException(
        MessagesEnum.DATA_IS_NOT_CORRECT,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const match = await compare(password, candidate.password);
    if (!match) {
      throw new HttpException(
        MessagesEnum.DATA_IS_NOT_CORRECT,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const tokens = this.tokenService.generateTokens(candidate.id);
    await this.tokenService.saveToken(candidate.id, tokens.refreshToken);

    return {
      id: candidate.id,
      email,
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      ...tokens,
    };
  }

  public async logout(refreshToken: string): Promise<void> {
    await this.tokenService.removeToken(refreshToken);
  }
}

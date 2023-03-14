import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';

import ValidateParamIdDto from '../../common/dto/validate-id.dto';
import { RoutesEnum } from '../../common/enums';
import AuthGuard from '../../guards/auth.guard';
import ReqChangeUserDto from './dto/req/change-user.dto';
import ResGetUsersDto from './dto/req/get-user.dto';
import ResChangeUserDto from './dto/res/change-user.dto';
import UserService from './user.service';

@UseGuards(new AuthGuard())
@Controller(RoutesEnum.USERS)
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getUsers(): Promise<ResGetUsersDto[]> {
    return this.userService.getUsers();
  }

  @Delete(RoutesEnum.BY_ID)
  public async deleteUser(
    @Param() param: ValidateParamIdDto,
  ): Promise<{ message: string }> {
    return this.userService.deleteUser(param.id);
  }

  @Put(RoutesEnum.BY_ID)
  public async changeUser(
    @Param() param: ValidateParamIdDto,
    @Body() changeUserDto: ReqChangeUserDto,
  ): Promise<ResChangeUserDto> {
    return this.userService.changeUser(param.id, changeUserDto);
  }

  @Get(RoutesEnum.BY_ID)
  public async getUserById(
    @Param() param: ValidateParamIdDto,
  ): Promise<ResChangeUserDto> {
    return this.userService.getUserById(param.id);
  }
}

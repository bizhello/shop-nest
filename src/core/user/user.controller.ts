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
import UserEnum from '../../common/enums/user';
// import UserId from '../decorators/user-id.decorator';
import AuthGuard from '../guards/auth.guard';
import ReqChangeUserDto from './dto/req/change-user.dto';
import ResGetUsersDto from './dto/req/get-user.dto';
import ResChangeUserDto from './dto/res/change-user.dto';
import UserService from './user.service';

@UseGuards(new AuthGuard())
@Controller(UserEnum.USERS)
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getUsers(): Promise<ResGetUsersDto[]> {
    return this.userService.getUsers();
  }

  @Delete(UserEnum.BY_ID)
  public async deleteUser(
    @Param() param: ValidateParamIdDto,
  ): Promise<{ message: string }> {
    return this.userService.deleteUser(param.id);
  }

  @Put(UserEnum.BY_ID)
  public async changeUser(
    @Param() param: ValidateParamIdDto,
    @Body() changeUserDto: ReqChangeUserDto,
  ): Promise<ResChangeUserDto> {
    return this.userService.changeUser(param.id, changeUserDto);
  }
}

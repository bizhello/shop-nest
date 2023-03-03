import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';

import UserEnum from '../common/enums/user';
import ValidateParamIdDto from '../dto/validate-id.dto';
import ReqChangeUserDto from './dto/req/change-user.dto';
import ResGetUsersDto from './dto/req/get-user.dto';
import ResChangeUserDto from './dto/res/change-user.dto';
import UserService from './user.service';

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

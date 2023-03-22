import ValidateParamIdDto from '@app/common/dto/validate-id.dto';
import { RoutesEnum } from '@app/common/enums';
import ReqChangeUserDto from '@app/core/user/dto/req/change-user.dto';
import ResChangeUserDto from '@app/core/user/dto/res/change-user.dto';
import ResGetUsersDto from '@app/core/user/dto/res/get-user.dto';
import UserService from '@app/core/user/user.service';
import AuthGuard from '@app/guards/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';

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

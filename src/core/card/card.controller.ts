import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import ValidateParamIdDto from '../../common/dto/validate-id.dto';
import { ErrorsNameEnum, MessagesEnum, RoutesEnum } from '../../common/enums';
import AuthGuard from '../guards/auth.guard';
import CardService from './card.service';
import ReqChangeCardDto from './dto/req/change-card.dto';
import ReqCreateCardDto from './dto/req/create-card.dto';
import ResCardDto from './dto/res/card.dto';

@UseGuards(new AuthGuard())
@Controller(RoutesEnum.CARDS)
export default class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  public async getCards(): Promise<ResCardDto[]> {
    return this.cardService.getCards();
  }

  @Post()
  public async createCard(
    @Body() createCardDto: ReqCreateCardDto,
  ): Promise<ResCardDto> {
    try {
      return await this.cardService.createCard(createCardDto);
    } catch (error) {
      if (error.name === ErrorsNameEnum.VALIDATION) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
      if (error.name === ErrorsNameEnum.MONGO_SERVER) {
        throw new HttpException(
          MessagesEnum.CARD_TITLE_NOT_FOUND,
          HttpStatus.CONFLICT,
        );
      }
    }
  }

  @Delete(RoutesEnum.BY_ID)
  public async deleteCard(
    @Param() param: ValidateParamIdDto,
  ): Promise<{ message: string }> {
    return this.cardService.deleteCard(param.id);
  }

  @Put(RoutesEnum.BY_ID)
  public async changeCard(
    @Param() param: ValidateParamIdDto,
    @Body() changeCardDto: ReqChangeCardDto,
  ): Promise<ResCardDto> {
    try {
      return await this.cardService.changeCard(param.id, changeCardDto);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new HttpException(
          MessagesEnum.CARD_NOT_FOUND,
          HttpStatus.CONFLICT,
        );
      }
      if (error.name === ErrorsNameEnum.MONGO_SERVER) {
        throw new HttpException(
          MessagesEnum.CARD_TITLE_NOT_FOUND,
          HttpStatus.CONFLICT,
        );
      }
    }
  }
}

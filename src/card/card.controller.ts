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
} from '@nestjs/common';

import CardEnum from '../common/enums/card';
import ValidateParamIdDto from '../dto/validate-id.dto';
import CardService from './card.service';
import ReqChangeCardDto from './dto/req/change-card.dto';
import ReqCreateCardDto from './dto/req/create-card.dto';
import ResCardDto from './dto/res/card.dto';

@Controller('cards')
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
      if (error.name === CardEnum.ERROR_NAME_VALIDATION) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
      if (error.name === CardEnum.ERROR_NAME_MONGO_SERVER) {
        throw new HttpException(
          CardEnum.ERROR_MESSAGE_CARD_TITLE_NOT_FOUND,
          HttpStatus.CONFLICT,
        );
      }
    }
  }

  @Delete(CardEnum.PATH_BY_ID)
  public async deleteCard(
    @Param() param: ValidateParamIdDto,
  ): Promise<{ message: string }> {
    return this.cardService.deleteCard(param.id);
  }

  @Put(CardEnum.PATH_BY_ID)
  public async changeCard(
    @Param() param: ValidateParamIdDto,
    @Body() changeCardDto: ReqChangeCardDto,
  ): Promise<ResCardDto> {
    try {
      return await this.cardService.changeCard(param.id, changeCardDto);
    } catch (error) {
      if (error.name === CardEnum.ERROR_NAME_MONGO_SERVER) {
        throw new HttpException(
          CardEnum.ERROR_MESSAGE_CARD_TITLE_NOT_FOUND,
          HttpStatus.CONFLICT,
        );
      }
    }
  }
}

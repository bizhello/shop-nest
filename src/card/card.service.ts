/* eslint-disable @typescript-eslint/naming-convention */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import CardEnum from '../common/enums/card';
import { Card, TCardDocument } from '../schemas/card.schema';
import { ICard, ICardWithId, IChangeCard } from './interfaces/ICard';

@Injectable()
export default class CardService {
  constructor(
    @InjectModel(Card.name) private cardModel: Model<TCardDocument>,
  ) {}

  public async getCards(): Promise<ICardWithId[]> {
    const cards = await this.cardModel.find();
    const resCards = cards.map((card) => {
      const { _id, title, dateFrom, dateTo, count } = card;

      return { id: _id, title, dateFrom, dateTo, count };
    });

    return resCards;
  }

  public async createCard(createCardDto: ICard): Promise<ICardWithId> {
    const card = await this.cardModel.create(createCardDto);
    const { _id, title, dateFrom, dateTo, count } = card;

    return { id: _id, title, dateFrom, dateTo, count };
  }

  public async deleteCard(id: string): Promise<{ message: string }> {
    const card = await this.cardModel.findById(id);
    if (!card) {
      throw new HttpException(
        CardEnum.ERROR_MESSAGE_CARD_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.cardModel.deleteOne({ _id: id });

    return { message: CardEnum.MESSAGE_CARD_DELETE };
  }

  public async changeCard(
    id: string,
    changeCardDto: IChangeCard,
  ): Promise<ICardWithId> {
    const card = await this.cardModel.findByIdAndUpdate(id, changeCardDto, {
      new: true,
      runValidators: true,
    });

    if (!card) {
      throw new HttpException(
        CardEnum.ERROR_MESSAGE_CARD_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    const { _id, title, dateFrom, dateTo, count } = card;

    return { id: _id, title, dateFrom, dateTo, count };
  }
}

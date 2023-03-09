import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ErrorsNameEnum, MessagesEnum } from '../../common/enums';
import { Card, TCardDocument } from '../../schemas/card.schema';
import { ICard, ICardWithId, IChangeCard } from './interfaces/ICard';

@Injectable()
export default class CardService {
  constructor(
    @InjectModel(Card.name) private cardModel: Model<TCardDocument>,
  ) {}

  public async getCards(): Promise<ICardWithId[]> {
    const cards = await this.cardModel.find();
    const resCards = cards.map((card) => {
      const { id, title, dateFrom, dateTo, count } = card;

      return { id, title, dateFrom, dateTo, count };
    });

    return resCards;
  }

  public async createCard(createCardDto: ICard): Promise<ICardWithId> {
    const card = await this.cardModel.create(createCardDto);
    const { id, title, dateFrom, dateTo, count } = card;

    return { id, title, dateFrom, dateTo, count };
  }

  public async deleteCard(id: string): Promise<{ message: string }> {
    const card = await this.cardModel.findById(id);
    if (!card) {
      throw new HttpException(
        MessagesEnum.CARD_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.cardModel.deleteOne({ _id: id });

    return { message: MessagesEnum.CARD_DELETE };
  }

  public async incrementCard(id: string): Promise<{ status: string }> {
    const card = await this.cardModel.findById(id);
    card.count += 1;
    await card.save();
    if (!card) {
      throw new HttpException(
        MessagesEnum.CARD_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return { status: 'Ок' };
  }

  public async decrementCard(id: string): Promise<{ status: string }> {
    try {
      const card = await this.cardModel.findById(id);
      card.count -= 1;
      await card.save();
      if (!card) {
        throw new HttpException(
          MessagesEnum.CARD_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }

      return { status: 'Ок' };
    } catch (error) {
      if (error.name === ErrorsNameEnum.VALIDATION) {
        throw new HttpException(MessagesEnum.MIN_COUNT, HttpStatus.CONFLICT);
      }
    }
  }

  public async changeCard(
    userId: string,
    changeCardDto: IChangeCard,
  ): Promise<ICardWithId> {
    const card = await this.cardModel.findByIdAndUpdate(userId, changeCardDto, {
      new: true,
      runValidators: true,
    });

    if (!card) {
      throw new HttpException(
        MessagesEnum.CARD_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    const { id, title, dateFrom, dateTo, count } = card;

    return { id, title, dateFrom, dateTo, count };
  }
}

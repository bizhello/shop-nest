import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Card, cardSchema } from '../../schemas/card.schema';
import CardController from './card.controller';
import CardService from './card.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: cardSchema }]),
  ],
  controllers: [CardController],
  providers: [CardService],
})
export default class CardModule {}

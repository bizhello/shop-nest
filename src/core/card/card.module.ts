import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThrottlerGuard } from '@nestjs/throttler';

import { Card, cardSchema } from '../../schemas/card.schema';
import CardController from './card.controller';
import CardService from './card.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: cardSchema }]),
  ],
  controllers: [CardController],
  providers: [
    CardService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export default class CardModule {}

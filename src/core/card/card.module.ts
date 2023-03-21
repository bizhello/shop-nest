import CardController from '@app/core/card/card.controller';
import CardService from '@app/core/card/card.service';
import { Card, cardSchema } from '@app/schemas/card.schema';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThrottlerGuard } from '@nestjs/throttler';

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

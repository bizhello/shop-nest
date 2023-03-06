enum CardEnum {
  ERROR_MESSAGE_CARD_NOT_FOUND = 'Такой карточки не существует',
  ERROR_MESSAGE_CARD_TITLE_NOT_FOUND = 'Название такой карточки уже существует',
  MESSAGE_CARD_DELETE = 'Карточка удалена',
  ERROR_NAME_VALIDATION = 'ValidationError',
  ERROR_NAME_MONGO_SERVER = 'MongoServerError',
  PATH_BY_ID = ':id',
  CARDS = 'cards',
}

export default CardEnum;

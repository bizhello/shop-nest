enum TextEnum {
  REFRESH_TOKEN = 'refreshToken',
  USER = 'User',
  IMAGE = 'image',
}

enum RoutesEnum {
  BY_ID = ':id',
  REGISTRY = 'registry',
  LOGIN = 'login',
  REFRESH = 'refresh',
  LOGOUT = 'logout',
  USERS = 'users',
  CARDS = 'cards',
  DECREMENT = 'decrement',
  INCREMENT = 'increment',
  IMAGES = 'images',
}

enum ErrorsNameEnum {
  VALIDATION = 'ValidationError',
  MONGO_SERVER = 'MongoServerError',
}

enum MessagesEnum {
  EMAIL_IS_BUSY = 'Пользователь с таким email уже существует',
  DATA_IS_NOT_CORRECT = 'Неправильно указан логин и/или пароль',
  EXIT = 'Выход',
  EXIT_REPEAT = 'Вы уже вышли из системы',
  AUTH_ERROR = 'Пользователь не авторизован',
  USER_NOT_FOUND = 'Такого пользователя не существует',
  USER_DELETE = 'Пользователь удален',
  CARD_NOT_FOUND = 'Такой карточки не существует',
  CARD_TITLE_NOT_FOUND = 'Название такой карточки уже существует',
  CARD_DELETE = 'Карточка удалена',
  CORS = 'Not allowed by CORS',
  MIN_COUNT = 'Значение должно быть больше 0',
  TOKEN_NOT_VALID = 'Токен не валидный',
  IMAGE_NOT_FOUND = 'Картинка не найдена',
}

export { ErrorsNameEnum, MessagesEnum, RoutesEnum, TextEnum };

enum TokenEnum {
  REFRESH_TOKEN = 'refreshToken',
  ERROR_USER_NOT_FOUND = 'Такого пользователя не существует',
  USER_DELETE = 'Пользователь удален',
  PATH = 'refresh',
  AUTH_ERROR = 'Пользователь не авторизован',
  TOKEN_TIME_ACCESS = '15m',
  TOKEN_TIME_REFRESH = '30d',
}

export default TokenEnum;

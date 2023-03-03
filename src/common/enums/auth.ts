enum AuthEnum {
  ERROR_MESSAGE_EMAIL_IS_BUSY = 'Пользователь с таким email уже существует',
  ERROR_MESSAGE_DATA_IS_NOT_CORRECT = 'Неправильно указан логин и/или пароль',
  PATH_REGISTRY = 'registry',
  PATH_LOGIN = 'login',
  PATH_LOGOUT = 'logout',
  NAME_REFRESH_TOKEN = 'refreshToken',
  MESSAGE_EXIT = 'Выход',
  MESSAGE_EXIT_REPEAT = 'Вы уже вышли из системы',
}

export default AuthEnum;

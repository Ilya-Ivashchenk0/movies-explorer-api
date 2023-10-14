const LoginSuccessfulMessage = 'Вход выполнен успешно!'
const LogoutMessage = 'Вы вышли из аккаунта!'
const DeletedMovieMessage = 'Фильм удален успешно.'

const ValidationErrorMessage = 'Переданы некорректные данные при обновлении профиля.'
const DublicateEmailErrorMessage = 'Пользователь с таким email уже существует.'
const InternalServerErrorMessage = 'На сервере произошла ошибка.'
const ForbiddenErrorMessage = 'У вас недостаточно прав для удаления этого фильма!'
const BadRequestErrorMessage = 'Пользователь с указанными логином и паролем не найден.'
const NotFoundErrorMessage = 'Пользователь с указанным _id не найден.'
const UnauthorizedErrorMessage = 'Необходима авторизация!'
const LostRouteErrorMessage = 'Был запрошен несуществующий роут.'
const LostMovieMessage = 'Фильм не найден!'

module.exports = {
  InternalServerErrorMessage,
  ForbiddenErrorMessage,
  BadRequestErrorMessage,
  NotFoundErrorMessage,
  LoginSuccessfulMessage,
  UnauthorizedErrorMessage,
  LogoutMessage,
  LostMovieMessage,
  DeletedMovieMessage,
  DublicateEmailErrorMessage,
  ValidationErrorMessage,
  LostRouteErrorMessage
}

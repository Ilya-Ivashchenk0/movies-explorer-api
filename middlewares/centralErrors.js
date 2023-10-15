const BadRequestError = require('../errors/BadRequestError')
const ForbiddenError = require('../errors/ForbiddenError')
const NotFoundError = require('../errors/NotFoundError')
const UnauthorizedError = require('../errors/UnauthorizedError')

const {
  InternalServerErrorMessage,
  DublicateEmailErrorMessage,
  ValidationErrorMessage,
  NotFoundErrorMessage
} = require('../utils/errorMessages')

module.exports = (err, req, res, next) => {
  let statusCode = 500
  let message = InternalServerErrorMessage

  if (err instanceof BadRequestError) {
    statusCode = err.statusCode
    message = err.message
  }

  if (err instanceof ForbiddenError) {
    statusCode = err.statusCode
    message = err.message
  }

  if (err instanceof BadRequestError) {
    statusCode = err.statusCode
    message = err.message
  }

  if (err instanceof NotFoundError) {
    statusCode = err.statusCode
    message = err.message
  }

  if (err instanceof UnauthorizedError) {
    statusCode = err.statusCode
    message = err.message
  }

  if (err.code === 11000) {
    statusCode = 409
    message = DublicateEmailErrorMessage
  }

  if (err.name === 'ValidationError') {
    statusCode = 400
    message = ValidationErrorMessage
  }

  if (err.name === 'CastError') {
    statusCode = 400
    message = NotFoundErrorMessage
  }

  res.status(statusCode).send({ message })
}

const DeleteMovieError = require('../errors/delete-movie-error')
const LostMovieError = require('../errors/lost-movie-error')
const MissDataError = require('../errors/miss-data-error')
const MissUserError = require('../errors/miss-user-error')
const UserDataError = require('../errors/user-data-error')

const {
  defaultErrorMessage,
  dublicateEmailMessage,
  dataErrorMessage,
  missUserErrorMessage
} = require('../utils/constsMessages')

module.exports = (err, req, res, next) => {
  let statusCode = 500
  let message = defaultErrorMessage

  if (err instanceof DeleteMovieError) {
    statusCode = err.statusCode
    message = err.message
  }

  if (err instanceof LostMovieError) {
    statusCode = err.statusCode
    message = err.message
  }

  if (err instanceof MissDataError) {
    statusCode = err.statusCode
    message = err.message
  }

  if (err instanceof MissUserError) {
    statusCode = err.statusCode
    message = err.message
  }

  if (err instanceof UserDataError) {
    statusCode = err.statusCode
    message = err.message
  }

  if (err.code === 11000) {
    statusCode = 409
    message = dublicateEmailMessage
  }

  if (err.name === 'ValidationError') {
    statusCode = 400
    message = dataErrorMessage
  }

  if (err.name === 'CastError') {
    statusCode = 400
    message = missUserErrorMessage
  }

  res.status(statusCode).send({ message })
}

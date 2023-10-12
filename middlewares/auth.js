const jwt = require('jsonwebtoken')
const { authErrorMessage } = require('./validation')
const AuthError = require('../errors/auth-error')

module.exports = (req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    return next(new AuthError(authErrorMessage))
  }

  let payload

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET)
  } catch (e) {
    return next(new AuthError(authErrorMessage))
  }

  req.user = payload

  return next()
}

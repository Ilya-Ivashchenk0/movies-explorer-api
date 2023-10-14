const jwt = require('jsonwebtoken')
const { UnauthorizedErrorMessage } = require('../utils/errorMessages')
const UnauthorizedError = require('../errors/UnauthorizedError')
const { jwtToken } = require('../utils/checkProd')

module.exports = (req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    throw new UnauthorizedError(UnauthorizedErrorMessage)
  }

  let payload

  try {
    payload = jwt.verify(token, jwtToken)
  } catch (e) {
    throw new UnauthorizedError(UnauthorizedErrorMessage)
  }

  req.user = payload

  return next()
}

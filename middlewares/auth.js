const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    return next(new Error('Необходима авторизация', 401))
  }

  let payload

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET)
  } catch (e) {
    return next(new Error('Необходима авторизация', 401))
  }

  req.user = payload

  return next()
}

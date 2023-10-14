const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { jwtToken } = require('../utils/checkProd')
const BadRequestError = require('../errors/BadRequestError')
const NotFoundError = require('../errors/NotFoundError')
const UnauthorizedError = require('../errors/UnauthorizedError')
const {
  LoginSuccessfulMessage,
  BadRequestErrorMessage,
  NotFoundErrorMessage,
  LogoutMessage
} = require('../utils/errorMessages')

module.exports.getUserInfo = (req, res, next) => {
  const userId = req.user._id

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NotFoundErrorMessage)
      }
      return res.status(200).send({ data: user })
    })
    .catch(next)
}

module.exports.updateUserInfo = (req, res, next) => {
  const { email, name } = req.body

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ data: user }))
    .catch(next)
}

module.exports.register = (req, res, next) => {
  const {
    email,
    password,
    name
  } = req.body

  if (!email && !password) {
    throw new BadRequestError(BadRequestErrorMessage)
  }

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name
    }))
    .then((user) => res.status(201).send({ _id: user._id, email: user.email }))
    .catch(next)
}

module.exports.login = (req, res, next) => {
  const { email, password } = req.body

  if (!email && !password) {
    throw new UnauthorizedError(BadRequestErrorMessage)
  }

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(BadRequestErrorMessage)
      }

      return bcrypt.compare(password, user.password)
        .then((check) => {
          if (!check) {
            throw new UnauthorizedError(BadRequestErrorMessage)
          }
          const token = jwt.sign(
            { _id: user._id },
            jwtToken,
            { expiresIn: '7d' }
          )

          return res.cookie('token', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: true
          })
            .status(200)
            .send({ message: LoginSuccessfulMessage })
        })
    })
    .catch(next)
}

module.exports.signout = (req, res, next) => res.clearCookie('token').status(200).send({ message: LogoutMessage })

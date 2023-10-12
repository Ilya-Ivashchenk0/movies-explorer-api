const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const UserDataError = require('../errors/user-data-error')
const MissDataError = require('../errors/miss-data-error')
const MissUserError = require('../errors/miss-user-error')
const {
  userDataErrorMessage,
  loginSuccessfulMessage,
  missDataErrorMessage,
  missUserErrorMessage,
  logoutMessage
} = require('../utils/constsMessages')

module.exports.getUserInfo = (req, res, next) => {
  const userId = req.user._id

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return next(new MissUserError(missUserErrorMessage))
      }
      return res.status(200).send({ data: user })
    })
    .catch((err) => next(err))
}

module.exports.updateUserInfo = (req, res, next) => {
  const { email, name } = req.body

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err))
}

module.exports.register = (req, res, next) => {
  const {
    email,
    password,
    name
  } = req.body

  if (!email && !password) {
    return next(new UserDataError(userDataErrorMessage))
  }

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name
    }))
    .then((user) => res.status(201).send({ _id: user._id, email: user.email }))
    .catch((err) => next(err))
}

module.exports.login = (req, res, next) => {
  const { email, password } = req.body

  if (!email && !password) {
    return next(new UserDataError(userDataErrorMessage))
  }

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new MissDataError(missDataErrorMessage))
      }

      return bcrypt.compare(password, user.password)
        .then((check) => {
          if (!check) {
            return next(new UserDataError(userDataErrorMessage))
          }
          const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
          )

          return res.cookie('token', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: true
          })
            .status(200)
            .send({ message: loginSuccessfulMessage })
        })
    })
    .catch((err) => next(err))
}

module.exports.logout = (req, res, next) => res.clearCookie('token').status(200).send({ message: logoutMessage })

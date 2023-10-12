const { celebrate, Joi, Segments } = require('celebrate')

const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30),
    name: Joi.string().required().min(2).max(30)
  })
})

const validateNewMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required(),
    trailerLink: Joi.string().uri().required(),
    thumbnail: Joi.string().uri().required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required()
  })
})

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(8)
  })
})

const validateMovieId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required()
  })
})

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    userId: Joi.string().hex().length(24).required()
  })
})

module.exports = {
  validateUser,
  validateNewMovie,
  validateLogin,
  validateMovieId,
  validateUserInfo
}

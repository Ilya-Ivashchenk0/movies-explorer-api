const { celebrate, Joi } = require('celebrate')

const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30)
  })
})

const validateNewMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required(),
    trailer: Joi.string().uri().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().uri().required(),
    movieId: Joi.number().required()
  })
})

module.exports = {
  validateUser,
  validateNewMovie
}

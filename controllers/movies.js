const Movie = require('../models/movie')

module.exports.getAllMovies = (req, res, next) => Movie.find({})
  .then((movies) => res.send(movies))
  .catch((err) => next(err))

module.exports.postNewMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId
  } = req.body

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN
  })
    .then((movie) => res.send(movie))
    .catch((err) => next(err))
}

module.exports.deleteMovieById = (req, res, next) => Movie.findByIdAndDelete(req.params.cardId)
  .then((movie) => res.send(movie))
  .catch((err) => next(err))

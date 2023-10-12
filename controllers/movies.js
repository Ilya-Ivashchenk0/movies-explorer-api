const Movie = require('../models/movie')
const DeleteMovieError = require('../errors/delete-movie-error')
const LostMovieError = require('../errors/delete-movie-error')
const { deleteErrorMessage, lostMovieMessage, deletedMovieMessage } = require('../utils/constsMessages')

module.exports.getAllMovies = (req, res, next) => {
  const userId = req.user._id

  Movie.find({ owner: userId })
    .then((movies) => res.send(movies))
    .catch((err) => next(err))
}

module.exports.postNewMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN
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
    owner,
    movieId,
    nameRU,
    nameEN
  })
    .then((movie) => res.send(movie))
    .catch((err) => next(err))
}

module.exports.deleteMovieById = (req, res, next) => {
  const { movieId } = req.params
  const userId = req.user._id

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return next(new LostMovieError(lostMovieMessage))
      }

      if (movie.owner !== userId) {
        return next(new DeleteMovieError(deleteErrorMessage))
      }

      return Movie.findByIdAndDelete(movieId)
    })
    .then(() => res.send({ message: deletedMovieMessage }))
    .catch((err) => next(err))
}

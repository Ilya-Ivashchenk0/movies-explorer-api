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
  const ownerId = req.user._id
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
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
    trailerLink,
    thumbnail,
    owner: ownerId,
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
        throw new LostMovieError(lostMovieMessage)
      }

      if (movie.owner.toString() !== userId) {
        throw new DeleteMovieError(deleteErrorMessage)
      }

      Movie.findByIdAndDelete(movieId)
        .then(() => res.send({ message: deletedMovieMessage }))
        .catch((err) => next(err))
    })
    .catch((err) => next(err))
}

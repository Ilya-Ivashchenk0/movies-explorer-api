const Movie = require('../models/movie')
const ForbiddenError = require('../errors/ForbiddenError')
const NotFoundError = require('../errors/NotFoundError')
const { ForbiddenErrorMessage, LostMovieMessage, DeletedMovieMessage } = require('../utils/errorMessages')

module.exports.getAllMovies = (req, res, next) => {
  const userId = req.user._id

  Movie.find({ owner: userId })
    .then((movies) => res.send(movies))
    .catch(next)
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
    .catch(next)
}

module.exports.deleteMovieById = (req, res, next) => {
  const { movieId } = req.params
  const userId = req.user._id

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(LostMovieMessage)
      }

      if (movie.owner.toString() !== userId) {
        throw new ForbiddenError(ForbiddenErrorMessage)
      }

      Movie.findByIdAndDelete(movieId)
        .then(() => res.send({ message: DeletedMovieMessage }))
        .catch(next)
    })
    .catch(next)
}

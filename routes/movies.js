const router = require('express').Router()

const {
  getAllMovies,
  postNewMovie,
  deleteMovieById
} = require('../controllers/movies')

router.get('/', getAllMovies)
router.post('/', postNewMovie)
router.delete('/:_id', deleteMovieById)

module.exports = router

const router = require('express').Router()
const { validateNewMovie } = require('../middlewares/validation')

const {
  getAllMovies,
  postNewMovie,
  deleteMovieById
} = require('../controllers/movies')

router.get('/', getAllMovies)
router.post('/', validateNewMovie, postNewMovie)
router.delete('/:_id', deleteMovieById)

module.exports = router

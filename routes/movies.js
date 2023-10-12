const router = require('express').Router()
const { validateNewMovie, validateMovieId } = require('../middlewares/validation')

const {
  getAllMovies,
  postNewMovie,
  deleteMovieById
} = require('../controllers/movies')

router.get('/', getAllMovies)
router.post('/', validateNewMovie, postNewMovie)
router.delete('/:_id', validateMovieId, deleteMovieById)

module.exports = router

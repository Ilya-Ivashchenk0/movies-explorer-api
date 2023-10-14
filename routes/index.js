const router = require('express').Router()
const auth = require('../middlewares/auth')
const { register, login, signout } = require('../controllers/users')
const { validateLogin, validateRegister } = require('../middlewares/validation')
const NotFoundError = require('../errors/NotFoundError')
const { LostRouteErrorMessage } = require('../utils/errorMessages')

router.post('/signup', validateRegister, register)
router.post('/signin', validateLogin, login)

router.use(auth)

router.delete('/signout', signout)

router.use('/users', require('./users'))
router.use('/movies', require('./movies'))

router.use((req, res, next) => {
  throw new NotFoundError(LostRouteErrorMessage)
})

module.exports = router

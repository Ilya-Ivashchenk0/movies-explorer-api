const router = require('express').Router()
const auth = require('../middlewares/auth')
const { register, login, logout } = require('../controllers/users')
const { validateLogin, validateUser } = require('../middlewares/validation')

router.post('/signup', validateUser, register)
router.post('/signin', validateLogin, login)

router.use(auth)

router.use('/logout', logout)

router.use('/users', require('./users'))
router.use('/movies', require('./movies'))

module.exports = router

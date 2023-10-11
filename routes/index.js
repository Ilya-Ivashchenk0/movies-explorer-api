const router = require('express').Router()
const auth = require('../middlewares/auth')
const { register, login, logout } = require('../controllers/users')

router.post('/signup', register)
router.post('/signin', login)

router.use(auth)

router.use('/logout', logout)

router.use('/users', require('./users'))
router.use('/movies', require('./movies'))

module.exports = router

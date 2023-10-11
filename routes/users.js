const router = require('express').Router()
const { validateUser } = require('../middlewares/validation')

const {
  getUserInfo,
  updateUserInfo
} = require('../controllers/users')

router.get('/me', getUserInfo)
router.patch('/me', validateUser, updateUserInfo)

module.exports = router

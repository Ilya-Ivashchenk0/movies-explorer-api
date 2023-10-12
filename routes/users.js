const router = require('express').Router()
const { validateUser, validateUserInfo } = require('../middlewares/validation')

const {
  getUserInfo,
  updateUserInfo
} = require('../controllers/users')

router.get('/me', validateUserInfo, getUserInfo)
router.patch('/me', validateUser, updateUserInfo)

module.exports = router

const router = require('express').Router()
const { validateUser, validatUserInfo } = require('../middlewares/validation')

const {
  getUserInfo,
  updateUserInfo
} = require('../controllers/users')

router.get('/me', validatUserInfo, getUserInfo)
router.patch('/me', validateUser, updateUserInfo)

module.exports = router

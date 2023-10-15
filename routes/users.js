const router = require('express').Router()
const { validatePatchUser } = require('../middlewares/validation')

const {
  getUserInfo,
  updateUserInfo
} = require('../controllers/users')

router.get('/me', getUserInfo)
router.patch('/me', validatePatchUser, updateUserInfo)

module.exports = router

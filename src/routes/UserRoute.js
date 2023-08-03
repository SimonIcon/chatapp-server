const express = require('express')
const { registerUsers, loginUser, findUserById, getUsers } = require('../controllers/userControllers')



const router = express.Router()

router.post('/register', registerUsers)
router.post('/login', loginUser)
router.get('/find/:userId', findUserById)
router.get("/", getUsers)

module.exports = router
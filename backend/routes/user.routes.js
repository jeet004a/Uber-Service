const express = require('express')
const router = express.Router()
const AppLogs = require('../utils/api-request')

const { body } = require('express-validator')
const userController = require('../controllers/user.controllers')
const userAuth = require('../middlewares/auth.middleware')


router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('FirstName must be atleast 3 character'),
    body('password').isLength({ min: 6 }).withMessage('Password Must be 6 character long')
], AppLogs, userController.registerUser)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password Must be 6 character long')
], userController.loginUser)


router.get('/profile', userAuth.authUser, AppLogs, userController.getUserProfile)

router.get('/logout', userAuth.authUser, AppLogs, userController.logoutUser)




module.exports = router
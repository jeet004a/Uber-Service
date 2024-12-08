const express = require('express')
const router = express.Router()

const { body } = require('express-validator')
const userController = require('../controllers/user.controllers')
const userAuth = require('../middlewares/auth.middleware')


router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('FirstName must be atleast 3 character'),
    body('password').isLength({ min: 6 }).withMessage('Password Must be 6 character long')
], userController.registerUser)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password Must be 6 character long')
], userController.loginUser)


router.get('/profile', userAuth.authUser, userController.getUserProfile)

router.get('/logout', userAuth.authUser, userController.logoutUser)




module.exports = router
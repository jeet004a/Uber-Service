const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const captainController = require('../controllers/captain.controller')
const captainAuth = require('../middlewares/auth.middleware')
const AppLogs = require('../utils/api-request')

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('Firstname must be atleast 3 character long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 character long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Vehicle color must be 3 caharacter long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Vehicle plate must be atleast 6 character long'),
    body('vehicle.capacity').isLength({ min: 1 }).withMessage('Vechile capacity must be atleast 1 character long'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('invalid vehicle type'),
], captainController.registerCaptain, AppLogs)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 character long')
], AppLogs, captainController.loginCaptain)


router.get('/profile', captainAuth.authCaptain, AppLogs, captainController.getCaptainProfile)

router.get('/logout', captainAuth.authCaptain, AppLogs, captainController.logoutCaptain)


module.exports = router
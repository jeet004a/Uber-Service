const express = require('express')
const router = express.Router()
const rideController = require('../controllers/ride.controller')
const { body, query } = require("express-validator")
const userAuth = require('../middlewares/auth.middleware')
const AppLogs = require('../utils/api-request')



router.post('/create',
    // body('userId').isString().isLength({ min: 24, max: 24 }).withMessage('Invalid User ID'),
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid Pickup Address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid Destination Address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid Vehicle Type'),
    userAuth.authUser,
    AppLogs,
    rideController.createRide
)


router.get('/get-fare',
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid Pickup Address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid Destination Address'),
    userAuth.authUser,
    AppLogs,
    rideController.getFare
)


router.post('/confirm', userAuth.authCaptain, AppLogs,
    body('rideId').isMongoId().withMessage('Invalid ride id'), rideController.confirmRide
)

router.get('/start-ride', userAuth.authCaptain, AppLogs,
    query('rideId').isMongoId().withMessage('invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('invalid OTP'),
    rideController.startRide
)

router.post('/end-ride', userAuth.authCaptain, AppLogs,
    body('rideId').isMongoId().withMessage('invalid ride id'),
    rideController.endRide
)



module.exports = router;
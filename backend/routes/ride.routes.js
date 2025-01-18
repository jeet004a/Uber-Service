const express = require('express')
const router = express.Router()
const rideController = require('../controllers/ride.controller')
const { body, query } = require("express-validator")
const userAuth = require('../middlewares/auth.middleware')


router.post('/create',
    // body('userId').isString().isLength({ min: 24, max: 24 }).withMessage('Invalid User ID'),
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid Pickup Address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid Destination Address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid Vehicle Type'),
    userAuth.authUser,
    rideController.createRide
)


router.get('/get-fare',
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid Pickup Address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid Destination Address'),
    userAuth.authUser,
    rideController.getFare
)



module.exports = router;
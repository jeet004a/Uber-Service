const rideService = require('../services/ride.service')
const { validationResult } = require('express-validator')
const mapService = require('../services/maps.service')
const { sendMessageToSocketId } = require('../socket')
const rideModel = require('../models/ride.model')


module.exports.createRide = async(req, res, next) => {
    const erros = validationResult(req)

    if (!erros.isEmpty()) {
        return res.status(400).json({ errors: erros.array() })
    }

    const { user, pickup, destination, vehicleType } = req.body
        // console.log(req.user)
    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType })
        res.status(200).json(ride)

        const pickupCoordinates = await mapService.getCoordinates(pickup)
            // console.log(pickupCoordinates)

        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2)
        ride.otp = ""
        console.log(pickupCoordinates)
            // console.log(captainsInRadius)

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user')

        captainsInRadius.map(captain => {
            // console.log(captain, ride)
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        })

    } catch (error) {
        res.status(500).json({ message: 'Unable to create ride' })
    }

}


module.exports.getFare = async(req, res, next) => {
    const erros = validationResult(req)

    if (!erros.isEmpty()) {
        return res.status(400).json({ errors: erros.array() })
    }
    const { pickup, destination } = req.query
        // console.log(pickup)
    try {
        const ride = await rideService.getFare(pickup, destination)
            // console.log(ride)
        res.status(200).json(ride)
    } catch (error) {
        res.status(500).json({ message: 'Unable to get fare' })
    }
}



module.exports.confirmRide = async(req, res, next) => {
    const erros = validationResult(req)

    if (!erros.isEmpty()) {
        return res.status(400).json({ errors: erros.array() })
    }

    const { rideId } = req.body

    try {

        const ride = await rideService.confirmRide({ rideId, captain: req.captain })

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride)

    } catch (error) {
        return res.status(500).json({ messsage: error.message })
    }

}



module.exports.startRide = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


module.exports.endRide = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.body
    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);

    } catch (error) {

    }
}
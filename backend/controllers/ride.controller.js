const rideService = require('../services/ride.service')
const { validationResult } = require('express-validator')


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
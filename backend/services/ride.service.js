const rideModel = require('../models/ride.model')
const mapService = require('./maps.service')
const crypto = require('crypto')

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required')
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination)

    // console.log(distanceTime)

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    }

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    }

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    }

    const fare = {
            auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
            car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
            moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
        }
        // console.log(fare)    
    return fare

}

module.exports.getFare = getFare


function generateOTP(num) {
    if (!num || num <= 0) {
        throw new Error('Number of digits must be greater than zero');
    }

    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
}

module.exports.createRide = async({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('User, Pickup, Destination and Vehicle Type are required')
    }


    const fare = await getFare(pickup, destination)
        // console.log(fare)

    const ride = await rideModel.create({
            user,
            pickup,
            destination,
            otp: generateOTP(6),
            fare: fare[vehicleType]
        })
        // console.log(ride)
    return ride
}
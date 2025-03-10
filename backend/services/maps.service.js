const axios = require('axios');
const { GOOGLE_MAPS_API_KEY } = require('../config');
const captainModel = require('../models/captain.model')


module.exports.getCoordinates = async(address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    // console.log(apiKey)
    try {
        const response = await axios.get(url);
        // console.log(response)
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        // console.error(error);
        throw error;
    }
    // return 'Hello'
}


module.exports.getDistanceTime = async(origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required')
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        // console.log(response)
        if (response.data.status === 'OK') {
            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No Routes found')
            }
            return response.data.rows[0].elements[0];
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}


module.exports.getAutoCompleteSuggestions = async(input) => {
    if (!input) {
        throw new Error('Input is required')
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url)
            // console.log('AAA', response)
        if (response.data.status == 'OK') {
            return response.data.predictions
        } else {
            throw new Error('Unable to fetch suggestions')
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}


module.exports.getCaptainsInTheRadius = async(ltd, lng, radius) => {
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [
                    [ltd, lng], radius / 6371
                ]
            }
        }
    });

    return captains
}
const mapsService = require('../services/maps.service')
const { validationResult } = require('express-validator')

module.exports.getCoordinates = async(req, res, next) => {

    const erros = validationResult(req)
    if (!erros.isEmpty()) {
        return res.status(400).json({ errors: erros.array() })
    }

    const { address } = req.query
        // console.log(req.query)

    try {
        const cordinates = await mapsService.getCoordinates(address)
            // console.log('AAA')
        res.status(200).json(cordinates)
    } catch (error) {
        res.status(500).json({ message: 'Unable to fetch coordinates' })
    }
}


module.exports.getDistanceTime = async(req, res, next) => {
    try {
        const erros = validationResult(req)
        if (!erros.isEmpty()) {
            return res.status(400).json({ errors: erros.array() })
        }
        const { origin, destination } = req.query
            // console.log(origin)
        const distanceTime = await mapsService.getDistanceTime(origin, destination)
            // console.log(distanceTime)
        res.status(200).json(distanceTime)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Unable to fetch coordinates' })
    }
}


module.exports.getAutoCompleteSuggestions = async(req, res, next) => {

    const erros = validationResult(req)
    if (!erros.isEmpty()) {
        return res.status(400).json({ errors: erros.array() })
    }
    const { input } = req.query
    try {
        const suggestion = await mapsService.getAutoCompleteSuggestions(input)
        res.status(200).json(suggestion)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Unable to fetch suggestions' })
    }
}
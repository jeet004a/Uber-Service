const express = require('express')
const router = express.Router()
const captainAuth = require('../middlewares/auth.middleware')
const userAuth = require('../middlewares/auth.middleware')
    // const { getCoordinates } = require('../services/maps.service')
const mapsController = require('../controllers/map.controller')
const { query } = require('express-validator')
const AppLogs = require('../utils/api-request')


router.get('/get-cordinates', query('address').isString().isLength({ min: 3 }), AppLogs, userAuth.authUser, mapsController.getCoordinates)


router.get('/get-distance-time', query('origin').isString().isLength({ min: 3 }), query('destination').isString().isLength({ min: 3 }), userAuth.authUser, mapsController.getDistanceTime, AppLogs)


router.get('/get-suggestions', query('input').isString().isLength({ min: 1 }), userAuth.authUser, AppLogs, mapsController.getAutoCompleteSuggestions)


module.exports = router
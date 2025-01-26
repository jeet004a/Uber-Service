const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { connectToDb } = require('./db/db')
const userRoutes = require('./routes/user.routes')
const cookieParser = require('cookie-parser')
const captainRoutes = require('./routes/captain.routes')
const rideRoutes = require('./routes/ride.routes')
const mapRoutes = require('./routes/maps.routes')
module.exports = async(app) => {
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(cookieParser())
    await connectToDb()
    app.use(express.json())

    app.get('/', async(req, res, next) => {
        res.send('Hello World')
    })

    app.use('/users', userRoutes)
    app.use('/captains', captainRoutes)
    app.use('/rides', rideRoutes)
    app.use('/maps', mapRoutes)
}
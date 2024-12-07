const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { connectToDb } = require('./db/db')
const userRoutes = require('./routes/user.routes')

module.exports = async(app) => {
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: true }))
    await connectToDb()
    app.use(express.json())

    app.get('/', async(req, res, next) => {
        res.send('Hello World')
    })

    app.use('/users', userRoutes)
}
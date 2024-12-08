const userModel = require('../models/user.model')
const captainModel = require('../models/captain.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blacklistToken = require('../models/blacklistToken.model')

module.exports.authUser = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1]
    if (!token) {
        return res.status(401).json({ "message": "Not Authorized" })
    }


    const blacklistTokendata = await blacklistToken.findOne({ token: token })

    // console.log(blacklistTokendata)

    if (blacklistTokendata) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const decoed = jwt.verify(token, process.env.JWT_SECRET)
            // console.log(decoed)
        const user = await userModel.findById(decoed._id)
            // console.log(user)
        req.user = user

        return next()
    } catch (error) {
        return res.status(401).json({ "message": error })
    }
}

module.exports.authCaptain = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1]

    if (!token) {
        return res.status(401).json('Not Authorized')
    }

    const blacklistTokendata = await blacklistToken.findOne({ token: token })

    // console.log(blacklistTokendata)

    if (blacklistTokendata) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {


        const decode = jwt.verify(token, process.env.JWT_SECRET)
            // console.log(decode)
        const captain = await captainModel.findById(decode._id)
            // console.log(decode)
        req.captain = captain

        return next()

    } catch (error) {
        return res.status(401).json({ message: error })
    }

}
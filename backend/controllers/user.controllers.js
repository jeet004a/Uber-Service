const userModel = require('../models/user.model')
const { validationResult } = require('express-validator')
const userService = require('../services/user.service')


module.exports.registerUser = async(req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty) {
        return res.status(401).json({ errors: errors.array() })
    }
    const { fullname, email, password } = req.body

    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
        return res.status(400).json({ message: "User already present" })
    }


    const hashedPassword = await userModel.hashPassword(password)

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    })

    // console.log(user)

    const token = user.generateAuthToken()

    res.status(201).json({
        user,
        token
    })
}



module.exports.loginUser = async(req, res, next) => {
    const errors = await validationResult(req)
    if (!errors.isEmpty) {
        return res.status(401).json({ error: errors.array() })
    }

    const { email, password } = req.body

    const user = await userModel.findOne({ email }).select('+password')

    if (!user) {
        return res.status(401).json({ message: 'invalid email or password' })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
        return res.status(401).json({ message: 'invalid email or password' })
    }

    const token = user.generateAuthToken()

    res.status(200).json({ token, user })

    // res.status(200).json(user)
}
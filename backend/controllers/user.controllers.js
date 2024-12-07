const userModel = require('../models/user.model')
const { validationResult } = require('express-validator')
const userService = require('../services/user.service')


module.exports.registerUser = async(req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty) {
        return res.status(401).json({ errors: errors.array() })
    }

    const { fullname, email, password } = req.body

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
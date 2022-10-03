const User = require("../models/User")
const crypto = require('crypto')
const bcryptjs = require('bcryptjs')

const userController = {
    signUp: async (req, res) => {
        let { name, lastName, email, password, photo, role } = req.body;

        try {
            let user = await User.findOne({mail})
            if (!user) {
                let logged = false
                let verified = false
                let code = crypto.randomBytes(15).toString('hex')

                if (from === 'form') {
                    password = bcryptjs.hashSync(password, 10)

                    user = await new User({name, lastName, email, password: [password], photo, role, logged, verified, from: [from], code}).save()
                    // agregar funcion para envío de mail
                    res.status(201).json({
                        message: 'User signed up',
                        success: true
                    })
                } else {
                    password = bcryptjs.hashSync(password, 10)
                    verified = true

                    user = await new User({name, lastName, email, password: [password], photo, role, logged, verified, from: [from], code}).save()

                    res.status(201).json({
                        message: 'User signed up from ' + from,
                        success: true
                    })
                }
            } else {
                if (user.from.includes(from)) {
                    res.status(200).json({
                        message: 'user already exists',
                        success: false
                    })
                } else {
                    user.from.push(from)
                    user.verified = true
                    password = bcryptjs.hashSync(password, 10)
                    user.password.push(password)
                    await user.save()
                    res.status(201).json({
                        message: 'user signed upfrom ' + from,
                        success: true
                    })
                }
            }
        } catch(error) {
            console.log(error)
            res.status(400).json({
                message: 'could not signed up',
                success: false
            })
        }
    }
}

module.exports = userController;
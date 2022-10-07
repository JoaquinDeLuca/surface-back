const User = require("../models/User")
const crypto = require('crypto')
const bcryptjs = require('bcryptjs')
const sendMail = require('./sendMail')
const Joi = require('Joi')
const jwt = require('jsonwebtoken')

const validator = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Zñ ]+$/).min(3).max(15).required().error(new Error('Name must have between 3 and 15 characters, letters only.')),
    lastName: Joi.string().pattern(/^[a-zA-Zñ ]+$/).min(3).max(15).required().error(new Error('Last name must have between 3 and 15 characters, letters only.')),
    email: Joi.alternatives().try(Joi.string()
      .lowercase()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ar", "org"] } }),
    )
      .required().error(new Error("Invalid email address")),
    photo: Joi.string().uri().required().error(new Error("Invalid photo url.")),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required().error(new Error("Password must be at least 6 characters long, containing letters and/or numbers.")),
    role: Joi.string().min(3).max(15).required(),
    from: Joi.string().min(3).max(15).required()
  })


const userController = {
    signUp: async (req, res) => {
        let { name, lastName, email, password, photo, role } = req.body;

        try {
            let result = await validator.validateAsync(req.body)
            let user = await User.findOne({email})
            if (!user) {
                let logged = false
                let verified = false
                let code = crypto.randomBytes(15).toString('hex')

                if (from === 'form') {
                    password = bcryptjs.hashSync(password, 10)

                    user = await new User({name, lastName, email, password: [password], photo, role, logged, verified, from: [from], code}).save()
                    sendMail(email, code)
                    res.status(201).json({
                      message: "User signed up succesfully, please verify your email and log in.",
                      success: true,
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
    },

    verifyMail: async (req, res) => {
        const { code } = req.params
        try {
            let user = await User.findOne({ code: code})
            if (user) {
                user.verified = true
                await user.save()
                res.redirect('http://localhost:3000/')
            } else {
                res.status(404).json({
                    message: 'Email has not account yet',
                    success: false,
                })
            }
        } catch (erorr) {
            console.log(error)
            res.status(400).json({
                message: 'Could not verify account',
                success: false,
            })
        }
    },
    
    signIn: async (req, res) => {
        const { email, password, from } = req.body
        try {
            const user = await User.findOne({ email })

            if (!user) { // Usuario no existe
                res.status(404).json({
                    message: 'This user is not registred, please sign up',
                    success: false
                })
            } else if (user.verified) { // Usuario existe y está verificado
                const checkPass = user.password.filter((passwordElement) => bcryptjs.compareSync(password, passwordElement))

                if (from == 'form') { // Ingresa por form
                    if (checkPass.length > 0) { // Contraseña coincide
                        const loginUser = {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            photo: user.photo
                        }
                        user.loggedIn = true
                        await user.save()

                        res.status(200).json({
                            success: true,
                            response: {user: loginUser},
                            message: 'Welcome ' + user.name
                        })
                    } else { // Contraseña NO coincide
                        res.status(400).json({
                            success: false,
                            message: 'Username or password incorrect'
                        })
                    }
                } else { // Ingresa por Red Social
                    if (checkPass.length > 0) { // Contraseña coincide
                        const loginUser = {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            photo: user.photo
                        }
                        user.loggedIn = true
                        await user.save()

                        res.status(200).json({
                            success: true,
                            response: {user: loginUser},
                            message: 'Welcome ' + user.name
                        })
                    } else { // Contraseña NO coincide
                        res.status(400).json({
                            success: false,
                            message: 'Invalid credentials'
                        })
                    }
                }
            } else { // Usuario existe y NO está verificado
                res.status(400).json({
                    success: false,
                    message: 'Please, verify your email account and try again'
                })
            }
        } catch(error) {
            console.log(error)
            res.status(400).json({
                succes: false,
                message: 'sign in error try again later'
            })
        }
    },

    signOut: async (req, res) => {
        const { _id } = req.body;
        try {
            const user = await User.findOne({ _id });

            user.loggedIn = false;
            await user.save();

            res.status(200).json({
            message: "Good bye " + user.name + " " + user.lastName,
            success: true,
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
            success: false,
            message: "Sign out error, try again later",
            });
        }
    },
}

module.exports = userController;
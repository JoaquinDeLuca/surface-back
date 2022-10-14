const adminPassport = require('passport')
const passportJwt = require('passport-jwt')

const {KEY_JWT} = process.env
const User = require('../models/User')

adminPassport.use(
    new passportJwt.Strategy(
        {
            jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: KEY_JWT
        },
        async (jwt_payload,done) => {
            try {
                let user = await User.findOne({_id:jwt_payload.id})
                if (user) {
                    if (user.role==='admin') {
                        user = {
                            userId: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            photo: user.photo,
                            buyer: user.buyer
                        }
                        return done(null, user)
                    } else {
                        return done(null, false)
                    }
                } else {
                    return done(null, false)
                }
            } catch (error) {
                console.log(error)
                return done(error,false)
            }
        }
    )
)

module.exports = adminPassport 
var express = require('express');
var router = express.Router();
const passport = require('../config/passport');


const {
    signUp,
    signIn,
    signOut,
    verifyMail,
    itsBuyer,
    verifyToken
} = require('../controllers/userController')

router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/token', passport.authenticate('jwt', {session:false}), verifyToken)
router.post('/signout', signOut)
router.get('/verification/:code', verifyMail)
router.post('/buyer', itsBuyer)

module.exports = router
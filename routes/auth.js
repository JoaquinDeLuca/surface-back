var express = require('express');
var router = express.Router();


const {
    signUp,
    signIn,
    signOut,
    verifyMail,
} = require('../controllers/userController')

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/signout', signOut)
router.get('/verification/:code', verifyMail)

module.exports = router
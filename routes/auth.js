var express = require('express');
var router = express.Router();


const {
    signUp,
    signIn,
    verifyMail,
} = require('../controllers/userController')

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/verification/:code', verifyMail)

module.exports = router
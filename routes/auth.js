var express = require('express');
var router = express.Router();


const {
    signUp,
    verifyMail,
} = require('../controllers/userController')

router.post('/signup', signUp)
router.post('/verification/:code', verifyMail)

module.exports = router
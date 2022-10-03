var express = require('express');
var router = express.Router();

const {
    create,
    readAll
} = require('../controllers/ShirtController')

router.post('/', create)
router.get('/', readAll)

module.exports = router
var express = require('express');
var router = express.Router();


const {
    create,
    readID,
    readQuery
} = require('../controllers/capControllers')

router.post('/', create)
router.get('/', readQuery)
router.get('/:id', readID)


module.exports = router
var express = require('express');
const shirt = require('./shirt');
const cap = require('./cap');
const buzo = require('./buzo');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Surface' });
});

router.use('/tshirts', shirt)
router.use('/caps', cap)
router.use('/buzos', buzo)
module.exports = router;

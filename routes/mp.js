var express = require("express");
var router = express.Router();


const { 
    createml,

} = require("../controllers/MercadoPago/mercaPagoController")



router.post("/", createml);

module.exports = router
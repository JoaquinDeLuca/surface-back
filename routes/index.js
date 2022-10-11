var express = require("express");
const shirt = require("./shirt");
const cap = require("./cap");
const buzo = require("./buzo");
const user = require("./auth");
const concurse = require("./concurse");
const products = require("./products");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Surface" });
});

router.use("/tshirts", shirt);
router.use("/caps", cap);
router.use("/buzos", buzo);
router.use("/auth", user);
router.use("/concurses", concurse);
router.use("/products", products);
module.exports = router;

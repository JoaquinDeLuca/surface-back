var express = require("express");
var router = express.Router();

const { getAll, getByIdAndType } = require("../controllers/productsController");

router.get("/", getAll);
router.get("/:type/:id", getByIdAndType);

module.exports = router;

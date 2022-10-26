var express = require("express");
var router = express.Router();

const { getAll, getByIdAndType, editProduct, deleteProduct } = require("../controllers/productsController");

router.get("/", getAll);
router.get("/:id", getByIdAndType);
router.patch("/edit", editProduct);
router.delete("/delete", deleteProduct);


module.exports = router;

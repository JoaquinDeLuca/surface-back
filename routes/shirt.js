var express = require("express");
var router = express.Router();

const {
  create,
  readAll,
  update,
  deleteShirt,
} = require("../controllers/ShirtController");

router.post("/", create);
router.get("/", readAll);
router.patch("/:id", update);
router.delete("/:id", deleteShirt);

module.exports = router;

var express = require("express");
var router = express.Router();

const {
  create,
  readAll,
  update,
  deleteShirt,
  readID,
} = require("../controllers/ShirtController");

router.post("/", create);
router.get("/", readAll);
router.get("/:id", readID);
router.patch("/:id", update);
router.delete("/:id", deleteShirt);

module.exports = router;

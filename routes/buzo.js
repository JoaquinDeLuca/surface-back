var express = require("express");
var router = express.Router();

const {
  create,
  readAll,
  update,
  deleteBuzo,
  readID,
} = require("../controllers/buzoController");

router.post("/", create);
router.get("/", readAll);
router.get("/:id", readID);
router.patch("/:id", update);
router.delete("/:id", deleteBuzo);

module.exports = router;

var express = require("express");
var router = express.Router();

const {
  create,
  readAll,
  update,
  deleteBuzo,
} = require("../controllers/buzoController");

router.post("/", create);
router.get("/", readAll);
router.patch("/:id", update);
router.delete("/:id", deleteBuzo);

module.exports = router;

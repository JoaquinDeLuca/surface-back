var express = require("express");
var router = express.Router();

const {
  create,
  readID,
  readQuery,
  update,
  deleteCap,
} = require("../controllers/capControllers");

router.post("/", create);
router.get("/", readQuery);
router.get("/:id", readID);
router.patch("/:id", update);
router.delete("/:id", deleteCap);

module.exports = router;

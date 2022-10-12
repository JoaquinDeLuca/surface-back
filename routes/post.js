var express = require("express");
var router = express.Router();

const { likeDislikePost } = require("../controllers/postController");

router.post("/", likeDislikePost);

module.exports = router;

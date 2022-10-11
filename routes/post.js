var express = require("express");
var router = express.Router();

const { likeDislikePost } = require("../controllers/postController");

router.get("/", likeDislikePost);

module.exports = router;

var express = require("express");
var router = express.Router();

const authMiddleware = require("../middlewares/authentication");
const reactionsController = require("../controllers/reactions.controller");

router.post("/", authMiddleware.loginRequired, reactionsController.create);

module.exports = router;

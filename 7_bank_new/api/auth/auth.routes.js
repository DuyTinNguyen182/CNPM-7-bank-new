const express = require("express");
const router = express.Router();
const controller = require("./auth.controller");
// Có thể bổ sung Swagger
router.post("/register", controller.register);
router.post("/login", controller.login);

module.exports = router;
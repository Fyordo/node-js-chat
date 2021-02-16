const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser");
const AuthController = require("../controllers/authController");

const parser = bodyParser.urlencoded({extended : false});

router.get("/", AuthController.Page)

router.post("/", parser, AuthController.Auth)

module.exports = router;
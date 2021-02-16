const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser");
const RegController = require("../controllers/regController");

const parser = bodyParser.urlencoded({extended : false});

router.get("/", RegController.Page);

router.post("/", parser, RegController.Register);

module.exports = router;
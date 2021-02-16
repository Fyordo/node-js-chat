const express = require("express")
const router = express.Router()

const bodyParser = require("body-parser");
const parser = bodyParser.urlencoded({extended : false});

const mysql = require("mysql");
const db = require("../config/db");

const MainController = require("../controllers/mainController");

router.get("/", MainController.Page);

module.exports = router;
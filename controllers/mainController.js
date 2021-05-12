const mysql = require("mysql");
const db = require("../config/db");
const Cookies = require("cookies");
//const $ = require("jquery/src/ajax.js");

module.exports.Page = function (req, res){
    let cookies = new Cookies(req, res, {"keys": ['Secret_string']});

    let username = cookies.get("login", {signed: true});
    let connection = mysql.createConnection(db.db_link);
    connection.query("SELECT * FROM `messages`", function (err, results){
        if (err !== null){
            console.log("Ошибка запроса к базе данных: " + err) // Ошибка
        }
        res.status(200).render("index.ejs", {messages: results, name: username})
    })


    connection.end()
}
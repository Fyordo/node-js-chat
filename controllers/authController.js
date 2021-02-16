const mysql = require("mysql");
const db = require("../config/db");
const bodyParser = require("body-parser");
const parser = bodyParser.urlencoded({extended : false});

module.exports.Page = function (req, res){
    res.status(200).render("auth.ejs", {status: ""})
}

module.exports.Auth = function (req, res){
    if(!req.body) res.sendStatus(400);
    let connection = mysql.createConnection(db.db_link);
    connection.query("SELECT * FROM `users` WHERE `Name` = ?", [req.body.name], function (err, results){
        if (err !== null){
            console.log("Ошибка запроса к базе данных: " + err) // Ошибка
        }
        if (results.length > 1){
            if (results[0]["Password"] === req.body.pass) res.status(200).redirect("/");
            else res.status(400).render("auth.ejs", {status: "Неверный пароль"});
        }
        else{
            res.status(400).render("auth.ejs", {status: "Такого пользователя нет"});
        }
    })
}
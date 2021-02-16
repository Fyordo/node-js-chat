const mysql = require("mysql");
const db = require("../config/db");

module.exports.Page = function (req, res){
    let connection = mysql.createConnection(db.db_link);
    connection.query("SELECT * FROM `messages`", function (err, results){
        if (err !== null){
            console.log("Ошибка запроса к базе данных: " + err) // Ошибка
        }
        res.status(200).render("index.ejs", {messages: results})
    })
    connection.end()
}
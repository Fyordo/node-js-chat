const mysql = require("mysql");
const db = require("../config/db");

module.exports.AddMess = function(text, name){
    let connection = mysql.createConnection(db.db_link);
    connection.query("INSERT INTO `messages` () VALUES (?, ?)", [text, name], function (err, results){
        if (err !== null){
            console.log("Ошибка запроса к базе данных: " + err) // Ошибка
        }
    })
    connection.end()
}
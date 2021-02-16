const mysql = require("mysql");
const db = require("../config/db");
const bodyParser = require("body-parser");
const parser = bodyParser.urlencoded({extended : false});
const controllers = require("./mainController")

module.exports.Page = function (req, res){
    res.status(200).render("reg.ejs", {status: ""});
}

module.exports.Register = function (req, res){
    if(!req.body) res.sendStatus(400);
    let check_name = false;
    if (req.body.pass === req.body.pass_conf){
        let NewID = 1;
        let connection = mysql.createConnection(db.db_link);
        new Promise(function(resolve){
            connection.query("SELECT * FROM `users`", function(err, results) {
                if (err !== null){
                    console.log("Ошибка запроса к базе данных: " + err) // Ошибка
                }
                if (results.length > 0){
                    NewID = results[results.length-1]["ID"]+1;
                }
                for (let i = 0; i < results.length; i++){
                    if (results[i]["Name"] === req.body.name) check_name = true;
                }

                resolve()
            })

        }).then( () => {
            if(!check_name){
                connection.query("INSERT INTO `users` (`ID`, `Name`, `Password`) VALUES (?, ?, ?)", [NewID, req.body.name, req.body.pass],  function(err){
                    if (err !== null){
                        console.log("Ошибка запроса к базе данных: " + err); // Ошибка

                    }
                })
                connection.end()
            }
            else{
                connection.end()
                res.status(400).render("reg.ejs", {status: "Такой ник уже есть"});
            }
        })
    }
    else{
        res.status(400).render("reg.ejs", {status: "Пароли не совпадают"});
    }
    res.status(200).redirect("/")
}
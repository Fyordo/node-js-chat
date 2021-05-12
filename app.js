const express = require("express")
const app = express()

const mysql = require("mysql")
const db = require("./config/db")

const server = require("http").createServer(app)
const io = require("socket.io")(server)

const port = 3000;
server.listen(port, 'localhost', function() {
    console.log('Listening to port: ' + port);
})

app.set("view engine", "ejs")

app.use("/assets", express.static("assets"))

// Основные обработчики

app.use("/", require("./routes/main.js"));
app.use("/auth", require("./routes/auth.js"))
app.use("/reg", require("./routes/reg.js"))
app.use((req, res) => {
    res.status(404).render("404.ejs")
})

// Настройки сокета

connections = [];

io.on('connection', function(socket) {
    console.log("Успешное соединение");
    connections.push(socket);

    socket.on('disconnect', function(data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log("Отключились");
    });

    socket.on('send mess', function(data) {
        if (data.name !== ""){
            let connection = mysql.createConnection(db.db_link);
            connection.query("INSERT INTO `messages` (`User`, `Text`) VALUES (?, ?)", [data.name, data.mess], function (err, results){
                if (err !== null){
                    console.log("Ошибка запроса к базе данных: " + err) // Ошибка
                }
            })
            connection.end()


            io.emit('add mess', {mess: data.mess, name: data.name});
        }
        else{

        }
    });
});
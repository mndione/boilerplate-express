const bodyParser = require('body-parser');
require('dotenv').config();
let express = require('express');
const req = require('express/lib/request');
let app = express();

console.log("Hello World");

app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
}) ;

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => res.json({"message": process.env.MESSAGE_STYLE=="uppercase" ? "HELLO JSON" : "Hello json"}));

app.get('/now', (req, res, next) => {
    req.time=new Date().toString()
    next();
}, function(req, res) {
    res.send({time: req.time});
 });

app.get("/:word/echo", (req, res) => res.json({echo: req.params.word}));

app.route("/name").get((req, res) => res.json({name: req.query.first + " " + req.query.last})).post((req, res) => res.json({name: req.body.first + " " + req.body.last}));

































 module.exports = app;

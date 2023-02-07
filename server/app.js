const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const bodyParser = require("body-parser");

const maria = require('mysql');
const dbconfig = require('./database/connect');
const connection = maria.createConnection(dbconfig);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
        methods: ["GET", "POST"]
    }));

app.get("/", (req, res) => {
    res.send("hi!")
})

app.post("/insert", (req, res) => {
    console.log(req.body)
    res.header("Access-Control-Allow-Origin", "*");
})

app.get("/select", (req, res) => {
    connection.query('SELECT * from subway', (error, rows) => {
        if (error) throw error;
        console.log('User info is: ', rows);
        res.send(rows);
    });

})

app.listen(port, () => {
    console.log(`Connect at http://localhost:${port}`);
})

// const maria = require("./database/connect/maria")
// maria.connect();
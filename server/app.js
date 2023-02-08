const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const bodyParser = require("body-parser");

const maria = require("mysql");
const dbconfig = require("./database/connect");
const connection = maria.createConnection(dbconfig);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
        methods: ["GET", "POST"],
    })
);

app.get("/", (req, res) => {
    res.send("hi!");
});

app.post("/insert", (req, res) => {
    for (let i = 0; i < req.body.line.length - 1; i++) {
        let sql = "INSERT INTO SUBWAY (line, snumber, sname, column1, column2, column3, column4, column5) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
        let param = [req.body.line[i], req.body.snumber[i], req.body.sname[i], req.body.column1[i], req.body.column2[i], req.body.column3[i], req.body.column4[i], req.body.column5[i]]

        connection.query(sql, param, function (error, result) {
            if (error) {
                console.log("failure");
            } else {
                console.log("success");
            }
        })
    }
});

app.get("/list", (req, res) => {
    connection.query("SELECT * FROM SUBWAY", (error, rows) => {
        if (error) throw error;
        console.log("User info is: ", rows);
        res.send(rows);
    });
});

app.listen(port, () => {
    console.log(`Connect at http://localhost:${port}`);
});

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
    origin: ["http://localhost:3001"],
    credentials: true,
    methods: ["GET", "POST"],
  }),
);

app.get("/", (req, res) => {
  res.send("hi!");
});

app.post("/insert", (req, res) => {
  for (let i = 0; i < req.body.line.length; i++) {
    let sql =
      "INSERT INTO SUBWAY (line, snumber, sname, column1, column2, column3, column4, column5) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    let param = [
      req.body.line[i],
      req.body.snumber[i],
      req.body.sname[i],
      req.body.column1[i],
      req.body.column2[i],
      req.body.column3[i],
      req.body.column4[i],
      req.body.column5[i],
    ];

    connection.query(sql, param, function (error, result) {
      if (error) {
        console.log("failure");
      } else {
        console.log("success");
      }
    });
  }
});

app.get("/list", (req, res) => {
  connection.query("SELECT * FROM SUBWAY", (error, result) => {
    if (error) throw error;

    let headers = Object.keys(result[0]);
    let values = [];

    for (let i = 0; i < result.length - 1; i++) {
      const value = Object.values(result[i]);
      values.push(value);
    }

    res.json({ headers: headers, values: values });
  });
});

app.get("/exam1", (req, res) => {
  let sql =
    "select id, line, snumber, sname, (column1 + column2 +  column3 + column4 + column5) as total from subway order by total desc limit 10";
  connection.query(sql, (error, result) => {
    if (error) throw error;

    let headers = Object.keys(result[0]);
    let values = [];

    for (let i = 0; i < result.length - 1; i++) {
      const value = Object.values(result[i]);
      values.push(value);
    }

    res.json({ headers: headers, values: values });
  });
});

app.get("/exam2", (req, res) => {
  let sql =
    "select id, line, snumber, sname, ((column1 + column2 +  column3 + column4 + column5) / 5) as average from subway order by average  limit 10";
  connection.query(sql, (error, result) => {
    if (error) throw error;

    let headers = Object.keys(result[0]);
    let values = [];

    for (let i = 0; i < result.length - 1; i++) {
      const value = Object.values(result[i]);
      values.push(value);
    }

    res.json({ headers: headers, values: values });
  });
});

app.get("/exam3", (req, res) => {
  let sql =
    "select id, line, snumber, sname, " +
    "greatest(column1, column2, column3, column4, column5)as max, " +
    "least(column1, column2, column3, column4, column5)as min, " +
    "(greatest(cast(column1 as unsigned), cast(column2 as unsigned), cast(column3 as unsigned),cast(column4 as unsigned), cast(column5 as unsigned)) - " +
    "least(cast(column1 as unsigned), cast(column2 as unsigned), cast(column3 as unsigned),cast(column4 as unsigned), cast(column5 as unsigned))) as gap " +
    "from subway order by gap desc limit 10;";
  connection.query(sql, (error, result) => {
    if (error) throw error;

    let headers = Object.keys(result[0]);
    let values = [];

    for (let i = 0; i < result.length - 1; i++) {
      const value = Object.values(result[i]);
      values.push(value);
    }

    res.json({ headers: headers, values: values });
  });
});

app.listen(port, () => {
  console.log(`Connect at http://localhost:${port}`);
});

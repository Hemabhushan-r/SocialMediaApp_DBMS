const express = require("express");
const dotenv = require("dotenv").config();
const mysql = require("mysql2");
const db_config = require("./db.config.js");
const app = express();
const port = process.env.PORT;
const connection = mysql.createConnection({
  host: db_config.HOST,
  user: db_config.USER,
  password: db_config.PWD,
  database: db_config.DB1,
});

connection.connect();

connection.query("SELECT * FROM USER_PROFILES", (err, rows, fields) => {
  if (err) throw err;

  console.log("The solution is: ", rows, fields);
});

app.listen(port, () => {
  console.log(`Backend listening at port ${port}`);
});

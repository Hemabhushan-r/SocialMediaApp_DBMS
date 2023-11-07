var mysql = require("mysql2");
const db_config = require("./db.config.js");

var pool = mysql.createPool({
  connectionLimit: 4,
  host: db_config.HOST,
  user: db_config.USER,
  password: db_config.PWD,
  database: db_config.DB1,
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Database connected successfully");
  connection.release();
});

module.exports = pool;

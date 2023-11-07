const express = require("express");
const dotenv = require("dotenv").config();
const mysql = require("mysql2");
const db_config = require("./db.config.js");
const userRoutes = require("./routes/user_routes");
const socialNetRoutes = require("./routes/social_net_routes");
const postRoutes = require("./routes/post_routes");
const messageRoutes = require("./routes/message_routes");
const app = express();
const port = process.env.PORT;
const connection = mysql.createConnection({
  host: db_config.HOST,
  user: db_config.USER,
  password: db_config.PWD,
  database: db_config.DB1,
});
const bodyParser = require("body-parser");
const cors = require("cors");
const util = require("util");

const query = util.promisify(connection.query).bind(connection);
//connection.connect();

const test = async () => {
  const res = await query(
    "insert into user_auth (email,password) values (?,?)",
    ["lskdld3@gmail.com", "123456"]
  );
  console.log(res);
};

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/message", messageRoutes);
app.use("/post", postRoutes);
app.use("/socialnet", socialNetRoutes);
app.use("/user", userRoutes);

//test();
/*connection.query("SELECT * FROM Profile", (err, rows, fields) => {
  if (err) throw err;

  console.log("The solution is: ", rows, fields);
});*/

app.listen(port, () => {
  console.log(`Backend listening at port ${port}`);
});

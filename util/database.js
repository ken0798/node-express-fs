const mysql = require("mysql2");
require("dotenv").config();
const pool = mysql.createPool({
  host: "localhost",
  database: "node_complete",
  user: "root",
  password: "Hatake@98",
});

module.exports = pool.promise();

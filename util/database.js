const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "league-surver",
  password: "discoparty1",
});

module.exports = pool.promise();

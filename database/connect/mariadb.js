const mariadb = require("mysql");

// mariadb 연결 고리
const conn = mariadb.createConnection({
  // user host
  host: "localhost",
  // port 번호(mariadb)
  port: 3306,
  user: "root",
  password: "root",
  database: "Tennis",
});

module.exports = conn;

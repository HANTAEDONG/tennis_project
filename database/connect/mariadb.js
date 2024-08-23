const mariadb = require("mysql");

// mariadb 연결 고리
const conn = mariadb.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "Tennis",
});

module.exports = conn;

const fs = require("fs");
const main_view = fs.readFileSync("./main.html");

const mariadb = require("./database/connect/mariadb");

function main(response) {
  console.log("main");

  mariadb.query("SELECT * FROM product", function (err, rows) {
    if (err) {
      console.error("Error executing query:", err);
      response.writeHead(500, { "Content-Type": "text/html" });
      response.write("Database error");
      response.end();
      return;
    }
    console.log(rows); // MariaDB 쿼리 결과 출력
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(main_view);
    // response.write(JSON.stringify(rows)); // 결과를 클라이언트에 출력할 수도 있음
    response.end();
  });
}

let handle = {}; // key:value
handle["/"] = main; // '/' 경로에서 main을 처리함

exports.handle = handle;

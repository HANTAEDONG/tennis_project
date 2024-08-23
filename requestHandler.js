const fs = require("fs");
const main_view = fs.readFileSync("./main.html");
const orderlist_view = fs.readFileSync("./orderList.html");
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

function order(response, productId) {
  response.writeHead(200, { "Content-Type": "text/html" });

  mariadb.query(
    "INSERT INTO orderlist VALUES(" +
      productId +
      ", '" +
      new Date().toLocaleDateString() +
      "');",
    function (err, rows) {
      console.log(rows);
    }
  );

  response.write("order page");
  response.end();
}

function orderlist(response) {
  console.log("orderlist");
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(orderlist_view);
  mariadb.query("SELECT * FROM orderlist", (err, rows) => {
    response.write(orderlist_view);

    rows.forEach((element) => {
      response.write(
        "<tr>" +
          "<td>" +
          element.product_id +
          "</td?" +
          "<td>" +
          element.order_date +
          "</td>" +
          "</tr>"
      );
    });
  });
  response.write("</table>");
  response.end();
}

function redRacket(response) {
  fs.readFile("./img/redRacket.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}

function blueRacket(response) {
  fs.readFile("./img/blueRacket.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}

function blackRacket(response) {
  fs.readFile("./img/blackRacket.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}

let handle = {}; // key:value
handle["/"] = main; // '/' 경로에서 main을 처리함
handle["/order"] = order;
handle["/orderlist"] = orderlist;

/* image directory*/
handle["/img/redRacket.png"] = redRacket;
handle["/img/blueRacket.png"] = blueRacket;
handle["/img/blackRacket.png"] = blackRacket;

exports.handle = handle;

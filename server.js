let http = require("http");
let url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    console.log("--- log start ---");
    let pathname = url.parse(request.url);
    console.log("Request for " + pathname + " received.");
    route(pathname, handle, response);

    response.writeHead(200, { "content-Type": "text/html" });
    response.write("Taedong Han");
    response.end("Hello node.js!!");
  }
  http.createServer(onRequest).listen(8888);
}

// http.createServer(function (request, response) {
//   console.log("--log start --");
//   let parseUrl = url.parse(request.rul);
//   console.log(parseUrl);

//   console.log("--- log end ---");
//   response.writeHead(200, { "content-Type": "text/html" });
//   response.end("Hello node.js!!!");
// });

exports.start = start;

let http = require("http");
let url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    console.log("--- log start ---");
    let pathname = url.parse(request.url).pathname; // pathname 추출
    console.log("Request for " + pathname + " received.");
    route(pathname, handle, response);
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started on port 8888.");
}

exports.start = start;

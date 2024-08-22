let http = require("http");
let url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    let pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(pathname, handle, response);

    response.writeHead(200, { "content-Type": "text/html" });
    response.write("Taedong Han");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("한태동");
}

exports.start = start;

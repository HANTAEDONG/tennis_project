let http = require("http"); // http 모듈 가져오기
let url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    console.log("--- log start ---");
    const { pathname } = new URL(request.url, `http://${request.headers.host}`);
    // let queryData = url.parse(request.url, true).query;
    const urlObject = new URL(request.url, `http://${request.headers.host}`);
    let queryData = urlObject.searchParams;

    route(pathname, handle, response, queryData.productId);
  }

  http.createServer(onRequest).listen(8888); // http 모듈 사용하여 서버 생성
  console.log("Server has started on port 8888.");
}

exports.start = start;

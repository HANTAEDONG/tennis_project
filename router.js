function route(pathname, handle, response, productId) {
  console.log("About to route a request for " + pathname);

  if (typeof handle[pathname] === "function") {
    handle[pathname](response, productId); // 요청 핸들러 호출
  } else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("404 Not Found");
    response.end();
  }
}

exports.route = route;

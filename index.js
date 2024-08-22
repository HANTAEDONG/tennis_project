// server.js 가져와서 서버 돌릴 수 있음.
let server = require("./server");
let router = require("./router");
let requestHandler = require("./requestHandler");
server.start(router.route, requestHandler.handle);

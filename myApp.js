const express = require("express");
const app = express();
const helmet = require("helmet");

const timeInSeconds = 90 * 24 * 60 * 60;

module.exports = app;
const api = require("./server.js");
app.use(express.static("public"));
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff(), helmet.ieNoOpen());
app.use(
    helmet.hsts({ maxAge: timeInSeconds, force: true }),
    helmet.dnsPrefetchControl(),
    helmet.noCache()
);
app.disable("strict-transport-security");
app.use("/_api", api);
app.get("/", function(request, response) {
    response.sendFile(__dirname + "/views/index.html");
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Your app is listening on port ${port}`);
});
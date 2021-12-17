const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.get("/get-data", (req, res) => {
  request(
    {
      url: "https://jsonplaceholder.typicode.com/posts/1",
      json: true,
    },
    function (error, response, body) {
      res.json(body);
    }
  );
});

var fw = "";
var bw = "";
app.post("/set-data", (req, res) => {
  fw = req.body.content.element[0].measurement[0].value[0];
  bw = req.body.content.element[0].measurement[0].value[1];

  console.log("fw1 = ", fw);
  console.log("fw2 = ", req.body.content.element[0].measurement[0].value[0]);
  console.log("bw1 = ", bw);
  console.log("bw2 = ", req.body.content.element[0].measurement[0].value[1]);
});

app.get("/get-data-2", (req, res) => {
  res.json([fw, bw]);
});

app.listen(8085, () => {
  console.log("server is running POST|8085 ..");
});

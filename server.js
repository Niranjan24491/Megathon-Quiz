const express = require("express");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const path = require("path");
const webpackConfig = require("./webpack.config.js");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConfig = require("./config/database.config.js");

const app = express();
const router = express.Router();
const ENV = process.env.ENV || "development";

//set our port to either a predetermined port number if you have set
//it up, or 3001
const port = process.env.API_PORT || 3001;

//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(express.static(path.join(__dirname, "www")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  //and remove cacheing so we get the most recent comments
  res.setHeader("Cache-Control", "no-cache");
  next();
});
//now we can set the route path & initialize the API
router.get("/", function(req, res) {
  if (ENV === "production") {
    res.sendFile(path.join(__dirname, "www/index.html"));
  } else {
    res.json("API initialized!!");
  }
});
//Use our router configuration when we call /api
app.use("/api", router);

const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + "/www"));

if (ENV !== "production") {
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath
    })
  );
}

mongoose.connect(dbConfig.url);

const promise = mongoose.connect(dbConfig.url, {
  useMongoClient: true
  /* other options */
});

mongoose.connection.on("error", function(err) {
  console.log(err);
  console.log("Could not connect to the database. Exiting now...");
});

mongoose.connection.once("openUri", function() {
  console.log("Successfully connected to the database");
});

// Require all routes
require("./app/questions/questions.routes.js")(app);
require("./app/answers/answers.routes.js")(app);
require("./app/correctAnswers/correctAnswers.routes.js")(app);
require("./app/userData/userData.routes.js")(app);

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});

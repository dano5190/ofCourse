require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
const path = require('path');
var db = require("./models");
const axios = require('axios');
var app = express();
var PORT = process.env.PORT || 3000;
const serveStatic = require('serve-static')                //serveStatic Plugin Line

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(serveStatic(path.join(__dirname, 'views/css'))) //serveStatic Plugin Line

//Gets
app.get('/', function (req, res) {
  res.render("index", {title:"Course"});
});

app.get("/resume", function(req, res){
  res.render("resume", { title: "ofCourse"});
});

app.get('/search', function (req, res) {
  queries = req.query;
  let url = `https://indreed.herokuapp.com/api/jobs`;
  if (queries){
      axios.get(url, {
      params: queries
  })
  .then(function(response){
      res.render("search", { title: "ofCourse", jobs: response.data});
  })
  .catch(function(error) {
      console.log(error);
  });
  }
  else {
      res.render("search", {title: "ofCourse"})
  }
});

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    extname: '.hbs'
  })
);
app.set("view engine", "handlebars");

// Routes草
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;

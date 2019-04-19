const path = require("path");

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");

require('dotenv').config()


const API_PORT = process.env.PORT || 3001;
const app = express();
const router = express.Router();

const user = process.env.MONGO_DB_USERNAME;
const pw = encodeURIComponent(process.env.MONGO_DB_PW);
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB_NAME;

// this is our MongoDB database
const uri = "mongodb+srv://"+ user + ":" + pw + url + dbName;

// using mongoose driver to connect 
// connects our back end code with the database
mongoose.Promise = global.Promise;
mongoose.connect(
  uri,
  { dbName: dbName,
    authSource: "admin",
    useNewUrlParser: true }
);

let connection = mongoose.connection;

connection.once("open", function() { 
  console.log("connected to the database")
});

// checks if connection with the database is successful
connection.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get("/get_repository_analysis", (req, res) => {
  Data.findOne({full_name: req.query.fullName}, function (err, result) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: result });
  });
});

// append /api for our http requests
app.use("/api", router);

// production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

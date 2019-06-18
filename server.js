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

let db = mongoose.connection;

db.once("open", function() { 
  console.log("connected to the database");
  /* mongoose.connection.db.listCollections().toArray(function (err, names) {
    console.log(names); // [{ name: 'dbname.myCollection' }]
    module.exports.Collection = names;
  }); */
});

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

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

router.get("/repositories", (req, res) => {
  const fullName = req.query.fullName;
  if (fullName) {
    Data.find({full_name: {$regex: fullName, $options: "$i"}}, function (err, result) {
      const dataset = result.map(repository => {
        let data = {};
        data['label'] = repository.full_name;
        data['value'] = repository.full_name;
        return data;
      });
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: dataset });
    }).limit(10);
  } else {
    return res.json({ success: true, data: [] });
  }
});

router.get("/repositories/get_analysis", (req, res) => {
  const fullName = req.query.fullName;
  Data.findOne({full_name: fullName}, function (err, result) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: result });
  });
});

router.get("/stats", async (req, res) => {
  try {
    const totalRepositories = await getTotalRepositories(null);
    const totalNoErrorRepositories = await getTotalRepositories({'summary.total_repo_errors': 0});
    const totalFilesAnalyzed = await getTotalByField("$summary.analyzed_file_count");
    const totalErrors = await getTotalByField("$summary.total_repo_errors");
    const averageErrorsPerFile = totalErrors/totalFilesAnalyzed;
    const averageErrorsPerRepository = totalErrors/totalRepositories;
    const data = {
      totalRepositories: totalRepositories,
      totalNoErrorRepositories: totalNoErrorRepositories,
      totalFilesAnalyzed: totalFilesAnalyzed,
      totalErrors: totalErrors,
      averageErrorsPerRepository: Math.round(averageErrorsPerRepository),
      averageErrorsPerFile: Math.round(averageErrorsPerFile)
    };
    return res.json({ success: true, data: data });
  } catch (err) {
    return res.json({ success: false, error: err });
  }
});

getTotalRepositories = async (condition) => {
  let result = await Data.countDocuments(condition, function(err , count) {
    return count;
  });
  return result;
};

getTotalByField = async (field) => {
  const pipeline = [{
    $group: { 
      _id: null, 
      total: { $sum: field }
    }
  }];
  let data = await Data.aggregate(pipeline);
  const total = data[0].total;
  return total;
};

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

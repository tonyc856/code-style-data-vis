const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require('dotenv').config();

// this will be our data base's data structure 
const DataSchema = new Schema (
  {
    _id: String,
    node_id: String,
    name: String,
    full_name: String,
    private: Boolean,
    html_url: String,
    url: String,
    size: Number,
    language: String,
    organization: Object,
    summary: {
      file_count: Number,
      analyzed_file_count: Number,
      total_repo_errors: Number
    }
  }, 
  { collection: process.env.MONGO_DB_COLLECTION }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", DataSchema);

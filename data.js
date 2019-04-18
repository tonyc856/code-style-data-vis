const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema({
    _id: String,
    node_id: String,
    name: String,
    full_name: String,
    private: Boolean,
    html_url: String,
    url: String,
    size: Number,
    language: String
}, 
{ collection: 'collection1' });

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", DataSchema);

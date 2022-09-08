const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB;

//MongoDB Atlas
//Project Name: Node-Express-Projects
//Cluster Name: Node-Express-Cluster
//Database Name: 03-Task-Manager

//we dont want to start server directly, we want to start only when the database is connected

const express = require("express");
const app = express();

const {products} = require('../data'); //destructuring

app.get("/", (req, res) => {
  res.json(products);
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});

//res.json() is used to send a json response
//below we have sent an array of 2objects
//res.json([{ name: "Bruce" }, { name: "Clark" }]);

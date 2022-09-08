const express = require("express");
const app = express();

//req => middleware => res

//middleware func
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  next();
};

app.get("/", logger, (req, res) => {
  res.send("Home Page");
});
app.get("/about", logger, (req, res) => {
  res.send("About Page");
});

app.listen(5000, () => {
  console.log("Server is listening on PORT 5000...");
});


//The next() function instructs Express to move on to the next middleware function when used without arguments.
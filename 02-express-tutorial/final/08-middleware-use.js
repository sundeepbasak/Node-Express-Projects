const express = require("express");
const app = express();
//importing middleware functions
const logger = require("../logger");
const authorize = require("../authorize");

//req => middleware => res

//to use the middleware func(logger in all routes)
app.use([authorize, logger]);

//all routes
app.get("/", (req, res) => {
  res.send("Home");
});
app.get("/about", (req, res) => {
  res.send("About");
});
app.get("/api/products", (req, res) => {
  res.send("Products");
});
app.get("/api/items", (req, res) => {
  console.log(req.user);
  res.send("Items");
});

app.listen(5000, () => {
  console.log("Server is listening on PORT 5000...");
});

/* //**to use the middleware func(logger in all routes)
1) we can manually add logger to all routes
    --> eg: app.get("/", logger, (req, res) => {

2)we use app.use()
- it should be placed at the top so that the logger is available to all routes
>> if we dont provide any path in argument 
    --> app.use(logger) 
    --> then logger will be available to all routes

>> if we provide a path in argument 
    --> app.use('/api', logger) 
    --> then logger will be available to only those routes which have api in them

>> to use multiple middlewares, we place them in an array
    --> app.use([authorize, logger])
*/

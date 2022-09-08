const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Home Page");
});

app.get("/about", (req, res) => {
  res.status(200).send("About Page");
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000...");
});


/* //**most common methods:
app.get --> read/get data
app.post --> post/insert data
app.put --> update data
app.delete --> delete data
app.all --> handles all http verbs(methods)
app.use --> used for middleware
app.listen --> used to listen the server on a port
*/

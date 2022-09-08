//**HTTP Module: built in module

const http = require("http");

const server = http.createServer((req, res) => {
  //   console.log(req);
  if (req.url === "/") {
    res.end("Home Page");
  } else if (req.url === "/about") {
    res.end("About Page");
  } else {
    res.end(`
    <h1>Oops!</h1>
    <p>We can't seem to find the page you are looking for</p>
    <a href="/"> Back Home</a>
    `);
  }
});

server.listen(5000);

//req is an object with many properties

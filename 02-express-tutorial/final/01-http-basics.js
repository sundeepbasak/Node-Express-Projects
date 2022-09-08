//http module: built in module

const http = require("http");

const server = http.createServer((req, res) => {
  // console.log(req); //has many properties
  // req.method, req.url etc
  const url = req.url;
  
  //home page
  if (url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.write('<h1>Home Page</h1>');
    res.end();
  }
  //about page
  else if (url === "/about") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.write("<h1>About Page</h1>");
    res.end();
  }
  //404 page
  else {
    res.writeHead(404, {
      "Content-Type": "text/html",
    });
    res.write("<h1>Page Not Found</h1>");
    res.end();
  }
});

server.listen(5000);

//res.end() function is used to end the response process.

//res.writeHead() is a built-in property of http module which sends a response header to the request.
// response.writeHead(statusCode, statusMessage, headers);

//MIME Type: type/subtype
//eg: text/html, text/plain etc

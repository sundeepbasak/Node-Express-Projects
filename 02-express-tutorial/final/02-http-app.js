const http = require("http");
const { readFileSync} = require("fs");

//get all files from navbar-app
const homePage = readFileSync("../navbar-app/index.html");
const homeStyles = readFileSync("../navbar-app/styles.css");
const homeLogo = readFileSync("../navbar-app/logo.png");
const homeScript = readFileSync("../navbar-app/browser-app.js");

const server = http.createServer((req, res) => {
  // console.log(req); //req has many properties
  // req.method, req.url etc
  const url = req.url;

  //home page
  if (url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.write(homePage);
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

  //styles
  else if (url === "/styles.css") {
    res.writeHead(200, {
      "Content-Type": "text/css",
    });
    res.write(homeStyles);
    res.end();
  }
  //logo
  else if (url === "/logo.png") {
    res.writeHead(200, {
      "Content-Type": "image/png",
    });
    res.write(homeLogo);
    res.end();
  }
  //script
  else if (url === "/browser-app.js") {
    res.writeHead(200, {
      "Content-Type": "text/javascript",
    });
    res.write(homeScript);
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

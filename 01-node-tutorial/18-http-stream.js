//http module: using streams

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  //   const text = fs.readFileSync("./content/big.txt", "utf8");
  //   res.end(text);

  //the above method is not so efficient, as we are sending a big file in one shot
  //good way is to use createReadStream, as here we are sending in chunks
  const fileStream = fs.createReadStream("./content/big.txt", "utf-8");
  fileStream.on("open", () => {
    //pipe is pushing readStream to writeStream
    fileStream.pipe(res);
  });
  fileStream.on("error", (err) => {
    res.end(err);
  });
});

server.listen(5000);

//http module

//setting up server: common way
// const server = http.createServer((req, res) => {
//   res.end("Welcome");
// });

//setting up server: using Event Emitter API
const server = http.createServer();

//subscribe to it/listen for it/ respond to it
//emits request event
server.on("request", (req, res) => {
  res.end("Welcome");
});


server.listen(5000);

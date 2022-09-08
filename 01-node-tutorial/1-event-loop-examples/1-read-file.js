//fs module

const { readFile, writeFile } = require("fs");

console.log("starting task");

readFile("../content/first.txt", "utf-8", (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(result);
  console.log("first task completed");
});
console.log("starting next task");

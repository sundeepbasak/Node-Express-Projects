//**FileSystem Module: built in module */
//Async Mode - non-blocking

const { readFile, writeFile } = require("fs");
//here we just destructured from fs, instead of writing fs.readFile
//diff is: before it was readFileSync and not it is: readFile

console.log("task starting");

readFile("./content/first.txt", "utf8", (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  const first = result;

  readFile("./content/second.txt", "utf-8", (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    const second = result;

    writeFile(
      "./content/result-async.txt",
      `Hello i am created by async method. Believe it.
Result: ${first} ${second}`,
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("task completed");
      }
    );
  });
});

console.log("next task starting");

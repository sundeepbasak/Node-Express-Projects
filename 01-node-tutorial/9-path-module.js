//**Path Module: built in module

const path = require("path");

//platform specific file separator
console.log(path.sep);

//join method
const filePath = path.join("/content", "subfolder", "text.txt");
console.log(filePath);

//basename: returns the last portion of path
const base = path.basename(filePath);
console.log(base);

//resolve: gives the absolute path
const absolutePath = path.resolve(
  __dirname,
  "content",
  "subfolder",
  "text.txt"
);
console.log(absolutePath);



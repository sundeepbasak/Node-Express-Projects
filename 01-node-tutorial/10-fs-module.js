//**FileSystem Module: built in module
//there are 2 types:
//sync-blocking and async-non-blocking

const fs = require("fs");

console.log('task starting');

//Sync mode:
//readFileSync: reads the entire contents of a file
const first = fs.readFileSync("./content/first.txt", "utf-8");
console.log(first);

//writeFileSync: writes to a file
fs.writeFileSync(
  "./content/result-sync.txt",
  `Happy Birthday to you.
Result: ${first}`
);
//3rd argument to writeFileSync is the append: {flag: 'a'}
//this will allow to append notes

console.log('task completed');
console.log('next task starting');
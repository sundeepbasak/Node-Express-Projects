//**Modules:
//Node uses commonJS library under the hood, and every file in node is a module by default

//importing variables, functions etc from other files(modules)
//for importing, we use require
//for exporting, we use module.exports
// console.log(require);

const names = require("./4-names");
console.log(names);

const sayName = require("./5-utils");

//implementing the functions
sayName("Salvia");
sayName(names.john);
sayName(names.peter);

//import from 6-alt-export.js
const data = require("./6-diff-export");
console.log(data);


//invoking func(in 7-exec-func.js) directly from here
require('./7-exec-func');
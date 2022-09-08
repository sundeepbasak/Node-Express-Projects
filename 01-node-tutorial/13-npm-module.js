//**NPM(Node Package Manager)
//create a package.json file 
//npm init -y

//install a package by
//npm i <packageName>

//uninstall a package by
//npm un <packageName>


//Lodash:
//It is a popular js based library which provides 200+ functions to facilitate web development. It provides helper functions like map, filter, invoke as well as function bindin, js templating etc

const lodash = require("lodash"); //a npm package/module

const items = [1, [2, [3, [4]]]];
const flatItems = lodash.flattenDeep(items);
console.log(flatItems); //[1,2,3,4]

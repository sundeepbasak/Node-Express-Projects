//**Globals:
/* Node.js has no window object as there is no browser
- it has some global variables
- Examples:
    - __dirname : path to current directory
    - __filename : file name
    - require : func to use modules (commonJS)
    - module : info about current module (file)
    - process : info about env where the program is being executed 

- also it has access to : 
    - console
    - setTimeout and setInterval
*/


console.log("dirname:", __dirname);
console.log("filename:", __filename);

console.log(process);

console.log(require);

console.log(module);

setInterval(() => {
  console.log("hello world");
}, 1000);


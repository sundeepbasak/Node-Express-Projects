# Node Tutorial

### Node
- it is an environment to run JS outside browser
- it is built on chrome's V8 engine

### Difference between browser js and node.js
Browser has:
- DOM
- window
- interactive apps
- no filesystem 
- fragmentation
- es6 modules

Node.js has:
- no DOM
- no window
- server side apps
- filesystem
- versions
- commonJS

Node.js has no access to browser API's like DOM api, fetch api, fullscreen api, payment request api, geolocation api etc


### Globals
- Node.js has no window object as there is no browser
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


### Modules
Node uses commonJS library under the hood, and every file in node is a module by default
- we can import variables, functions etc from other files(modules) 
- for importing, we use require
- for exporting, we use module.exports

Node has some built in modules:
- OS module
- path module
- filesystem module
- http  module


### NPM (Node Package Manager)
NPM enables us to do 3 things:
- reuse our own code in other projects
- use code written by other developers
- share our own solutions with other developers as well

NPM commands:
global commands
- `npm --version`

local dependency: use only for a particular project
- `npm i <packageName>`

global dependency: use it in any project
- `npm i -g <packageName>`

dev dependency: only necessary during development phase and not during production
- `npm i <packageName> -D` or
- `npm i <packageName> --save-dev`

uninstall a npm package:
- `npm un <packageName>`

package.json file: manifest file(stores imp info about project/package)
- for default: `npm init -y`
- for manual: `npm init` (then proceed step by step)


### More Topics:
- Event Loop
- Async Patterns
- Events Emitter and Streams
- Main Concepts

The Event Loop is what allows Node.js to perform non-blocking I/O operations- despite the fact that JS is single-threaded - by offloading operations to the system kernel whenever possible.

Event Driven Programming 
- Events Emitter

Streams
- streams are used to read or write sequentially
- 4 diff types of string
    - writeable: used to write data sequentially
    - readable: used to read data sequentially
    - duplex: used to both read and write data sequentially
    - transform: data can be modified while reading or writing


### HTTP Basics:
- client sends the http request message and server sends the http response message, and that's how data is exchanged on the web

- request message contains:
    - http method(GET, POST, PUT, DELETE)
    - url
    - http version
    - headers (optional)
    - body (optional)/payload

- response message contains:
    - http version
    - status code (200, 404 etc)
    - status type (OK etc)
    - headers
    - body

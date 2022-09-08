# Express Tutorial

Express is minimalist web framework for Node.js


MIME types 
- It enables browsers to recognize the filetype of a file which has been sent via HTTP by the webserver. As a result the browser is able to choose a suitable displaying method. 
- For eg: text/html for html-files or image/jpeg for jpeg-files.


### API vs SSR
API:
- data send is in JSON format
- method used: res.json()

SSR:
- we send templates created using a template engine
- method used: res.render()

How API's work
- our server provides data and for a frontend app to use it, we send http request and in turn we get a http response.

### Middleware
middleware func's are func's that have access to the (req object, res object and next func) in the application's request-response cycle.

Syntax:
- `app.get(path, (req, res, next) => {}, (req, res) => {})`

Advantages:
- it can be used to add logging and authentication functionality.
- improves client-side rendering performance.
- is used for setting some specific HTTP headers.

An Express application can use the following types of middleware:
- built-in middleware
- application-level middleware or own middleware
- 3rd-party middleware
- router-level middleware
- error-handling middleware


### HTTP Methods:
- GET --> get/read data
- POST --> post/insert data
- PUT --> update data
- DELETE --> delete data



### Error Handling
There is a distinction between errors resulting from sync and async code:

For sync errors:
- Errors that occur in synchronous code inside route handlers and middleware require no extra work. If synchronous code throws an error, then Express will catch and process it.

For async errors:
- For errors returned from asynchronous functions invoked by route handlers and middleware, you must pass them to the next() function, where Express will catch and process them.


### express-async-errors 
a npm package to handle async errors


### search functionality can be implemented in 2 ways:
1. implement in your frontent app(eg: React) 
2. implement in your backend and provide api to the frontend which will just make http calls based on the search.


### Mongoose Query Methods:
- find() : finds documents
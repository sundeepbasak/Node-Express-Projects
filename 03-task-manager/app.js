const express = require("express");
const app = express();
const connectDB = require("./db/connect"); 
require('dotenv').config(); //require .env variables

//import all routes, notFound and errorHandler
const routes = require("./routes/tasks.routes");
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler'); //not used

//middlewares
app.use(express.static('./public'))
app.use(express.json()); //parses json data

//using routes
app.use("/api/v1/tasks", routes);
app.use(notFound);
app.use(errorHandlerMiddleware);  //not used 

const PORT = process.env.PORT || 5000;
//start server only when database is connected succesfully
const start = async (url) => {
  try {
    await connectDB(url);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};
start(process.env.MONGO_URI);

/* //** All Routes:
app.get('/api/v1/tasks') --> get all tasks
app.post('/api/v1/tasks') --> create a new task

app.get('/api/v1/tasks/:id') --> get a single task
app.patch('/api/v1/tasks/:id') --> update task 
app.delete('/api/v1/tasks/:id') --> delete task

*/

//json is the common format for recieving and sending data in REST Api

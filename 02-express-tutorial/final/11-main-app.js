const express = require("express");
const app = express();

//importing routes
const peopleRouter = require('../routes/people.routes');
const authRouter = require('../routes/auth.routes');

//built-in middlewares
app.use(express.static("../methods-public")); //to serve static assets
app.use(express.urlencoded({ extended: false })); //to parse form data
app.use(express.json()); //to parse json data

//using routes
app.use('/api/people/', peopleRouter); 
app.use('/login', authRouter);

//listening to server
app.listen(5000, () => {
  console.log("Server is running on PORT 5000....");
});

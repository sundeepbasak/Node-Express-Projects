



### PUT vs PATCH
- PATCH is used to update an existing entity with new information. You can’t patch an entity that doesn’t exist.

- PUT is used to set an entity’s information completely. PUTting is similar to POSTing, except that it will overwrite the entity if already exists or create it otherwise.

- Main Difference:
PUT handles updates by replacing the entire entity, while 
PATCH only updates the fields that you give it. PATCH does not change any of the other values.

- In simple words:
POST creates a new item
PUT replaces an item
PATCH modifies an item


### PostMan
Steps:
1. create a collection(give a name: your-app-name)
2. create a global variable from the (eye icon part) - environment quick look, and set a baseURL to it.
3. eg: URL --> default --> localhost:5000/api/v1 --> localhost:5000/api/v1
4. save it and then create a GET request and type --> {{URL}}/tasks
5. this will give all details send for that particular request.
6. Save the request to the collection you created.
6. Similarly, other http requests can also be handled and saved under your collection


### Database(MongoDB)
- NoSQL, Non Relational DB
- store JSON
- easy to get started
- free cloud hosting - ATLAS

### Connect to MongoDB Atlas - Check Tango 
- created a step-by-step guide to connect to mongodb ATLAS

### Mongoose - Read Documentation
- For mongoose V5
```javascript
const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://testuser:testpassword@node-express-cluster.cvp2hrc.mongodb.net/03-Task-Manager?retryWrites=true&w=majority";

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB..."))
  .catch((err) => console.log("Error: ", err));
```

- For mongoose V6
```javascript
const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://testuser:testpassword@node-express-cluster.cvp2hrc.mongodb.net/03-Task-Manager?retryWrites=true&w=majority";

mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to DB..."))
  .catch((err) => console.log("Error: ", err));
```


Mongoose Queries:
mongoose models provide several static helper functions for CRUD operations. Some of them are:
- Model.find()
- Model.findOne()
- Model.findOneAndDelete()
- Model.findOneAndUpdate()
- Model.findOneAndReplace()

- Model.findById()
- Model.findByIdAndDelete()
- Model.findByIdAndUpdate()

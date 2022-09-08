const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: [true,"name cannot be empty"],
    trim: true,
    maxLength: [20, "name cannot be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);

/* //defining Schema
const {Schema} = mongoose;
const TaskSchema = new Schema({
    ------------
    ------------
})

or

const TaskSchema = new mongoose.Schema({
    ------------
    ------------
})
*/

//only the properties defined in the schema will be sent to database, others will be ignored

/* defining properties inside schema - validation
name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 20,
}

or

name: {
    type: String,
    required: [true, 'name cannot be empty'],
    trim: true,
    maxLength: [20, 'name cannot be more than 20 characters'],
}

*/
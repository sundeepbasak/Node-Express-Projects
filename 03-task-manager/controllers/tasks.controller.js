//import model - Task
const Task = require("../models/tasks.models");

const asyncWrapper = require("../middleware/async"); 
const {createCustomError} = require('../errors/custom-error');

//get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}); //.find({})

    // res.status(200).json({ tasks, amount: tasks.length });
    // res.status(200).json({ success: true, data: { tasks, amount: tasks.length } });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

//create a new task
const createTask = async (req, res) => {
  // res.json(req.body);
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

//get single task
const getTask = async (req, res) => {
  const taskID = req.params.id;
  // console.log(taskID);
  try {
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID} found.` });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

//update task: patch method
const updateTask = async (req, res) => {
  const taskID = req.params.id;
  try {
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID} found.` });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

//deleteTask
const deleteTask = async (req, res) => {
  const taskID = req.params.id;
  try {
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID} found.` });
    }

    // res.status(200).json({ task: null, status: "success" });
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

//replaceTask: put method
//--> just used here for understanding the diff between put and patch
const replaceTask = async (req, res) => {
  const taskID = req.params.id;
  try {
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
      overwrite: true,
    });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID} found.` });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  replaceTask,
};

/* //* mongoose query methods
1. gets all tasks
---> Model.find({}) 

2. Find a particular task
--> Mode.findOne({_id: taskID})
or
--> Model.findById({_id: taskID})

3. Delete a particular task
--> Model.findOneAndDelete({_id: taskID}) 
or
--> Model.findByIdAndDelete({_id: taskID})

4. Update a particular task
--> Model.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    }) 
or
--> Model.findByIdAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    }) 
*/

//put vs patch
//--> put replaces an item
//--> patch modifies an item

//** here we are constantly repeating the same code for the controller functions, try-catch etc
//what we can do is, make a wrapper function (custom middleware) and use it here -->async.js

/*using wrapper func in getAllTasks -- same will be for createTask

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({}); //.find({})
  res.status(200).json({ tasks });
});
*/

/*using wrapper func in getTask -- same will be for updateTask and deleteTask

const getTask = asyncWrapper (async (req, res, next) => {
  const taskID = req.params.id;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return next(createCustomError(`No task with id: ${taskID} found.`, 404))
    }
    res.status(200).json({ task });
});
*/



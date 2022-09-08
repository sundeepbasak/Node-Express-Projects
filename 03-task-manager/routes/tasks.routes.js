const express = require("express");
const router = express.Router();

//import controller funcs
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  replaceTask
} = require("../controllers/tasks.controller");

//baseUrl: /api/v1/tasks
router.get("/", getAllTasks);
router.post("/", createTask);

router.get("/:id", getTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

router.put('/:id', replaceTask);

module.exports = router;

/* //*routes can also be handled like this: by chaining 
router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)
*/

//replaceTask is just used here for understanding the diff between put and patch, and is not implemented for functionality in the task-manager app
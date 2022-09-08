const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs.controller");


//baseurl: /api/v1/jobs
router.get("/", getAllJobs);
router.post("/", createJob);

router.get("/:id", getJob);
router.patch("/:id", updateJob);
router.delete("/:id", deleteJob);

module.exports = router;

//another way is by chaining
//router.route('/').get(getAllJobs).post(createJob)

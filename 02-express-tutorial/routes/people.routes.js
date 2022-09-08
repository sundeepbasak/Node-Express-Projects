const express = require("express");
const router = express.Router();

//importing functions from controller
const {
  getPeople,
  createPerson,
  createPersonAll,
  updatePerson,
  deletePerson,
} = require("../controllers/people.controller");

//**base url provided: /api/people

//--> one way of setting routes: separately
// router.get("/", getPeople);
// router.post("/", createPerson);
// router.post("/all", createPersonAll);
// router.put("/:id", updatePerson);
// router.delete("/:id", deletePerson);

//-->another way of setting routes: chaining methods
router.route("/").get(getPeople).post(createPerson);
router.route("/all").post(createPersonAll);
router.route("/:id").put(updatePerson).delete(deletePerson);

module.exports = router;

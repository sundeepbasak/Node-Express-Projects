const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/user.controller");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

//baseURL: /api/v1/users
router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin", "owner"), getAllUsers);

router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);

router.route("/:id").get(authenticateUser, getSingleUser);

module.exports = router;

//other routes are also protected, so we need to authenticate users as well, whether they are present in db or not --> for this we have a func authenticateUser in authentication.js

//only admin and owner is able to access getAllUsers, so we need to authenticate whether it is an admin/owner or not
//for this we have a func authorizePermissions in authenticate.js, which will check the role

//so in getAllUsers route, first we authenticateUser, and then give access to the route, if role is admin/owner(func authorizePermissions)

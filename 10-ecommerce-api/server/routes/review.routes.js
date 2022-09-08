const express = require("express");
const router = express.Router();

const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

//baseURL: /api/v1/reviews
router.route("/").post(authenticateUser, createReview).get(getAllReviews);

router
  .route("/:id")
  .get(getSingleReview)
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview);

module.exports = router;

//getAllReviews and getSingleReview are accessible to public
//other routes need authentication

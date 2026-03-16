const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Review = require("../models/review");
const Listing = require("../models/listing");
const { validateReview, isLoggedIn, isreviewAuthor } = require("../middleware");
const reviewController = require("../controllers/reviews");

//Review Route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview),
);

//Delete Review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isreviewAuthor,
  wrapAsync(reviewController.deleteReview),
);

module.exports = router;

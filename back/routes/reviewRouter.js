import express from "express";
import { addReview, getReviews, deleteReview } from "../controller/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/", addReview); // Add review
reviewRouter.get("/:movieId", getReviews); // Get reviews for a video
reviewRouter.delete("/:reviewId/:userId", deleteReview); // Delete review by user

export default reviewRouter;
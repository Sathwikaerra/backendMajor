import Review from "../models/reviewmodel.js";
import mongoose from 'mongoose';

// Add a new review
export const addReview = async (req, res) => {
    const { review, rating } = req.body;
    
    const numericRating = Number(rating);
if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
  return res.status(400).json({ message: 'Rating must be a number between 1 and 5' });
}
const movieId = new mongoose.Types.ObjectId(req.body.movieId);
const userId = new mongoose.Types.ObjectId(req.body.userId);

console.log(movieId,userId)

    try {
        const newReview = new Review({movieId , userId, review, rating:numericRating });
        await newReview.save();
        res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all reviews for a video
export const getReviews = async (req, res) => {
    const { movieId } = req.params;
    try {
        const reviews = await Review.find({ movieId }).populate("userId", "name");
        res.status(200).json({ reviews });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a review
export const deleteReview = async (req, res) => {
    const { reviewId, userId } = req.params;
    try {
        const review = await Review.findOne({ _id: reviewId, userId });
        if (!review) {
            return res.status(404).json({ message: "Review not found or unauthorized" });
        }
        const deletedReview = await Review.findByIdAndDelete(reviewId);
        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found or unauthorized" });
        }
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
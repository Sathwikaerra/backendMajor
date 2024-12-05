import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);
export default Review;
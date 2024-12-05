import mongoose from "mongoose"

const timingSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
    timing: { type: String, required: true },
    bookedSeats: [Number],
    availableSeats: { type: Number, default: 50 },
    userBookings: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            seats: [Number],
        },
    ],
    createdAt: { type: Date, default: Date.now },
},{ timestamps: true }
);
timingSchema.index({ createdAt: 1 }, { expireAfterSeconds: 172800 }); // Expire after 2 days


export default  mongoose.model("Timing", timingSchema);
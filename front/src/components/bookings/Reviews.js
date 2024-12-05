import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';



const Reviews = ({ movieId }) => {

    let userId;

    const {currentUser}=useSelector((state)=>state.user);
    if(currentUser){
        userId=currentUser.newuser._id;
    }

    


    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");
    const [rating, setRating] = useState(1);

    // Fetch reviews
    // const API_URL = "http://localhost:3001/review";

const getReviews = async (movieId) => {
    const response = await axios.get(`/review/${movieId}`);
    return response.data;
};
 const addReview = async (reviewData) => {
    if(currentUser)
    {
        const response = await axios.post('/review', reviewData);
        return response.data;
    }
    else{

    }
    
};

 const deleteReview = async (reviewId, userId) => {
    const response = await axios.delete(`/review/${reviewId}/${userId}`);
    return response.data;
};

    useEffect(() => {
        getReviews(movieId).then((data) => {
            setReviews(data.reviews);
        });
    }, [movieId]);
    // Handle adding a new review
    const handleAddReview = () => {

        if(!currentUser){
            return toast.warning(`You must Login`, { position: 'top-center' });

        }
        

            if (!newReview || !rating) return alert("Please enter review and rating!");

            const reviewData = { movieId, userId, review: newReview, rating };
    
            addReview(reviewData)
                .then((data) => {
                    setReviews((prev) => [...prev, data.review]);
                    setNewReview("");
                    setRating(1);
                })
                .catch((err) => console.error(err));

       

       
    };

    // Handle deleting a review
    const handleDeleteReview = (reviewId) => {
        deleteReview(reviewId, userId)
            .then(() => {
                setReviews((prev) => prev.filter((review) => review._id !== reviewId));
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="mt-8 w-full max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center">Reviews and Ratings</h3>
    
        {/* Add Review Section */}
        <div className="border-b flex justify-center items-center flex-col pb-4 sm:pb-6 mb-4 sm:mb-6">
            <h4 className="text-md sm:text-lg font-medium text-gray-700 mb-3">Add Your Review</h4>
            <div className="flex items-center gap-2 sm:gap-4 mb-3">
                {/* Star Rating Input */}
                <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                            key={star}
                            onClick={() => setRating(star)}
                            xmlns="http://www.w3.org/2000/svg"
                            fill={rating >= star ? "gold" : "none"}
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 sm:w-6 h-5 sm:h-6 cursor-pointer text-gray-400 hover:text-yellow-500 transition duration-200"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 17.25l-5.405 3.181 1.036-6.03L2.5 8.94l6.058-.883L12 2.25l3.442 5.806 6.058.883-4.131 4.461 1.036 6.03z"
                            />
                        </svg>
                    ))}
                </div>
                <span className="text-sm text-gray-500">{rating} Star{rating > 1 && "s"}</span>
            </div>
    
            {/* Review Input */}
            <input
                type="text"
                placeholder="Write your review..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                className="w-full p-2 sm:p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
            />
    
            <button
                onClick={handleAddReview}
                className="bg-blue-500  bg-gradient-to-r from-blue-400 to-blue-900 text-white text-sm sm:text-lg cursor-pointer rounded-lg shadow-md hover:from-green-600 hover:to-green-800 transition  px-4 sm:px-6 py-2  font-medium hover:bg-blue-600 w-full sm:w-auto"
            >
                Submit Review
            </button>
        </div>
    
        {/* Show Reviews Section */}
        <div>
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div
                        key={review._id}
                        className="bg-white p-3 sm:p-4 rounded-lg shadow-sm mb-3 sm:mb-4 border border-gray-200"
                    >
                        <div className="flex justify-between items-center">
                            <p className="text-sm sm:text-md font-semibold text-gray-700">
                                {review.userId.name}
                            </p>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                        key={star}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill={review.rating >= star ? "gold" : "none"}
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 17.25l-5.405 3.181 1.036-6.03L2.5 8.94l6.058-.883L12 2.25l3.442 5.806 6.058.883-4.131 4.461 1.036 6.03z"
                                        />
                                    </svg>
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-600 mt-1 sm:mt-2">{review.review}</p>
                        {review.userId._id === userId && (
                            <button
                                onClick={() => handleDeleteReview(review._id)}
                                className="text-red-500 text-sm font-medium mt-2 hover:underline"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                ))
            ) : (
                <p className="text-gray-500 text-center mt-6">No reviews yet. Be the first to review!</p>
            )}
        </div>
    </div>
    

    );
};

export default Reviews;
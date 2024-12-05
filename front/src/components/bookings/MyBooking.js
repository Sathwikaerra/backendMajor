import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMovie } from '../api/apis';
import Reviews from './Reviews';
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';


function MyBooking() {
    const navigate=useNavigate()
    const {currentUser}=useSelector((state)=>state.user);
    
    const id=useParams().id;
 
    const[movie,setMovie]=useState();
    
    useEffect(()=>{

       getMovie(id).then((res)=>{
            setMovie(res.movie);
        }).catch(()=>{
            toast.error(`Movie Loading..Refresh the page after few seconds`, {theme: "colored",autoClose: 3000, position: 'top-center',hideProgressBar: true });
            
        })
    },[id])

    

    
    const [showVideo, setShowVideo] = useState(false);

    // Toggle video visibility
    const toggleVideo = () => {
        setShowVideo((prev) => !prev);
    };
  return (
    <div className="flex flex-col  mt-10 sm:mt-1  justify-center items-center px-4">
    {movie && (
        <div className="flex flex-1    justify-evenly items-center   p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-6xl">
            {/* Movie Image */}
            <div className="flex  justify-center items-center">
            <div className="relative">
            {!showVideo ? (
              <div className="relative group w-full sm:w-[640px] lg:w-[720px] h-[360px] sm:h-[400px]">
                {/* Display Image */}
                <img
                  src={`http://localhost:3001${movie.imgUrl}`}
                  alt="Thumbnail"
                  className="w-full h-full object-contain rounded-lg shadow-md"
                />
                {/* Play Button */}
                <button
                  onClick={() => setShowVideo(true)}
                  className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-lg group-hover:bg-opacity-60 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="red"
                    viewBox="0 0 24 24"
                    className="w-16 h-16 group-hover:scale-110 transition transform"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 4.5C3.67157 4.5 3 5.17157 3 6v12c0 .8284.67157 1.5 1.5 1.5h15c.8284 0 1.5-.6716 1.5-1.5V6c0-.82843-.6716-1.5-1.5-1.5h-15zm6.48 2.794c-.72-.412-1.48-.062-1.48.794v7.824c0 .856 0.76 1.206 1.48.794l6.52-3.912c.72-.432.72-1.176 0-1.608l-6.52-3.912z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-70 px-3 py-1 rounded-lg shadow-md text-sm sm:text-base font-semibold">
                Watch Trailer
              </div>
              </div>
            ) : (
              /* Display Video */
              <video
                src={`http://localhost:3000${movie.videoUrl}`}
                controls
                autoPlay
                className="w-full sm:w-[640px] lg:w-[720px] h-[360px] sm:h-[400px] rounded-lg shadow-md"
              />
            )}
          </div>            </div>

            {/* Movie Details */}
            <div className="flex flex-col gap-4 text-center sm:text-left">
          <p className="font-mono bg-gray-100 rounded-md font-semibold p-3 shadow-md text-gray-800">
            <span className="text-gray-700">Title:</span>{" "}
            <span className="font-normal">{movie.title}</span>
          </p>
          <p className="font-mono bg-blue-100 rounded-md font-semibold p-3 shadow-md text-gray-800">
            <span className="text-gray-700">Description:</span>{" "}
            <span className="font-normal">{movie.description}</span>
          </p>
          <p className="font-mono bg-green-100 rounded-md font-semibold p-3 shadow-md text-gray-800">
            <span className="text-gray-700">Actors:</span>{" "}
            <span className="font-normal">
              {movie.actors.map((actor, index) => (
                <span key={index} className="text-amber-800">
                  {actor}
                  {index < movie.actors.length - 1 && ", "}
                </span>
              ))}
            </span>
          </p>
          <p className="font-mono bg-yellow-100 rounded-md font-semibold p-3 shadow-md text-gray-800">
            <span className="text-gray-700">Release On:</span>{" "}
            <span className="font-normal">
              {new Date(`${movie.releaseDate}`).toDateString()}
            </span>
          </p>
                {
                    currentUser ? <>
                    <p
                    onClick={() => navigate(`/timing/${id}`)}
                    className="mt-4 text-center font-mono font-semibold p-3  bg-gradient-to-r from-blue-400 to-blue-900 text-white text-sm sm:text-lg cursor-pointer rounded-lg shadow-md hover:from-green-600 hover:to-green-300 transition"
                >
                    Book your ticket 
                </p>
                    
                    </>:
                    
                    <><p
                    onClick={() => navigate('/auth')}
                    className="mt-4 text-center font-mono font-semibold p-3  bg-gradient-to-r from-blue-400 to-blue-900 text-white text-sm sm:text-lg cursor-pointer rounded-lg shadow-md hover:from-green-600 hover:to-green-300 transition"
                >
                    Login to book your Ticket
                </p></>
                }
                
            </div>
        </div>
    )}

    {movie && (
        <div className="flex flex-col mt-12 justify-center items-center w-full max-w-6xl space-y-6">
            {/* Toggle Video Button */}
            {/* <button
                onClick={toggleVideo}
                className="bg-blue-500 text-white font-mono rounded-md px-6 py-2 font-semibold hover:bg-blue-600 transition w-full sm:w-auto"
            >
                {showVideo ? "Hide Video" : "Show Video"}
            </button> */}

            {/* Video Section */}
            {/* {showVideo && (
                <div className="w-full bg-gray-100 rounded-lg shadow-md p-4">
                    <video className="w-full rounded-lg" controls>
                        <source src={`http://localhost:3000${movie.videoUrl}`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )} */}

            {/* Reviews Section */}
            <div className="w-full mt-8">
                {movie && (
                    <Reviews movieId={movie._id}  />
                )}
              
                
            </div>
        </div>
    )}
</div>

  )
}

export default MyBooking;
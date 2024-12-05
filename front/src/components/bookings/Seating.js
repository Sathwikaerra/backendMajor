import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Booking.css"; // Import the CSS for styling
import { useNavigate, useParams } from 'react-router-dom';
import { getTimingsMovie,getTimingOfOneMovie,getMovieDetails } from "../api/apis";
// import { convertLength } from "@mui/material/styles/cssUtils";
import { useSelector } from 'react-redux'


function Seating() {

    const navigate=useNavigate()
    const movieId = useParams().id; // Get movieId from URL parameters
    const { currentUser } = useSelector((state) => state.user);
    
    const [timings, setTimings] = useState([]);
    const [selectedTiming, setSelectedTiming] = useState(null);
    // const [selectedSeats, setSelectedSeats] = useState([]);

    // const [availableSeats, setAvailableSeats] = useState([]);
    // const [histroy,setHistory]=useState([]);
    // const [time,setTime]=useState(null)

    // Fetch movie timings
    const [selectedDate, setSelectedDate] = useState("");
    const [particularTimeId,setParticularTimeId]=useState(null);
    const [movie,setMovie]=useState(null);

    useEffect(() => {

        

        getTimingsMovie(movieId).then((res)=>
            {
                setTimings(res.timings)
                setParticularTimeId(res.timings._id);
                getMovieDetails(movieId).then((res)=>{
                    setMovie(res.movie.title)

                })
                
                
          
                    
                
            }).catch((err)=>console.log(err))

    }, [movieId]);
    let data=[];
    // Handle timing selection
    const handleTimingSelect = async(timing) => {
        setSelectedTiming(timing);
     
        // setAvailableSeats(timing.availableSeats); // Set available seats for selected timing
        // setSelectedSeats([]); // Clear selected seats when timing changes
    };    

   // Group timings by date
   const groupedTimings = timings.reduce((acc, timing) => {
    const [date, time] = timing.timing.split(" "); // Split timing into date and time
    if (!acc[date]) acc[date] = [];
    acc[date].push({ ...timing, time });
    return acc;
}, {});

const availableDates = Object.keys(groupedTimings);

// Handle date selection
const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
};

    return (

        <div className="flex justify-center m-auto   rounded-xl shadow-2xl bg-slate-900 w-[600px] p-5 gap-6 flex-col items-center mt-[200px] calendar-input-container">
<h1 className="font-bold font-serif text-3xl text-yellow-50 leading-tight tracking-wide  decoration-blue-500 underline-offset-4">
    {movie}
</h1>
            <div className="date-selector m-auto  flex  items-start gap-2">
    <label 
        htmlFor="date" 
        className="text-lg font-medium text-yellow-600"
    >
        Select a Date:
    </label>
    <input
        type="date"
        id="date"
        value={selectedDate}
        onChange={handleDateChange}
        min={availableDates[0]} // Earliest available date
        max={availableDates[availableDates.length - 1]} // Latest available date
        className="w-full sm:w-auto px-4 py-2 border border-gray-300 bg-slate-600  rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white font-semibold"
    />
</div>


            <div className="flex justify-center items-center gap-4 timings-container">{
                selectedDate && <p className="text-yellow-600 font-semibold ">Select a time slot</p>

                }
                {selectedDate && groupedTimings[selectedDate] ? (
                    
                    groupedTimings[selectedDate].map((timing) => (
                        <button
                            key={timing._id}
                            onClick={() => {
                                handleTimingSelect(timing);
                                navigate(
                                    `/timing/movie?movieId=${movieId}&timeId=${timing._id}&timing=${timing.timing}`
                                );
                            }}
                            className={`timing-btn rounded-lg font-bold ${
                                selectedTiming?._id === timing._id ? "active" : ""
                            }`}
                        >
                            {timing.time}
                        </button>
                    ))
                ) : (
                    <p className="font-normal text-red-600 shadow-md">Please select a valid date with available timings.</p>
                )}
            </div>
        </div>

    //     <div className="calendar-container">
    //     {Object.keys(groupedTimings).length > 0 ? (
    //         Object.keys(groupedTimings).map((date) => (
    //             <div key={date} className="calendar-date">
    //                 <div className="date-header">{date}</div>
    //                 <div className="timings-list">
    //                     {groupedTimings[date].map((timing) => (
    //                         <button
    //                             key={timing._id}
    //                             onClick={() => {
    //                                 handleTimingSelect(timing);
    //                                 navigate(
    //                                     `/timing/movie?movieId=${movieId}&timing=${timing.timing}`
    //                                 );
    //                             }}
    //                             className={`timing-btn ${
    //                                 selectedTiming?._id === timing._id ? "active" : ""
    //                             }`}
    //                         >
    //                             {timing.time}
    //                         </button>
    //                     ))}
    //                 </div>
    //             </div>
    //         ))
    //     ) : (
    //         <p>No timings available.</p>
    //     )}
    // </div>
        // <div className="booking-container">
        //     <h1>Book Tickets</h1>
        //     <div className="timing-buttons">
        //         {timings.length > 0 &&
        //             timings.map((timing) => (
        //                 <button
        //                     key={timing._id}
        //                     onClick={() =>{ handleTimingSelect(timing)
        //                         // setAvailableSeats(timing.availableSeats)

        //                         navigate(`/timing/movie?movieId=${movieId}&timing=${timing.timing}`)
        //                     }}
        //                     className={`timing-btn ${selectedTiming?._id === timing._id ? "active" : ""}`}
        //                 >
                            
        //                     {timing.timing}
        //                 </button>
        //             ))}
        //     </div>
        //     </div>
    );
}

export default Seating;
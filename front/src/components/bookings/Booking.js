import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Booking.css"; // Import the CSS for styling
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";

import { getTimingsMovie,getTimingOfOneMovie } from "../api/apis";
import { convertLength } from "@mui/material/styles/cssUtils";
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';


function Booking() {
    const navigate=useNavigate()
    const [searchParams] = useSearchParams(); // Access query parameters

    const movieId=searchParams.get( "movieId");
    const time_Id=searchParams.get("timeId")
    const [date, time] =searchParams.get("timing").split(" ");
     // Get movieId from URL parameters
    const { currentUser } = useSelector((state) => state.user);
    // console.log(currentUser)
    
    const [timings, setTimings] = useState([]);
    const [selectedTiming, setSelectedTiming] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [availableSeats, setAvailableSeats] = useState([]);
    const [histroy,setHistory]=useState([]);
    // const [timeId,setTimeId]=useState(null)

    // Fetch movie timings
    useEffect(() => {

        

        getTimingsMovie(movieId).then((res)=>
            {
                setTimings(res.timings)
                // console.log(timings)
                getTimingOfOneMovie(movieId,time_Id).then((res)=>{
                    setHistory(res.bookedSeats)
                    setAvailableSeats(res.availableSeats)
                    // setTimeId(res.id);
                    

                }).catch((err)=>console.log(err))
            }).catch((err)=>console.log(err))

    
    }, [histroy]);
    let data=[];
    const handleTimingSelect = async(timing) => {
        setSelectedTiming(timing.timing);
       
        setAvailableSeats(timing.availableSeats); // Set available seats for selected timing
        setSelectedSeats([]); // Clear selected seats when timing changes
    };

    // Toggle seat selection
    const handleSeatSelect = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter((s) => s !== seat)); // Deselect seat
        } else {
            setSelectedSeats([...selectedSeats, seat]); // Select seat
        }
    };
    
    const responeData=async(res)=>{
       data=await res.data.timing.bookedSeats;
    //    console.log(data)     
    }

    // Handle ticket booking
    const bookTickets = async() => {

        if (selectedSeats.length === 0) {
            toast.warning(`Select the Seats`, {theme:"colored", position: 'top-center' });
            return;
        }
        localStorage.setItem("SelectedSeats",JSON.stringify(selectedSeats));
        let cost=0;
        async function costCalculated() {
            let n=selectedSeats.length;

            while(n--)
            {
                cost+=1;
                
            }
            cost*=100;
            
        }
        costCalculated();
        navigate(`/paypal/payment/?movieId=${movieId}&time=${time}&date=${date}&timeId=${time_Id}&cost=${cost}`)


        // const res= await axios.post("/timing/book", {
        //         timingId: timeId,
        //         userId: currentUser.newuser._id, // Replace with actual user ID
        //         seats: selectedSeats,
        //     })
        //     .then((res) => {
        //         responeData(res)

                


        //         // toast.success(``, {theme:"colored", position: 'top-center' });
                
        //             navigate(`/paypal/${cost}`)
        //         setSelectedSeats([]); // Clear the selected seats after booking
        //         setAvailableSeats((prev) => prev - selectedSeats.length); // Update available seats
        //     })
        //     .catch((error) => {
        //         toast.error(`Error in Booking.`, {theme:"colored", position: 'top-center' });
        //     });
    };

    const array1=Array.from({ length: 240 }, (_, i) => i + 1)

    function splitArrayIntoSixSeparateArrays(arr) {
        const partSize = Math.ceil(arr.length / 6); // Calculate size of each part
        const result = [];
      
        for (let i = 0; i < 6; i++) {
          const start = i * partSize;
          const end = start + partSize;
          result[i] = arr.slice(start, end); // Push each slice into a separate array
        }
      
        return result;
      }
      
    //   const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const [part1, part2, part3,part4,part5,part6] = splitArrayIntoSixSeparateArrays(array1);
      
   
      


    const commonElements = new Set(array1.filter(item => histroy.includes(item)));

    // console.log(histroy)

    

    return (
        <div className="  booking-container">
            <h1>Book Tickets  at {time} Show </h1>
            <p>Available Seats: {availableSeats}</p>
          
            {
                <div className=" seats-container">
                    {/* <h3>Selected Timing: {selectedTiming.timing}</h3> */}
                    

                    <div class="screen">
  Screen
</div>

                    <div className="balcony grid grid-cols-3 ">

                    <div className="seat-grid">
                        {part1.map((seat) => (
                            <button
                                key={seat}
                                className={`    text-center seat-btn ${
                                    selectedSeats.includes(seat)
                                        ? "selected"
                                        :commonElements.has(seat)

                                        ? "booked"
                                        : ""
                                }`}
                                onClick={() => handleSeatSelect(seat)}
                                disabled={commonElements.has(seat)} // Disable booked seats
                            >
                                {/* {seat} */}
                                
                            </button>
                        ))}
                    </div>

                    <div className="seat-grid">
                        {part2.map((seat) => (
                            <button
                                key={seat}
                                className={` rounded-lg    text-center seat-btn ${
                                    selectedSeats.includes(seat)
                                        ? "selected"
                                        :commonElements.has(seat)

                                        ? "booked"
                                        : ""
                                }`}
                                onClick={() => handleSeatSelect(seat)}
                                disabled={commonElements.has(seat)} // Disable booked seats
                            >
                                {/* {seat} */}
                            </button>
                        ))}
                    </div>


                    <div className="seat-grid">
                        {part3.map((seat) => (
                            <button
                                key={seat}
                                className={` rounded-lg  text-center seat-btn ${
                                    selectedSeats.includes(seat)
                                        ? "selected"
                                        :commonElements.has(seat)

                                        ? "booked"
                                        : ""
                                }`}
                                onClick={() => handleSeatSelect(seat)}
                                disabled={commonElements.has(seat)} // Disable booked seats
                            >
                                {/* {seat} */}
                            </button>
                        ))}
                    </div>

                    <div className="high">
                        {part4.map((seat) => (
                            <button
                                key={seat}
                                className={` rounded-lg   text-center seat-btn ${
                                    selectedSeats.includes(seat)
                                        ? "selected"
                                        :commonElements.has(seat)

                                        ? "booked"
                                        : ""
                                }`}
                                onClick={() => handleSeatSelect(seat)}
                                disabled={commonElements.has(seat)} // Disable booked seats
                            >
                                {/* {seat} */}
                                
                            </button>
                        ))}
                    </div>

                    <div className="high">
                        {part5.map((seat) => (
                            <button
                                key={seat}
                                className={` rounded-lg     text-center seat-btn ${
                                    selectedSeats.includes(seat)
                                        ? "selected"
                                        :commonElements.has(seat)

                                        ? "booked"
                                        : ""
                                }`}
                                onClick={() => handleSeatSelect(seat)}
                                disabled={commonElements.has(seat)} // Disable booked seats
                            >
                                {/* {seat} */}
                                
                            </button>
                        ))}
                    </div>

                    <div className="high">
                        {part6.map((seat) => (
                            <button
                                key={seat}
                                className={` rounded-lg   seat-btn ${
                                    selectedSeats.includes(seat)
                                        ? "selected"
                                        :commonElements.has(seat)

                                        ? "booked"
                                        : ""
                                }`}
                                onClick={() => handleSeatSelect(seat)}
                                disabled={commonElements.has(seat)} // Disable booked seats
                            >
                                {/* {seat} */}
                                
                            </button>
                        ))}
                    </div>

                    </div>

                    <button className="book-btn" onClick={bookTickets}>
                        Book Tickets
                    </button>
                </div>
            }
        </div>
    );
}

export default Booking;
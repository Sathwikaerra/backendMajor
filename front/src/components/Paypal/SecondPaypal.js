import React, { useEffect ,useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom'
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import {getTimingsMovie,getTimingOfOneMovie,getUserBookingsArray} from '../api/apis'
import { useSelector } from 'react-redux'




const PayPalButton = () => {
    const navigate=useNavigate();
    

    
    const [searchParams] = useSearchParams(); // Access query parameters

    const movieId=searchParams.get( "movieId");
    const time=searchParams.get("time")
    const date=searchParams.get("date");
    const cost=searchParams.get("cost")
    const timeId=searchParams.get("timeId");
    const selectedSeats=JSON.parse(localStorage.getItem("SelectedSeats"))
    const cart=JSON.parse(localStorage.getItem("UserCart"));
    let food=[];

    cart.map((i)=>{
      food.push(i.name);

    })

    console.log(food)
     // Get movieId from URL parameters
    const { currentUser } = useSelector((state) => state.user);
    // console.log(currentUser)
    
    const [timings, setTimings] = useState([]);
    const [selectedTiming, setSelectedTiming] = useState(null);
   
    const [availableSeats, setAvailableSeats] = useState([]);
    const [histroy,setHistory]=useState([]);
    
    // const responeData=async(res)=>{
    //     data=await res.data.timing.bookedSeats;
    //  //    console.log(data)     
    //  }

     const bookTMovie=async()=>{
        // console.log(timeId,currentUser,selectedSeats)
        const res= await axios.post("/timing/book", {
            timingId: timeId,
            userId: currentUser.newuser._id, // Replace with actual user ID
            seats: selectedSeats,
        })
        if(res.status==200)
        {
          getUserBookingsArray(currentUser.newuser._id,movieId,date,time,selectedSeats,cost,food).then((res)=>{
            toast.success(`Booked Successfully`, {theme:"colored", position: 'top-center' });
            
                navigate(`/mail/?cost=${cost}&time=${time}&date=${date}&movieId=${movieId}`)

          }).catch((err)=>console.log("error in Adding seats")
        )
          

                
            // setSelectedSeats([]); // Clear the selected seats after booking
            // setAvailableSeats((prev) => prev - selectedSeats.length); 

            

        }
        else
                toast.error(`Booking error Successfully`, {theme:"colored", position: 'top-center' });





     }
    // Fetch movie timings
    useEffect(() => {

        

        getTimingsMovie(movieId).then((res)=>
            {
                setTimings(res.timings)
                // console.log(timings)
                getTimingOfOneMovie(movieId,timeId).then((res)=>{
                    setHistory(res.bookedSeats)
                    setAvailableSeats(res.availableSeats)
                    // setTimeId(res.id);

                }).catch((err)=>console.log("error in getting timing of a movie"))
            }).catch((err)=>console.log(err))

    
    }, [histroy]);

    let data=[];
    const handleTimingSelect = async(timing) => {
        setSelectedTiming(timing.timing);
       
        setAvailableSeats(timing.availableSeats); // Set available seats for selected timing
        // setSelectedSeats([]); // Clear selected seats when timing changes
    };
    useEffect(() => {
        if (window.paypal) {
          window.paypal.Buttons({
            createOrder: function (data, actions) {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: cost, // Amount to be charged
                    },
                  },
                ],
              });
            },
            onApprove: function (data, actions) {
              return actions.order.capture().then(async function (details) {
                toast.success(`Payment successful! Transaction ID: ${details.id}`, { theme:"colored",position: 'top-center' });
                bookTMovie();
       
            


           // Update available seats
        })
        .catch((error) => {
            toast.error(`Error in Booking.${error}`, {theme:"colored", position: 'top-center' });
        });
                // navigate('/')

                // alert(``);
                // console.log("Payment details:", details);
              
            },
            onError: function (err) {
            //   console.error("PayPal Checkout error:", err);
            toast.warning(`An error occurred during payment.`, { theme:"colored",position: 'top-center' });

            //   alert("");
            },
            // Prevent automatic login to saved account
            commit: true,
            intent: "capture",  // Specify the intent for immediate payment capture
          }).render("#paypal-button-container");
        }
      }, []);
      
      

  return<div className="flex justify-center items-center mt-6">
    <div id="paypal-button-container"></div>;

  </div> 
};

export default PayPalButton;

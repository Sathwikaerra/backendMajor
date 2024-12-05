import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

import {getUserName,getUserHistory,deleteUserBookings} from '../components/api/apis'


const  UserHistory=()=> {
    const {currentUser}=useSelector((state)=>state.user);
    const userId=currentUser.newuser._id;
    const [movieId,setMovieId]=useState(null);
    const [details,setDetails]=useState([]);
    const [movieDetails,setMovieDetails]=useState([]);

    useEffect(()=>{
        getUserHistory(userId).then((res)=>{
            setDetails(res.bookings);
           
        })
            
    

    },[userId])

    // console.log({details})

    const handleDelete=async(index)=>{

        deleteUserBookings(userId,index).then((res)=>{
            toast.success(`Booking deleted Successfully`, { theme:"colored",position: 'top-center' });


        }).catch((err)=>{
            toast.error(`Error in Booking deletion`, { theme:"colored",position: 'top-center' });


        })
        }


    
    return (
        <div className="flex flex-col items-center gap-10 p-6">
        {details &&
          details.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-tr from-orange-500 to-orange-300 w-[90%] md:w-[500px] rounded-xl p-6 flex flex-col items-center shadow-2xl transform transition hover:scale-105"
            >
              <div className="bg-slate-100 w-full p-4 rounded-lg shadow-sm mb-6">
                <p className="text-lg font-extrabold text-gray-900">
                  Title:{" "}
                  <span className="font-semibold text-orange-600">
                    {item.movieId.title}
                  </span>
                </p>
              </div>
              <div className="w-full text-gray-800 space-y-3 mb-6 p-4 bg-white rounded-lg shadow-sm">
  <p className="text-base flex items-center">
    <span className="font-medium text-orange-600 mr-2">🎬 Movie Date:</span> 
    <span>{item.movieDate}</span>
  </p>
  <p className="text-base flex items-center">
    <span className="font-medium text-blue-600 mr-2">📅 Booked Date:</span> 
    <span>{new Date(item.bookingDate).toLocaleDateString()}</span>
  </p>
  <p className="text-base flex items-center">
    <span className="font-semibold text-green-600 mr-2">💵 Cost:</span> 
    <span>${item.movieCost}</span>
  </p>
  <p className="text-base flex items-center">
    <span className="font-medium text-purple-600 mr-2">⏰ Movie Slot:</span> 
    <span>{item.movieTime}</span>
  </p>
</div>

              <div className="w-full flex flex-col items-start mb-4">
                <p className="font-bold text-lg mb-2 text-gray-900">Actors:</p>
                <div className="flex flex-wrap gap-2">
                  {item.movieId.actors.map((actor, index) => (
                    <p
                      key={index}
                      className="bg-slate-200 text-gray-800 px-3 py-1 rounded-full text-sm shadow-md"
                    >
                      {actor}
                    </p>
                  ))}
                </div>
              </div>
              <div className="w-full flex flex-col items-start mb-4">
                <p className="font-bold text-lg mb-2 text-gray-900">Seat Numbers:</p>
                <div className="flex flex-wrap gap-2">
                  {item.seatNumbers.map((seat, index) => (
                    <span
                      key={index}
                      className="bg-orange-300 text-gray-900 px-3 py-1 rounded-full text-sm shadow-md"
                    >
                      {seat}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full flex flex-col items-start">
                <p className="font-bold text-lg mb-2 text-gray-900">Ordered Food:</p>
                <div className="flex flex-wrap gap-2">
                  {item.food.map((food, index) => (
                    <span
                      key={index}
                      className="bg-green-300 text-gray-900 px-3 py-1 rounded-full text-sm shadow-md"
                    >
                      {food}
                    </span>
                  ))}
                </div>
              </div>
              <button onClick={()=>handleDelete(index)} className="bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:from-red-600 hover:to-red-800 active:scale-95 active:from-red-700 active:to-red-900 focus:outline-none focus:ring-4 focus:ring-red-300">
  Delete
</button>

            </div>
           

          ))}
      </div>
      
  )
}

export default UserHistory;

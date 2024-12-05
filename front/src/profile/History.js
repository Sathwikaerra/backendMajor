import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {getUserName,getMovieName} from '../components/api/apis'


const  History=()=> {
    const {currentUser}=useSelector((state)=>state.user);
    const userId=currentUser.newuser._id;
    const [movieId,setMovieId]=useState(null);
    const [details,setDetails]=useState([]);
    const [movieDetails,setMovieDetails]=useState([]);

    useEffect(()=>{
        getUserName(userId).then((res)=>{
            setDetails(res.newuser.bookings);
           
        })

    },[userId])

    console.log(details)


    
    return (
    <div>
        {
            details && details.map((item)=>{
                return <div>
                    {
                        getMovieName(item.movieId).then((res)=>{
                            setMovieDetails(res.movie);
                        }).then(()=>{
                            movieDetails&& <>
                            <p>{movieDetails.title}</p>
                            </>
                        })
                    }
                    <p>{item.movieTime}</p>
                    <p>{item.movieCost}</p>

                </div>
            })
        }
       
      
    </div>
  )
}

export default History;

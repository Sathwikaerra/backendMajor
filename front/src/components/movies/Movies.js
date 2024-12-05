import React, { useEffect, useState } from 'react'
import { getAllMovies } from '../api/apis'
import MovieItem from '../movieitem'
import { ToastContainer, toast } from 'react-toastify';


const Movies = () => {
  const [movies,setMovies]=useState([])
  const [refresh,setRefresh]=useState(false);

  

  useEffect(()=>{
    getAllMovies().then((data)=>
      {
        setMovies(data.movies)
       

      }).catch((err)=>
        toast.success(`Movies Loading!..`, { position: 'top-center' })
    )

  },[refresh])
  return (
    <div className='flex mt-4 gap-4 flex-col justify-center items-center'>
        <h1 className='text-center m-auto mt-[10px] font-mono font-bold text-black bg-fuchsia-400 p-2 rounded-md w-[300px] mb-[25px] font-bold text-[14px] sm:text-2xl'>All Movies </h1>
       <div className='flex justify-center items-center flex-wrap'>
        {
           movies && movies.map((i,index)=>{
            return <MovieItem  key={index} id={i._id} title={i.title}   posterUrl={i.posterUrl} releaseDate={i.releaseDate}  />
            
    
            })
        }

       </div>


      
    </div>
  )
}

export default Movies

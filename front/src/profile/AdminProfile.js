import React, { useEffect, useState } from 'react'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { DeleteBookedTicket, getAdminById, getBookings } from '../components/api/apis';
import { deleteMovie ,BookedTickets} from '../components/api/apis';
import '../index.css'
import { toast } from 'react-toastify';

const UserProfile = () => {

  const navigate=useNavigate()

  const [admin,setAdmin]=useState()

  const [movies,setmovies]=useState([])

 let a=[];

 const [message,setMessage]=useState()





 

  useEffect(()=>{

    // const AdminName=localStorage.getItem("AdminName")
    

    getAdminById().then((res)=>{
        setAdmin(res.admin.name);
        setmovies(res.admin.addMovies)

    })

    
    
 

  //  bookings && bookings.map((i)=>{
  //   a.push(i.movie)
  // })
  // a && getMovieName(a).then((res)=>console.log(res))


  },[admin])



const handleDeleteImage=async(id)=>{
 await deleteMovie(id).then((res)=>{
  toast.success(`Movie Deleted`, {theme:"colored", position: 'top-center' });

 }).catch((err)=>{
  toast.error(`Movie not  Deleted`, {theme:"colored", position: 'top-center' });


 })
  

}










  
    
 


  

  return (
    <div className='main m-auto'>

   
    <div className='flex sm:flex-row mt-[10px]   flex-col gap-10 justify-center items-center'>
    <div className="flex flex-col justify-center items-center p-8 bg-gradient-to-b from-gray-50 to-gray-200 rounded-lg shadow-lg max-w-sm w-full">
  {/* Profile Image */}
  <img 
    className="w-44 h-44 rounded-full border-4 border-gradient-to-r from-pink-500 via-purple-600 to-blue-500 shadow-xl transform transition-transform duration-300 hover:scale-110" 
    src="https://i.etsystatic.com/41975932/r/il/e29c69/5876963950/il_570xN.5876963950_lk3r.jpg" 
    alt="Admin Profile"
  />

  {/* Admin Email */}
  <p className="mt-6 text-lg font-extrabold text-gray-800 font-poppins">
    Admin: <span className="font-semibold text-red-500">{admin}</span>
  </p>
</div>

      
    </div>
   <div className="flex justify-center items-center p-8 ">
  <div className="font-bold text-xl text-center space-y-8 w-full">
    {/* Movies Status */}
    {movies && (
      <p className="bg-zinc-900 text-white p-3 mx-auto font-serif w-fit rounded-md shadow-lg">
        {movies.length > 0 ? "Added Movies" : "No Movies Added"}
      </p>
    )}

    {/* Movies List */}
    <div className="flex flex-wrap justify-center gap-6">
      {movies &&
        movies.length > 0 &&
        movies.map((movie) => (
          <div
            key={movie._id}
            className="w-[300px] p-4 bg-gradient-to-t from-slate-600 via-slate-500 to-slate-400 shadow-2xl rounded-lg text-white space-y-4 transform transition-all duration-300 hover:scale-105"
          >
            {/* Movie Title */}
            <p className="text-lg font-semibold text-center">{movie.title}</p>

            {/* Release Date */}
            <p className="text-sm text-gray-200 text-center">
              {new Date(`${movie.releaseDate}`).toDateString()}
            </p>

            {/* Movie Poster */}
            <img
              className="w-full h-[200px] object-cover rounded-md shadow-lg"
              src={movie.imgUrl}
              alt="Poster not released"
            />

            {/* Delete Button */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  handleDeleteImage(movie._id);
                }}
                className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                <DeleteIcon style={{ color: "white", fontSize: "30px" }} />
              </button>
            </div>
          </div>
        ))}
    </div>
  </div>
</div>

         


        
        
         
          
       
      

        </div>

        

   
    
  )
}

export default UserProfile

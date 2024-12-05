import { useNavigate } from 'react-router-dom'
import React from 'react'
import { useDispatch,useSelector } from 'react-redux'

const MovieItem = ({title,releaseDate,posterUrl,id}) => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const isAdminLoggedIn=useSelector((state)=>state.admin.isloggedIn);
  const isUserLoggedIn=useSelector((state)=>state.user.isloggedIn);
 
  return (
    <div className="flex justify-center items-center">
  <div
    onClick={() => {
      // isAdminLoggedIn ? navigate('/') :
      isUserLoggedIn ? navigate(`/booking/${id}`) : navigate(`/movie/${id}`);
    }}
    className="w-[300px] font-semibold truncate bg-gradient-to-t from-gray-300 via-gray-400 to-gray-500 p-5 rounded-lg shadow-md hover:scale-105 hover:shadow-lg hover:shadow-gray-700 transition-all duration-300 ease-in-out flex flex-col items-center justify-between"
  >
    <img
      className="w-[220px] h-[170px] object-cover rounded-lg mb-4 transition-transform duration-500 ease-in-out transform hover:scale-105"
      src={posterUrl}
      alt="Movie Poster"
    />
    <h3 className="text-center text-[16px] sm:text-[18px] font-semibold text-gray-800 mb-3">{title}</h3>
    <button
      className="bg-gradient-to-r from-blue-600 to-blue-400 hover:bg-gradient-to-l hover:from-gray-600 hover:to-gray-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out"
    >
      View
    </button>
  </div>
</div>

   )
  
}

export default MovieItem

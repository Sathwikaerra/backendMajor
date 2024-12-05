import React, { useEffect, useState } from 'react'
import {   deleteBooking, getUserBookings, getUserName } from '../components/api/apis'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate ,Link} from 'react-router-dom';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSelector } from  'react-redux'
const UserProfile = () => {
  const {currentUser}=useSelector((state)=>state.user);
  
  const navigate=useNavigate()
  const[message,setMessage]=useState()

  const [bookings,setBookings]=useState()
  const [username,setUserName]=useState()
  const [useremail,setUserEmail]=useState()

 let a=[];

 const handleDelete=async(id)=>{
  await deleteBooking(id)
  navigate('/userprofile')

 }

  useEffect(()=>{
      // const UserName=currentUser.newuser.name;
      // const UserEmail=currentUser.newuser.email
      // setUserName(UserName)
      // setUserEmail(UserEmail)
    getUserBookings(currentUser.newuser._id).then((res)=>{
      setBookings(res.bookings);
      
    },)
    
  

  //  bookings && bookings.map((i)=>{
  //   a.push(i.movie)
  // })
  // a && getMovieName(a).then((res)=>console.log(res))


  },[currentUser])





  
    
 

// console.log(currentUser.newuser.imgUrl)
  

  return (
    <div className="flex mt-[80px] flex-col gap-10 justify-center items-center">
  {/* Profile Section */}
  <div className="flex flex-col justify-center gap-5 items-center bg-gradient-to-r from-white via-[#F8F8F8] to-white p-8 rounded-3xl shadow-2xl w-full max-w-[480px]">
    <img 
      src={currentUser.newuser.imgUrl} 
      alt="Profile Image" 
      className="w-32 h-32 object-cover rounded-full border-8 border-gradient-to-r from-[#FF6F61] via-[#D2691E] to-[#FFB6C1] shadow-xl transform transition-all duration-300 ease-in-out hover:scale-110"
    />
    <p className="text-xl font-bold text-black mt-4 font-[Poppins]">Name: <span className="font-semibold text-red-600">{currentUser.newuser.name}</span></p>
    <p className="text-xl font-medium text-black font-[Lora]">Email: <span className="font-semibold text-red-600">{currentUser.newuser.email}</span></p>
    <button 
  className="p-4 text-black font-semibold rounded-lg bg-slate-300  shadow-xl hover:shadow-lg hover:bg-gradient-to-l from-[#b1415b] via-[#FF4500] to-[#cba67a] transition-all duration-300 ease-in-out font-[Poppins]"
  onClick={() => { navigate('/updateuser'); }}
>
  Update User Details
</button>



  </div>

  {/* Buttons Section */}
  <div className="flex flex-col justify-center items-center gap-6">
    <button 
      onClick={() => navigate('/history')} 
      className="bg-gradient-to-r from-[#884adf] via-[#1414b0] to-[#6109b9] text-white font-[Lora] font-bold py-4 px-10 rounded-2xl shadow-xl transform hover:scale-110 hover:rotate-3 hover:bg-[#228B22] transition-all duration-300 ease-in-out active:scale-95 active:bg-[#006400] focus:outline-none focus:ring-4 focus:ring-[#32CD32] focus:ring-opacity-50"
    >
      View My Bookings
    </button>
  </div>
  </div>

  
  )
}

export default UserProfile

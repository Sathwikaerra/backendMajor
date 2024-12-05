import React, { useEffect, useState } from 'react'
import { updateUser, username } from '../api/apis';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


function Update() {
    const {currentUser}=useSelector((state)=>state.user)
    const Intialname=currentUser.newuser.name;
    const Iemail=currentUser.newuser.email;
    const userId=currentUser.newuser._id;
    const[ name,setName]=useState(Intialname);
 const [email,setEmail]=useState(Iemail)
 const [password,setPassword]=useState()







    const handleSubmit=(e)=>{
        e.preventDefault();

        updateUser({userId,name,email,password}).then((res)=>{
            toast.success(`Updated Successfully`, { theme:"colored",position: 'top-center' });

    }).catch((err)=>{

        toast.success(`Try again after somettime!`, { theme:"colored",position: 'top-center' });

    })
    }

    

  return (
    <div className="flex justify-center mt-[30px] items-center">
  <form 
    onSubmit={handleSubmit} 
    className="flex flex-col items-center p-6 gap-6 bg-gradient-to-r from-white via-gray-100 to-gray-50 rounded-xl shadow-lg max-w-md w-full"
  >
    {/* Name Input */}
    <div className="flex flex-col w-full">
      <label className="text-gray-700 font-semibold mb-2">Name</label>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        className="rounded-md w-full p-3 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition-all" 
        type="text" 
        placeholder="Enter your name" 
        name="name"
      />
    </div>

    {/* Email Input */}
    <div className="flex flex-col w-full">
      <label className="text-gray-700 font-semibold mb-2">Email</label>
      <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        className="rounded-md w-full p-3 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition-all" 
        type="email" 
        placeholder="Enter your email" 
        name="email"
      />
    </div>

    {/* Password Input */}
    <div className="flex flex-col w-full">
      <label className="text-gray-700 font-semibold mb-2">Password</label>
      <input 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        className="rounded-md w-full p-3 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition-all" 
        type="password" 
        placeholder="Enter your password" 
        name="password"
      />
    </div>

    {/* Submit Button */}
    <button 
      className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 hover:shadow-xl transition-all duration-300"
      type="submit"
    >
      Update
    </button>
  </form>
</div>

  )
}

export default Update

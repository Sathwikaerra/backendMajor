import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import React, { useEffect, useState } from 'react'
import { getAllMovies } from './api/apis';
import {  Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { adminActions, userActions } from '../store/reducers';
import SearchBar from './searchBar'
import { toast } from 'react-toastify';
import { FaHome } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { FaUserAlt } from "react-icons/fa";
import { FaBars } from 'react-icons/fa';
import { MdFastfood } from "react-icons/md";
import './header.css'
import SlidingMenu from './SlidingMenu';


export default function Header() {

  const dispatch=useDispatch()
  const navigate=useNavigate()
 
  const [movies,setMovies]=useState([])

  const [menuOpen,setMenuOpen]=useState(false);
  const toggleMenu=()=>{
    setMenuOpen((prev)=>!prev)
  }
  
  const isAdminLoggedIn=useSelector((state)=>state.admin.isloggedIn);
  const isUserLoggedIn=useSelector((state)=>state.user.isloggedIn);
 
const CartCount=useSelector((state)=>state.cart.CartCount)


  useEffect(()=>{
  getAllMovies().then((data)=>{setMovies(data.movies)}).catch((err)=>console.log(err))
 
  // Retrieve the JSON string from localStorage
   
  


  },[CartCount])

  const Logout=(isAdmin)=>{
    // if(!isAdmin)
    // {
    //   localStorage.removeItem("UserID");
    // localStorage.removeItem("UserName");
    // }
    // else{
    //   localStorage.removeItem("AminID");
    // localStorage.removeItem("token");
    // localStorage.removeItem("AdminName")

    // }
    
    dispatch(isAdmin?adminActions.logout():userActions.logout())

  }


  const handleSearch=(Searchedmovie)=>{

    if(!Searchedmovie)
    {
      return toast.info('Please enter the Movie ',{position:"top-center"})
    }
    else
    {
      navigate(`/search?query=${Searchedmovie}`);
    }
    
  }

  


  return (
    <div className="navbar bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 p-4 shadow-lg">
    {/* Brand and Toggle */}
    <div className="flex items-center justify-between">
      <div
        className="flex items-center space-x-3 cursor-pointer hover:scale-105 transition-transform duration-300"
        onClick={toggleMenu}
      >
        <MovieFilterIcon className="text-white text-4xl" />
        <p className="text-white font-bold text-2xl tracking-wide">Bashaa Theaters</p>
      </div>
  
      {/* Mobile Menu Button */}
      <div className="sm:hidden">
        <button
          className="text-white hover:text-teal-400 transition duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars size={28} />
        </button>
      </div>
    </div>
  
    {/* Search Bar (Desktop Only) */}
    {!isAdminLoggedIn && (
      <div className="hidden sm:block mx-auto mt-4 sm:mt-0 w-full max-w-md">
        <SearchBar onSearch={handleSearch} />
      </div>
    )}
  
    {/* Menu Items */}
    <div
      className={`${
        menuOpen ? "block" : "hidden"
      } sm:flex sm:items-center sm:justify-between mt-4 sm:mt-0`}
    >
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
        <Link
          className="text-white font-semibold text-lg hover:text-teal-400 hover:scale-105 transition-all duration-300"
          to="/"
        >
          <FaHome className="inline-block mr-2 text-xl" /> Home
        </Link>
  
        {!isAdminLoggedIn && !isUserLoggedIn && (
          <>
            <Link
              className="text-white font-semibold text-lg hover:text-purple-400 hover:scale-105 transition-all duration-300"
              to="/Admin"
            >
              <GrUserAdmin className="inline-block mr-2 text-xl" /> Admin
            </Link>
            <Link
              className="text-white font-semibold text-lg hover:text-blue-400 hover:scale-105 transition-all duration-300"
              to="/Auth"
            >
              <FaUserAlt className="inline-block mr-2 text-xl" /> Auth
            </Link>
          </>
        )}
  
        {isUserLoggedIn && (
          <>
            <Link
              className="text-white font-semibold text-lg hover:text-green-400 hover:scale-105 transition-all duration-300"
              to="/userprofile"
            >
              <FaUserAlt className="inline-block mr-2 text-xl" /> Profile
            </Link>
            <Link
              className="text-white font-semibold text-lg hover:text-orange-400 hover:scale-105 transition-all duration-300"
              to="/userfood"
            >
              <MdFastfood className="inline-block mr-2 text-xl" /> {CartCount}
            </Link>
            <Link
              className="text-white font-semibold text-lg hover:text-red-400 hover:scale-105 transition-all duration-300"
              onClick={() => Logout(false)}
              to="/"
            >
              Logout
            </Link>
          </>
        )}
  
        {isAdminLoggedIn && (
          <>
            <Link
              className="text-white font-semibold text-lg hover:text-pink-400 hover:scale-105 transition-all duration-300"
              to="/add"
            >
              +Movies
            </Link>
            <Link
              className="text-white font-semibold text-lg hover:text-yellow-400 hover:scale-105 transition-all duration-300"
              to="/Adminprofile"
            >
              Profile
            </Link>
            <Link
              className="text-white font-semibold text-lg hover:text-red-500 hover:scale-105 transition-all duration-300"
              onClick={() => Logout(true)}
              to="/"
            >
              Logout
            </Link>
          </>
        )}
      </div>
    </div>
  
    {/* Sliding Menu for Mobile */}
    <SlidingMenu isOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />
  </div>
  

  )
}

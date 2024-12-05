import React, { useEffect } from 'react'
import Header from './components/header'
import { Routes,Route } from 'react-router-dom'
import Homepage from './components/Homepage'
import Movies from './components/movies/Movies'
import Admin from './components/Admin/Admin'
import Auth from './components/Auth/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { adminActions, userActions } from './store/reducers'
import Booking from './components/bookings/Booking'
import UserProfile from './profile/UserProfile'
import Add from './components/ADDMOVIES/Add'
import AdminProfile from './profile/AdminProfile'
import SinglePage from './components/SinglePage/SinglePage'
import Update from './components/update/update'
import Payments from './components/payments/Payments'
import {loadStripe} from '@stripe/stripe-js'
import PageNotFound from './components/PageNotFound'
import { ToastContainer, toast } from 'react-toastify';
import FoodOrderingPage from './components/Auth/userfood'

import 'react-toastify/dist/ReactToastify.css';

import './App.css'
import Voice from './components/VoiceAssist.js/Voice'
import MyBooking from './components/bookings/MyBooking'
import Seating from './components/bookings/Seating'
import SecondPaypal from './components/Paypal/SecondPaypal'
import SendTicketEmail from './components/mail/SendTicketEmail'
import Search from './components/Search'
import UserHistory from './profile/UserHistory'

// import SearchBar from './components/searchBar'
// import {SearchBar} from './components/searchBar/voiceSearch'


export default function App() {

  const stripePromise=loadStripe("pk_test_51PJum7SJ5bUiR3hhuEuAuzvu5XsPd2TCUbuejcm2gk3FCe3fK1Ci8N9HXNErIlp8ItDM4IVjAAjX8bn6FAKOZEYE003u7ip7lN");
console.log(stripePromise)
  const dispatch=useDispatch()
  
  const isAdminLoggedIn=useSelector((state)=>state.admin.isloggedIn);
  const isUserLoggedIn=useSelector((state)=>state.user.isloggedIn);


useEffect(()=>{
  if(localStorage.getItem("userId"))
    {
      dispatch(userActions.login())
      
    }
    else if(localStorage.getItem("adminId"))
      {
        dispatch(adminActions.login())
      }
},[dispatch])


const search=(data)=>{
  console.log(data)

}

  return (
    
    <div>

      <Header/>
     
      <ToastContainer />
      
      <div class="lines">
  <div class="line"></div>
  <div class="line"></div>
  <div class="line"></div>
</div>

   <section>
    <Routes>
      {/* <Route path='/search' element={<SearchBar/>}/> */}
      <Route path='/movies' element={<Movies/>}/>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/search' element={<Search/>}/>
      {
        !isAdminLoggedIn && !isUserLoggedIn && <>
          <Route path='/admin' element={<Admin/>}/>
      <Route path='/auth' element={<Auth/>}/>
        
        
        </>
      }

      {
        isUserLoggedIn && !isAdminLoggedIn && <>
          <Route path='/userprofile' element={<UserProfile/>}/>
<Route path='/userfood' element={<FoodOrderingPage/>}/>
<Route path='/booking/:id' element={<MyBooking/>}/>
<Route path='/updateuser' element={<Update/>}/>
<Route path='/timing/:id' element={<Seating/>}/>
<Route path='/timing/movie' element={<Booking/>}/>
{/* <Route path='/payment' element={<Payments/>}/>   */}
<Route path='/paypal/payment' element={<SecondPaypal/>}/>
<Route path='/mail' element={<SendTicketEmail/>}/>
<Route path='/history' element={<UserHistory/>}/>
        </>
      }
    
    {
      isAdminLoggedIn && !isUserLoggedIn && <>

<Route path='/add' element={<Add/>}/>
<Route path='/adminprofile' element={<AdminProfile/>}/>
      
      </>
    }
    <Route path='/movie/:id' element={<MyBooking/>} />
    <Route path='/*' element={<Voice/>}/>
    
  

    </Routes>



   </section>

    </div>
    
   
  )
}

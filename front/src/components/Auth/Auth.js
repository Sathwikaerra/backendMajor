import React, { useState } from 'react'
import AuthForm from './AuthForm'
import { sendUserAuthRequest } from '../api/apis'
import { userActions } from '../../store/reducers'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import '../../index.css'
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux'


const Auth = () => {

  

  const navigate=useNavigate()
const dispatch=useDispatch();
const [error,setError]=useState();
const onResreceived=(data)=>{
  dispatch(userActions.login())
  dispatch(userActions.loginSuccess(data))
  localStorage.setItem("UserEmail",data.newuser.mail);
  localStorage.setItem("UserName",data.newuser.name);
  localStorage.setItem("UserId",data.newuser._id);
 

}
  const getData=(data)=>{
  
    sendUserAuthRequest(data.inputs,data.signup).then(onResreceived).then(()=>{

      const UserName=localStorage.getItem("UserName");
      toast.success(`WelCome ${UserName}`, { position: 'top-center' });

      navigate('/')
      
    }).catch((err)=>
      
      toast.error(`Invalid Credentials! ${err.message}`, { position: 'top-center' })


    )
  }
  return (
    <div className=' w-full flex justify-center items-center flex-col '>
       <div className=' flex justify-center items-center flex-col mt-[60px]'>
        <AuthForm onsubmit={getData} isAdmin={false}/>
       
    </div>
    

   
  </div>
   
  )
}

export default Auth

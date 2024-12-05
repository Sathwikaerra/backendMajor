import React, { useState } from 'react'
import AuthForm from '../Auth/AuthForm'
import { sendAdminAuthRequest } from '../api/apis'
import { adminActions } from '../../store/reducers'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


const Admin = () => {

  const navigate=useNavigate();

  const dispatch=useDispatch();
  const [error,setError]=useState();
  const [adminname,setAdminName]=useState("ADMIN");

  const onResreceived=(data)=>{


    dispatch(adminActions.login());
  
    localStorage.setItem("AdminEmail",data.email);
    localStorage.setItem("AdminName",data.name);
    localStorage.setItem("AdminId",data.id);
    localStorage.setItem("token",data.token)
  }
  const getData=(data)=>{
    sendAdminAuthRequest(data.inputs).then(onResreceived).then(()=>
      {
        const AdminName=localStorage.getItem("AdminName");
        toast.success(`WelCome  ${AdminName}`, { position: 'top-center' });

        navigate('/')}
      ).catch((err)=>{
      toast.error('Incorrect tCredentials', { position: 'top-center' });

    })
  }
  return (
    <div className=' w-full flex justify-center items-center flex-col '>
    <div className=' flex justify-center items-center flex-col mt-[60px]'>
     <AuthForm onsubmit={getData} isAdmin={true}/>
    
 </div>
 


</div>
  )
}

export default Admin

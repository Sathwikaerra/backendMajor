import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { auth,provider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import '../../index.css'
import { userActions } from '../../store/reducers';
// import {Oauth} from './Oauth'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GoogleLoginButton from './Oauth';
import { useSelector ,useDispatch} from 'react-redux'
import axios from 'axios';
import { toast } from 'react-toastify';
const AuthForm = ({onsubmit,isAdmin}) => {
    const {currentUser}=useSelector((state)=>state.user);
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [inputs,setInputs]=useState({
        name:"",
        email:"",
        password:"",
        image:undefined,
    })
    const handleChange=(e)=>{
        setInputs((prevState)=>({...prevState,[e.target.name]:e.target.value}))
    }

    const [loading,setLoading]=useState(false);
    const signInWithGoogle = async (e) => {
        // dispatch(loginStart());
        e.preventDefault(); 
        signInWithPopup(auth, provider)
          .then((result) => {
            axios
              .post("/user/google", {
                name: result.user.displayName,
                email: result.user.email,
                imgUrl: result.user.photoURL,
              })
              .then((res) => {
                const newuser={newuser:res.data}
                dispatch(userActions.login())
                dispatch(userActions.loginSuccess(newuser))
                toast.success(`WelCome ${newuser.newuser.name}`, { position: 'top-center' });

                navigate("/")
              });
          })
          .catch((error) => {
            console.log(error);
          });
      };
    const handleSubmit=(e)=>{
              e.preventDefault();
        setLoading(true);
        onsubmit({inputs,signup: isAdmin?false:isSignup})
        

    }

    const [isSignup ,setisSignup]=useState(false);
  
  return (
  
         <div className='userF  rounded-xl border-t  shadow-2xl border-2  shadow-zinc-500 p-[5px]  sm:p-[20px]    flex justify-center items-center flex-col'>
<p  onClick={()=>navigate('/')} className='bg-red-600 rounded-full  ml-[330px] mb-[5px]'><CloseIcon/></p>
<h1 className='text-xl  text-center p-2 rounded-lg mb-[20px] font-semibold '>{isSignup?"Sign up":"Login "}</h1>

<form className='flex justify-center items-center gap-2  flex-col'>
    {
      !isAdmin &&isSignup &&   <div className='flex justify-center items-center  flex-col'>
    
        <input className=' text-center h-9 w-[350px] rounded-md border-2 border-gray-800 ' placeholder='Name' onChange={handleChange} name='name' value={inputs.name} type='text'/>
        <input className='text-center h-9 w-[350px] rounded-md border-2 border-gray-800 ' type='file' onChange={(e) => inputs.image=e.target.files[0]}  placeholder='' name='image'/>

    </div>

    }

    <div className='flex justify-center items-center  flex-col'>
    
        <input className='h-9 text-center w-[350px] rounded-md border-2 border-gray-800 ' placeholder='Email' onChange={handleChange} name='email' type='email' value={inputs.email}/>
    </div>
    <div className='flex justify-center items-center  flex-col'>
  
        <input className=' text-center h-9 w-[350px] rounded-md border-2 border-gray-800 ' placeholder='Password' onChange={handleChange} name='password' value={inputs.password} type='password'/>
    </div>
     
     <button className= 'mt-2 rounded-md w-full bg-green-500 p-2 mb-[10px] text-black font-semibold' onClick={handleSubmit}>{isSignup?"Signup":"Login"}</button>
    
    {
      !isAdmin&&      <button className= 'mt-2 rounded-md w-full bg-green-500 p-2 mb-[10px] text-black font-semibold' onClick={signInWithGoogle}>signwithgoogle</button>

    } 

     {/* <p className='text-white font-serif'>{loading?"verifying...":""}</p> */}
</form>



{
     !isAdmin &&<button onClick={()=>setisSignup(!isSignup)} className= 'mt-5 rounded-md w-full p-2 hover:text-white mb-[5px] bg-slate-300 hover:bg-violet-500   text-black font-semibold' ><ArrowForwardIcon/> {!isSignup?"Signup":"Login"}</button>

}



</div>


   
  )
}

export default AuthForm

import React, { useEffect, useState } from 'react'
import '../../index.css'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { getUserName } from '../api/apis';
import { useNavigate } from 'react-router-dom';
import SyncIcon from '@mui/icons-material/Sync';
import TaskAltIcon from '@mui/icons-material/TaskAlt';


function Payments() {

  const navigate=useNavigate()


  const[name,setUserName]=useState();
  const [email,setUserEmail]=useState();
  const [message,setMessage]=useState()
  const [loading,setLoading]=useState(false)
  const[finish,setFinish]=useState(false)

  useEffect(()=>{
    
    getUserName().then((res)=>{
     setUserName(res.name)
     setUserEmail(res.email)

   })
  })

  const handleChange=(e)=>{
    setLoading(true)
  }

  const handleSubmit=(e)=>{
    setLoading(false)
    setFinish(true)
  }
  return (
    <div className='flex  flex-col gap-[40px] mt-[30px] justify-center items-center'>
    <div className='flex border-2 shadow-2xl shadow-slate-600  p-3 flex-col gap-4 justify-center items-center'>
      <h1  className='text-center mt-[20px] font-bold text-xl'>Payment</h1>
      <h2></h2>
       <div className='flex justify-center items-center flex-col gap-4'>
       <input className='p-1 w-[280px] text-center rounded-lg' value={email} type='email' placeholder='' />
        <div className='flex justify-center items-center gap-3'>
        <input onChange={()=>handleChange()} className='p-1 w-[280px] text-center rounded-lg' type='email' placeholder='Enter your UPI Id' name='upiid'/>
<button onClick={()=>handleSubmit()} className='bg-red-500 p-2 text-white hover:bg-white hover:text-black'>verify</button>


        </div>
        {
          loading? <><SyncIcon/>
          <p className='text-green-500 font-mono text-xs'>verifying...</p>
          </> :finish && <>
          <TaskAltIcon/>
          <p className='text-green-500 font-mono font-bold text-xs'>verified</p>

          </>
        }
        
        {/* <button onClick={()=>navigate('/contact')} className='bg-fuchsia-400 hover:bg-black hover:text-white text-black font-semibold p-2 rounded-lg'><ArrowForwardIcon/>Procced</button> */}
        <Link  className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-90' to={`mailto:${email}?subject=Hi ${name} &body= MOVIE TICKET CONFIRMED `}>Procced</Link>
<button className='' onClick={()=>navigate('/userprofile')}><ArrowForwardIcon/>Bookings</button>
       </div>
    </div>

    <div>
    <div className='flex border-2 shadow-2xl shadow-slate-60 p-3 flex-col gap-4 justify-center items-center'>

<p className='text-[12px] font-semibold'>Step1:<span className='font-normal text-[10px]'>Open the respective UPI Id platform and confirm the payment</span></p>
<p className='text-[12px] font-semibold'>Step2:<span className='font-normal text-[10px]'>A new Tab will appear simply click on send</span></p>

</div>

    </div>

    </div>
  )
}

export default Payments

// import React, { useState } from 'react'
// import { addMovie } from '../api/apis'
// import { Link } from 'react-router-dom'
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import { ToastContainer, toast } from 'react-toastify';



// function Add() {

//   const [inputs,setInputs]=useState({
//     title:"",
//     releaseDate:"",
//     description:"",
//    featured:false,
//    posterUrl:"",
  


//   })

//   const [actors,setActors]=useState([" "])
//   const [actor,setActor]=useState(" ")
//   const [message,setMessage]=useState()
//   const [message1,setMessage1]=useState()

//   const [InputValue,setInputValue]=useState("");

//   const handleSubmit=(e)=>{
//     e.preventDefault();
//     addMovie({...inputs,actors:actors}).then((res)=>{
//       toast.success(`Movie Added Succesfully...`, { position: 'top-center' });



//     }).catch((err)=>
//     toast.error(` Failure In Movie Adding...`, { position: 'top-center' }));

//   }

//   const handleChange=(e)=>{
//     setInputs((prevState)=>({...prevState,[e.target.name]:e.target.value}))
//   }





//   return (
//     <div className='flex justify-center flex-col items-center mt-[20px]'>
//         <form className='flex justify-center flex-col gap-2  items-center' >
//             <div className='flex justify-center flex-col gap-2  items-center' >
//                 <label className='sm:text-xs  text-[15px] font-serif font-semibold'>Title:</label>
//                 <input className='rounded-lg p-1 font-serif text-center border-blue-900 border-2 shadow-xl shadow-slate-600' type='text' onChange={handleChange} value={inputs.title} placeholder='title' name='title'/>

//             </div>
//             <div className='flex justify-center flex-col gap-2  items-center' >
//                 <label className='sm:text-xs  text-[15px] font-serif font-semibold'>Description:</label>
//                 <textarea className='rounded-lg p-1 font-serif text-center border-blue-900 border-2 shadow-xl shadow-slate-600' type='text' onChange={handleChange} value={inputs.description} placeholder='Description' name='description'/>

//             </div>

//             <div className='flex justify-center flex-col gap-2  items-center' >
//                 <label className='sm:text-xs  text-[15px] font-serif font-semibold'>Release-Date:</label>
//                 <input className='rounded-lg p-1 font-serif text-center border-blue-900 border-2 shadow-xl shadow-slate-600' type='date' onChange={handleChange} value={inputs.releaseDate} placeholder='releaseDate' name='releaseDate'/>

//             </div>

//             <div className='flex justify-center flex-col gap-2  items-center' >
//                 <label className='sm:text-xs  text-[15px] font-serif font-semibold'>Image:</label>
//                 <input className='rounded-lg p-1 font-serif text-center border-blue-900 border-2 shadow-xl shadow-slate-600' type='text' onChange={handleChange} value={inputs.posterUrl} placeholder='' name='posterUrl'/>


//             </div>

//             <div className='flex justify-center gap-2  items-center' >
//                 <label className='sm:text-xs  text-[15px] font-serif font-semibold'>featured:</label>
//                 <input className='rounded-lg p-2 font-serif text-center border-blue-900 border-2 shadow-xl shadow-slate-600' type='checkbox' onChange={(e)=>{
//                   setInputs((prevState)=>({...prevState,featured:e.target.checked}))
//                 }} value={inputs.featured} placeholder='' name='featured'/>

//             </div>

//             <div className='flex justify-center  gap-2  items-center' >
//                 <label className='sm:text-xs  text-[15px] font-serif font-semibold'>Actors:</label>
//                 <input className='rounded-lg p-1 font-serif text-center border-blue-900 border-2 shadow-xl shadow-slate-600' type='text'  onChange={(e)=>{
//                   setActor(e.target.value)
                  
                  
                  
                               
//                 }}
//                 value={actor}
//                  placeholder='' name='actors'/>

//                  <button className='bg-blue-700 p-2 rounded-md text-white font-serif' onClick={(e)=>{
//                   e.preventDefault()
//                    setActors([...actors,actor]) 
//                    setActor("")
                   
//                    toast.info(` Actor added...`, { position: 'top-center' });
                   
//                  }}>Add</button>

//             </div>
//             {
//                                     message && (<>
//                                     <p className='text-center mb-[10px] text-blue-50 shadow-black shadow-xl text-xl'>{message}</p>
                           
//                                     </>)
//                                 }

//             <button className= ' hover:bg-white hover:text-black bg-black p-3 rounded-lg text-white  font-semibold' type='submit' onClick={handleSubmit}>Add Movie</button>




//         </form>
//         {
//                                     message1 && (<>
//                                     <p className='text-center text-blue-50 shadow-black shadow-xl text-xl'>{message1}</p>
//                                     <Link to={'/adminprofile'}><ArrowForwardIcon/>Your Movies</Link>
//                                     </>)
//                                 }
      
//     </div>
//   )
// }

// export default Add


import React, { useState } from 'react'
import { addMovie } from '../api/apis'
import { Link } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from "axios";
 import { ToastContainer, toast } from 'react-toastify';


function Add() {

  const [inputs,setInputs]=useState({
    title:"",
    releaseDate:"",
    description:"",
   featured:false,
   image:undefined,
   video:undefined,


  })


  const [actors,setActors]=useState([])
  const [actor,setActor]=useState(" ")
  const [message,setMessage]=useState()
  const [message1,setMessage1]=useState()

  const handleSubmit=async(e)=>{
    e.preventDefault();
    // addMovie({...inputs,actors}).then((res)=>console.log(res)).catch((err)=>console.log(err))
    const data={...inputs,actors};
    const formData = new FormData();
    formData.append('video', data.video);
    formData.append('image', data.image);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('actors', data.actors);
    formData.append('featured',data.featured);
    formData.append('releaseDate',data.releaseDate)
    formData.append('admin',localStorage.getItem("AdminId"))
    for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      try {
        const res = await axios.post(
                  `/movie`,
                  formData,
                  {
                      headers: {
                          authorization: `Bearer ${localStorage.getItem("token")}`, 
                          'Content-Type': 'multipart/form-data',
                      },
                  }
              );
        // addMovie(data).then(()=>{

          toast.success(` Movie Added...`, { position: 'top-center' });

        // }).catch((err)=>{
        //      toast.error(` ${err.message}`, { position: 'top-center' });


        // })

      }
      catch(err){
        toast.error(` ${err.message}`, { position: 'top-center' });

      }
    //     
    //     toast.success(` Movie Added...`, { position: 'top-center' });
    //     // Log response data
    // } catch (err) {
    //     if (err.response) {
    //       toast.warning(`${err}`, { position: 'top-center' });
    //     }
        //  else {
        //   toast.error(` ${err.message}`, { position: 'top-center' });
        // }
    // }
    
    // console.log(res)
    // if(res.status!==200)
    //     {
    //         return console.log("unexpected error in adding movie")
    //     }
        // const resData=await res.data;
        // console.log(resData)
        // return resData;




  // }
}

            const handleChange=(e)=>{
              setInputs((prevState)=>({...prevState,[e.target.name]:e.target.value}))
            }




  


  return (
    <div className='flex mt-[60px] justify-center flex-col items-center'>
        <form className='flex justify-center flex-col gap-2  items-center' >
            <div className='flex justify-center flex-col gap-2  items-center' >
                <label className='sm:text-xs  text-[15px] font-serif font-semibold'>Title:</label>
                <input className='rounded-lg p-1 font-serif text-center border-blue-900 border-2 shadow-xl shadow-slate-600' type='text' onChange={handleChange} value={inputs.title} placeholder='title' name='title'/>

            </div>
            <div className='flex justify-center flex-col gap-2  items-center' >
                <label className='sm:text-xs  text-[15px] font-serif font-semibold'>Description:</label>
                <textarea className='rounded-lg p-1 font-serif text-center border-blue-900 border-2 shadow-xl shadow-slate-600' type='text' onChange={handleChange} value={inputs.description} placeholder='Description' name='description'/>

            </div>

            <div className='flex justify-center flex-col gap-2  items-center' >
                <label className='sm:text-xs  text-[15px] font-serif font-semibold'>Release-Date:</label>
                <input className='rounded-lg p-1 font-serif text-center border-blue-900 border-2 shadow-xl shadow-slate-600' type='date' onChange={handleChange} value={inputs.releaseDate} placeholder='releaseDate' name='releaseDate'/>

            </div>

            <div className='flex justify-center flex-col gap-2  items-center' >
                <label className='sm:text-xs  text-[15px] font-serif font-semibold'>Image:</label>
                <input className='rounded-lg p-1 font-serif text-center border-blue-900 border-2 shadow-xl shadow-slate-600' type='file' onChange={(e) => inputs.image=e.target.files[0]}  placeholder='' name='image'/>


            </div>
            <div className='flex justify-center flex-col gap-2  items-center' >
                <label className='sm:text-xs  text-[15px] font-serif font-semibold'>Video</label>
                <input className='rounded-lg p-1 font-serif text-center border-blue-900 border-2 shadow-xl shadow-slate-600' type='file' onChange={(e) => inputs.video=e.target.files[0]}  placeholder='' name='video'/>


            </div>

            <div className='flex justify-center gap-2  items-center' >
                <label className='sm:text-xs  text-[15px] font-serif font-semibold'>featured:</label>
                <input className='rounded-lg p-2 font-serif text-center border-blue-900 border-2 shadow-xl shadow-slate-600' type='checkbox' onChange={(e)=>{
                  setInputs((prevState)=>({...prevState,featured:e.target.checked}))
                }} value={inputs.featured} placeholder='' name='featured'/>

            </div>

            <div className='flex justify-center  gap-2  items-center' >
                <label className='sm:text-xs  text-[15px] font-serif font-semibold'>Actors:</label>
                <input className='rounded-lg p-1 font-serif text-center border-blue-900 border-2 shadow-xl shadow-slate-600' type='text'  onChange={(e)=>{
                  setActor(e.target.value)
                               
                }}
                value={actor}
                 placeholder='' name='actors'/>

                 <button className='bg-blue-700 p-2 rounded-md text-white font-serif' onClick={(e)=>{
                  e.preventDefault()
                  setActors([...actors,actor]) 
                  setActor("")
                                     
                   toast.info(` Actor added...`, { position: 'top-center' });
                                     
                 }}>Add</button>

            </div>
            {
                                    message && (<>
                                    {/* <p className='text-center mb-[10px] text-blue-50 shadow-black shadow-xl text-xl'>{message}</p> */}
                           
                                    </>)
                                }

            <button className= ' hover:bg-white hover:text-black bg-black p-3 rounded-lg text-white  font-semibold' type='submit' onClick={handleSubmit}>Add Movie</button>




        </form>
        {
                                    message1 && (<>
                                    {/* <p className='text-center text-blue-50 shadow-black shadow-xl text-xl'>{message1}</p> */}
                                    <Link to={'/adminprofile'}><ArrowForwardIcon/>Your Movies</Link>
                                    </>)
                                }
      
    </div>
  )
}

export default Add
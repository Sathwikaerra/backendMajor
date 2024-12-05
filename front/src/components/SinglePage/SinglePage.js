import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMovie } from '../api/apis';
import { toast } from 'react-toastify';

function SinglePage() {
    const navigate=useNavigate()

    const id=useParams().id;
    const[movie,setMovie]=useState();
    useEffect(()=>{

        getMovie(id).then((res)=>{
            setMovie(res.movie);

        }).catch((err)=>{
        })




    },[])

  return (
    <div className='flex mt-[50px] justify-center items-center'>
       {
        movie && (
            <div className='flex justify-center gap-4 items-center '>
                <div className='flex justify-center items-center'>
                <img className='w-[300px] ' src={movie.posterUrl}/>

                </div>
                <div className='flex justify-center flex-col gap-2 items-center m-[5px]'>
                <p className='font-mono bg-white rounded-md font-semibold '>Title:<span className='font-normal'>{movie.title}</span></p>
                <p className='font-mono bg-white rounded-md   font-semibold '>Description:<span className='font-normal'>{movie.description}</span></p>
                <p className='font-mono bg-white rounded-md  font-semibold '>Actors:<span className='font-normal'>{movie.actors.map((i)=>{
                    return(
                        <span className='text-amber-950' >{i}</span>
                    )
                })}</span></p>
                <p className='font-mono font-semibold bg-white rounded-md  '>Release On:<span className='font-normal'>{new Date(`${movie.releaseDate}`).toDateString()}</span></p>
                <p  onClick={()=>navigate('/auth')} className='   mt-[20px] font-mono font-semibold p-2 bg-green-400 text-[10px]  sm:text-[20px] text-white cursor-pointer rounded-lg '>Login to book your Ticket</p>

                </div>
                
            </div>
        )
       }

      
    </div>
  )
}

export default SinglePage

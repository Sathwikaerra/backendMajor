import React, { useEffect, useState } from 'react'
import { getAllMovies } from './api/apis'
import MovieItem from './movieitem'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { duration } from '@mui/material';
import { useSelector } from 'react-redux';
// import './Homepage.css'





const Homepage =() => {

  const {currentUser}=useSelector((state)=>state.user);

  const settings = {
    // dots: true,
    Infinity:true,
 speed: 300, // Faster slide animation (300ms)
    duration:1 ,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
     // Enable left and right arrows for navigation

    
    
  };


  const [movies,setMovies]=useState([])
     const [photos,setPhotos]=useState([])

     movies&&  movies.map((item)=>{
      photos.push(item.posterUrl);

     })



  

  useEffect(()=>{
    getAllMovies().then((data)=>{
      
      setMovies(data.movies)}).catch(err=>console.log(err))

  },[])
//  console.log(movies)
 
 
  return (
    <div className='imageContainer '>
      
<Slider {...settings}>
       {  movies.map((item, index) => (

        <div  className=' ' key={index}>
          <img className='w-fit h-[400px] m-auto'  src={`http://localhost:3000${item.imgUrl}`} alt={`Slide ${index + 1}`}  />
        
        </div>
       
        
      ))}
      
    </Slider>

    <div className='flex justify-center items-center gap-11 flex-col'>
      <h1 className=' font-bold text-[20px] sm:text-[35px] '>movies to be Released Soon</h1>

      <div className='grid grid-cols-3 sm:flex sm:gap-4 sm:justify-center  sm:items-center sm:flex-wrap'>

      {
         movies && movies.map((i,index)=>{
        return <MovieItem  key={index} id={i._id} title={i.title}   posterUrl={i.imgUrl} releaseDate={i.releaseDate}  />
        

        })
      }
            </div>



    </div>


    </div>
   
  )
  
}

export default Homepage

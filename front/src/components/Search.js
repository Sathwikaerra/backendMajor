import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieItem from "./movieitem";

const Search = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get("query");
  const [searchResults, setSearchResults] = useState([]);
  console.log(query)
  useEffect(() => {
    const fetchVideos = async () => {
        try {
            const response = await fetch(`/movie/api/search?query=${query}`);
            const data = await response.json();
            setSearchResults(data); // Update search results in state
            console.log(data);
          } catch (error) {
            console.error("Error fetching search results:", error);
          }
    };
    fetchVideos();
  }, [query]);

  return <div>
     <div className='flex justify-center items-center gap-11 flex-col'>
      <h1 className=' font-bold text-[20px] sm:text-[35px] '>search movies</h1>
      <div className='grid grid-cols-3 sm:flex sm:gap-4 sm:justify-center  sm:items-center sm:flex-wrap'>

      {
        searchResults.length>0 && searchResults.map((i,index)=>{
            return <MovieItem  key={index} id={i._id} title={i.title}  posterUrl={i.imgUrl} releaseDate={i.releaseDate}  />
            })
    }
            </div>



    </div>
  </div>
};

export default Search;
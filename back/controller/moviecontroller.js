
import jwt from 'jsonwebtoken'
import Movie from '../models/moviemodel.js'
import Admin from '../models/adminmodel.js'
import mongoose from 'mongoose';
export const addMovie=async(req,res,next)=>{


    const extractedtoken=req.headers.authorization.split(" ")[1];
    // return res.status(400).json({extractedtoken});

     //bearer token
if(!extractedtoken)
    {
        return res.status(400).json({message:"token not found"});
    }

    let adminId;
    
    //verify

    jwt.verify(extractedtoken,process.env.SECRET_KEY,(err,decrypted)=>{
        if(err)
            {
                return res.status(400).json({message:`${err.message}`});

            }
            else{
                adminId=decrypted.id
                return;
            }


    })

    const {title,description,featured,actors,posterUrl,releaseDate} =req.body;

    if(!title &&!actors && !description && !releaseDate && !featured && !posterUrl)
        {
           return res.status(400).json({message:"invalid inputs"})
        }

        let movie;

        try {
            movie=new Movie({title,
                description,
                featured,
                posterUrl,
                actors,
                releaseDate:new Date(`${releaseDate}`),
                admin:adminId})
           const session=await mongoose.startSession();
           const adminUser=await Admin.findById(adminId)
           session.startTransaction();
           await movie.save({session});
           adminUser.addMovies.push(movie);
           await adminUser.save({session});

           await session.commitTransaction();





            
        } catch (error) {

            return console.log(error)
            
        }
    
        if(!movie)
            {
                return res.status(400).json({message:"request failed"});
            }

            return res.status(200).json({movie})

}


export const getMovies=async(req,res,next)=>{
    let movies;

    try {
        movies=await Movie.find();
    } catch (error) {
        return console.log(error)
        
    }
    if(!movies){
        return res.status(400).json({message:"request failed"})
    }
    return res.status(200).json({movies})
}

export const getMoviebySearch=async (req, res) => {
    try {
      const  {query} = req.query; // Get search query from request
      console.log(query);
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
  
      // Perform case-insensitive search using regular expressions
      const movies = await Movie.find({
        $or: [
          { title: { $regex: `^${query}`, $options: "i" } }, // Title starts with query
          { actors: { $regex: `^${query}`, $options: "i" } }, // Actor name starts with query
        ],
      });
      return res.status(200).json(movies)
    }
    catch(error){
        return res.status(500).json({message:"Internal server error"})
    }
}
    
export const getMoviebyId=async(req,res,next)=>{
     const id=req.params.id;

     let movie;

     try {
        movie=await Movie.findById(id)
     } catch (error) {
        return console.log(error)
        
     }

     if(!movie)
        {
            return res.status(400).json({message:"no movie found"});
        }

        return res.status(200).json({movie})
}




export const deleteMovie=async(req,res,next)=>{
    const id=req.params.id;

    let movie;

    try {
       movie=await Movie.findByIdAndDelete(id)
    } catch (error) {
       return console.log(error)
       
    }

    if(!movie)
       {
           return res.status(400).json({message:"no movie found"});
       }

       return res.status(200).json({message:"Movie deleted successfully"})
}





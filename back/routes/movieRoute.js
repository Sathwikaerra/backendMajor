import express from "express";
import multer from "multer";
import { addMovie,getMoviebyId,getMovies,deleteMovie ,getMoviebySearch} from "../controller/moviecontroller.js";
import Movie from '../models/moviemodel.js'
import Admin from "../models/adminmodel.js";
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";
import Timing from "../models/timingmodel.js"
import moment from 'moment'

const movieRouter=express.Router();

// movieRouter.post('/',addMovie)
movieRouter.get('/allmovies',getMovies)
movieRouter.get('/:id',getMoviebyId)
movieRouter.delete('/:id',deleteMovie);
movieRouter.get('/api/search',getMoviebySearch)
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/'); // Set your upload directory
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname); // Ensure unique filenames
        },
    }),
});

// Install `moment` for easier date handling

movieRouter.post('/', upload.fields([{ name: 'video', maxCount: 1 }, { name: 'image', maxCount: 1 }]), async (req, res) => {
    const extractedToken = req.headers.authorization?.split(" ")[1];
    if (!extractedToken) {
        return res.status(400).json({ message: "Token not found" });
    }

    let adminId;
    try {
        const decrypted = jwt.verify(extractedToken, process.env.SECRET_KEY);
        adminId = decrypted.id;
    } catch (err) {
        return res.status(400).json({ message: `Token verification failed: ${err.message}` });
    }

    const { title, description, featured, actors, releaseDate, admin } = req.body;
    if (!title || !actors || !description || !releaseDate) {
        return res.status(400).json({ message: "Invalid inputs" });
    }

    const videoFile = req.files?.video?.[0];
    const imgFile = req.files?.image?.[0];
    if (!videoFile || !imgFile) {
        return res.status(400).json({ message: "Video and image files are required." });
    }

    const adminUser = await Admin.findById(admin);
    if (!adminUser) return res.status(404).json({ message: "Admin user not found" });

    let movie;

    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        // Create movie
        movie = new Movie({
            title,
            description,
            featured,
            actors,
            imgUrl: `/${imgFile.path}`,
            videoUrl: `/${videoFile.path}`,
            releaseDate: new Date(releaseDate),
            admin,
        });

        await movie.save({ session });
        adminUser.addMovies.push(movie);
        await adminUser.save({ session });

        // Generate calendar of timings
        const timings = ["9am", "1pm", "6pm"];
        const daysToGenerate = 30; // Number of days to create schedule for
        const startDate = moment(); // Start from today

        for (let i = 0; i < daysToGenerate; i++) {
            const currentDate = startDate.clone().add(i, 'days').startOf('day');
            for (let time of timings) {
                await Timing.create({
                    movieId: movie._id,
                    timing: `${currentDate.format("YYYY-MM-DD")} ${time}`,
                    availableSeats: 100,
                });
            }
        }

        await session.commitTransaction();
        session.endSession();
    } catch (err) {
        console.error(err.stack);
        return res.status(500).json({ message: "Server error while saving movie", error: err.message });
    }

    if (!movie) return res.status(400).json({ message: "Request failed" });
    return res.status(200).json({ movie });
});



 
// movieRouter.post('/', upload.fields([{ name: 'video', maxCount: 1 },{ name: 'image', maxCount: 1 },

// ]),async (req, res) => {
//     const extractedToken = req.headers.authorization?.split(" ")[1]; // Optional chaining to avoid crashes
//     if (!extractedToken) {
//         return res.status(400).json({ message: "Token not found" });
//     }
    

//     let adminId;
//     try {
//         // Verify token
     

//         const decrypted = jwt.verify(extractedToken,process.env.SECRET_KEY);
//         adminId = decrypted.id;
//     } catch (err) {
//         return res.status(400).json({ message: `Token veri1234fication failed: ${err.message}` });
//     }
   
//     // Validate inputs
//     const { title, description, featured, actors, releaseDate ,admin} = req.body;
//     if (!title || !actors || !description || !releaseDate ) {
//         return res.status(400).json({ message: "Invalid inputs" });
//     }

//     // Validate file uploads

//     const videoFile = req.files.video && req.files.video[0];
//     const imgFile = req.files.image && req.files.image[0];
//     if (!videoFile || !imgFile) {
//         return res.status(400).json({ message: "Video and image files are required." });
//     }

//     let movie;
    

//     try {
//         // Create new movie
//         movie = new Movie({
//             title,
//             description,
//             featured,
//             actors,
//             imgUrl: `/${imgFile.path}`, // Ensure `path` exists in uploaded file objects
//             videoUrl: `/${videoFile.path}`,
//             releaseDate: new Date(releaseDate),
//             admin,
//         });

        

//         // Handle MongoDB transaction
//         const session = await mongoose.startSession();
//         session.startTransaction();

//         const adminUser = await Admin.findById(admin);
//         if (!adminUser) {
//             await session.abortTransaction();
//             session.endSession();
//             return res.status(404).json({ message: "Admin user not found" });
//         }

//         await movie.save({ session });
//         adminUser.addMovies.push(movie); // Assuming `addMovies` is an array in Admin schema
//         await adminUser.save({ session });

//         await session.commitTransaction();
//         session.endSession();
//         const timings = ["9am", "1pm", "6pm"];
//         for (let time of timings) {
//             await Timing.create({
//                 movieId: movie._id,
//                 timing: time,
//                 availableSeats: 100,
//             });
//         }
       
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Server error while saving movie", error: error.message });
//     }

//     // Final check before response
//     if (!movie) {
//         return res.status(400).json({ message: "Request failed" });
//     }

//     return res.status(200).json({ movie });
// });

export default movieRouter; 
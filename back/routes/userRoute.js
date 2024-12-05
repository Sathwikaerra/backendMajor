import express from "express";
import { Login, deleteUser,userName,getUserId, getAllusers, getBookingsofUser, signUp, updateUser, googleAuth, addSeats, getUserHistory,deleteUserBookings } from "../controller/userController.js";
import multer from "multer";

const userRouter=express.Router();

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

userRouter.get("/allusers",getAllusers)
userRouter.post('/addseats',addSeats)
userRouter.post("/signup",upload.fields([{ name: 'image', maxCount: 1 }]),signUp)
userRouter.post("/google",googleAuth)
userRouter.put("/:userId",updateUser)
userRouter.get("/name/:id",userName)
userRouter.get("/history/:id",getUserHistory)
userRouter.delete("/:id",deleteUser)
userRouter.post("/login",Login)
userRouter.post("/google",googleAuth)

userRouter.get("/userid/:id",getUserId)
userRouter.delete('/delete/:userId/:BookingIndex',deleteUserBookings)


userRouter.get('/bookings/:id',getBookingsofUser)


export default userRouter; 
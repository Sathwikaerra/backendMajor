import express from "express";
import { getBookingById,deleteBooking, getallBookings,newBooking } from "../controller/bookingController.js";
const bookingRouter=express.Router();

bookingRouter.post('/newbooking',newBooking)
bookingRouter.get('/:id',getBookingById)
bookingRouter.get('/',getallBookings)
bookingRouter.delete('/:id',deleteBooking)

export default bookingRouter; 
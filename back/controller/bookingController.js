import mongoose from 'mongoose';
import Booking from '../models/bookingmodel.js'
import Movie from '../models/moviemodel.js'
import User from '../models/usermodel.js'
export const deleteBooking=async(req,res,next)=>{
   const id=req.params.id;
   let user,movie,x;

   try {
      x=await Booking.findById(id);
      
      
   } catch (error) {
      return console.log(error)
      
   }
   if(!x)
      {
         return res.status(400).json({message:"no booking found"})
      }

      user=x.user;
      movie=x.movie;

   let booking;
   let xuser,xmovie;
   try {
      xuser=await User.findById(user);
      xmovie=await Movie.findById(movie)


      
   } catch (error) {
      return console.log(error)
      
   }




   try {

      booking=await Booking.findByIdAndDelete(id)
      

      const session=await mongoose.startSession();

      session.startTransaction();
      await xuser.bookings.pull(booking);
      await xmovie.bookings.pull(booking);
      await xuser.save({session});     
       await xmovie.save({session});

       session.commitTransaction();



      
   } catch (error) {
      return console.log(error)
      
   }
}


export const getallBookings=async(req,res,next)=>{
   let bookings;


   try {
      bookings=await Booking.find({}).populate({path:"movie",model:"Movie"})
   } catch (error) {
       return console.log(error)
       
   }
   if(!bookings){
       return res.status(400).json({message:"request failed"})
   }
   return res.status(200).json({bookings})
}


export const getBookingById=async(req,res,next)=>{

   const id=req.params.id;
   


   let booking;

   try {
      booking=await Booking.findById(id)
      
   } catch (error) {
      return console.log(error)
      
   }

   if(!booking)
      {
         return res.status(400).json({message:"unexpected error"})
      }
      return res.status(400).json({booking})

}


export const newBooking =async(req,res,next)=>{
     const {movie,date,user,seatnumber}=req.body;

     let existingmovie;
     let existinguser;
     
     try {
       
        existingmovie=await Movie.findById(movie)
        existinguser=await User.findById(user)

     } catch (error) {
        return console.log("error")
     }

     if(!existingmovie)
        {
            return res.status(404).json({message:"Movie not found with given ID"})
        }
        if(!existinguser)
         {
            return res.status(400).json({message:"user not found with ID"})
         }

     let booking;
     try {
        booking= new Booking({
            movie,date:new Date(`${date}`),
            seatnumber,user
        })

        const session=await mongoose.startSession();
        session.startTransaction();
        existingmovie.bookings.push(booking)
        existinguser.bookings.push(booking)
        await existinguser.save({session});
        await existingmovie.save({session});

        await booking.save();
        session.commitTransaction()

     } catch (error) {
        console.log(error)
        
     }

     if(!booking)
        {
            res.status(400).json({message:"unable to create booking"});

        }
        res.status(200).json({message:"ticked booked",booking});


}




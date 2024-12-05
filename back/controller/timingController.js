import mongoose from 'mongoose';
import Timing from "../models/timingmodel.js";

export const getTimingMovie=async(req,res)=>{
    try {
        const movieId=req.params.movieId
        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            return res.status(400).send({ message: "Invalid movie ID" });
        }
        const timings = await Timing.find({ movieId });
       return  res.status(200).json({timings});
    } catch (error) {
        return res.status(500).json({ msg:"fuck you" });
    }
}


export const getTimingOfOneMovie=async(req,res)=>{
    try {
        const movieId=req.params.movieId
        const timeId=req.params.timeId;
        // const time=req.params.time;
        // const date=req.params.date;
        // const dateandtime=combineDateAndTime(date,time)

        // const combineDateAndTime = (date, time) => {
        //     return `${date} ${time}`;
        // };
        // if (!mongoose.Types.ObjectId.isValid(movieId)) {
        //     return res.status(400).send({ message: "Invalid movie ID" });
        // }
        const timings = await Timing.findOne({ movieId,_id:timeId });
       return  res.status(200).json({id:timings._id,bookedSeats:timings.bookedSeats,availableSeats:timings.availableSeats});
    } catch (error) {
        return res.status(500).json({ msg:error });
    }
}

export const bookTimingMovie=async(req,res)=>{
    const { timingId, userId, seats } = req.body;

    try {
        const timing = await Timing.findById(timingId);

        const unavailableSeats = seats.filter((seat) => timing.bookedSeats.includes(seat));
        if (unavailableSeats.length > 0) {
            return res.status(400).json({ message: `Seats ${unavailableSeats.join(", ")} are already booked!` });
        }

        timing.bookedSeats.push(...seats);
        timing.availableSeats -= seats.length;
        timing.userBookings.push({ userId, seats });
        await timing.save();

        res.json({ message: "Booking successful", timing,bookedSeats:timing.bookedSeats });
    } catch (error) {
        res.status(500).json({ msg:"error in booking movie seats" });
    }
}
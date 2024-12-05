import mongoose from "mongoose"

const Schema=mongoose.Schema;

const bookingSchema=new Schema({
    movie:{
        type:mongoose.Types.ObjectId,
        ref:"movie",
        required:true,
    },
    date:{
        type:Date,
        required:true,
       

    },

    seatnumber:[{
        type:Number,
        required:true,
    }],
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true,
    },
  
})

export default mongoose.model("Booking",bookingSchema);
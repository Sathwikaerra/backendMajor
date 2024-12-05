import mongoose from "mongoose"


const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        unique:true,
        

    },
    imgUrl: {
        type: String,
      },
      bookings: [
        {
            movieId: { type: mongoose.Schema.Types.ObjectId, ref:'Movie' },// Reference to the show/movie
            seatNumbers: [Number], // Array of seat numbers
            bookingDate: { type: Date, default: Date.now },
            movieDate:String,
            movieTime:String,
            movieCost:Number,
            food:[String] // Optional: When the booking was made
        }
    ]
})

export default mongoose.model("User",userSchema);
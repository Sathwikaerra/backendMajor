import mongoose from "mongoose"

const Schema=mongoose.Schema;

const ticketSchema=new Schema({
    seatnumber:[{
        type:Number,
        required:true,
        unique:true,
        
    }],
    email:{
        type:String,
        required:true,
       

    },
    date:{
        type:Date,
        required:true,

    }
    
   
})

export default mongoose.model("TCounter",ticketSchema);
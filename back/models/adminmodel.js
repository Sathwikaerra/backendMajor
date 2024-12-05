import mongoose from "mongoose"

const Schema=mongoose.Schema;

const adminSchema=new Schema({

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
        required:true,
        unique:true,
        

    },
    addMovies:[{
        type:mongoose.Types.ObjectId,
        ref:"movie",
    }]
})

export default mongoose.model("Admin",adminSchema);
import mongoose from "mongoose"

const Schema=mongoose.Schema;

const movieSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
       

    },

    releaseDate:{
        type:Date,
        required:true,
    },
    imgUrl: {
        type: String,
      },
      videoUrl:{
        type: String,
      },
      views: {
        type: Number,
        default: 0,
      },
      likes: {
        type: [String],
        default: [],
      },
    featured:{
        type:Boolean,
    },
    bookings:[{ type:mongoose.Types.ObjectId,
        ref:"booking"
    }],
actors:[{type:String,required:true}],
    admin:{
        type:mongoose.Types.ObjectId,
        ref:"admin",
        required:true
    }
})

export default mongoose.model("Movie",movieSchema);
import User from '../models/usermodel.js'
import Booking from '../models/bookingmodel.js'
import dotenv from "dotenv"

import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import Movie from '../models/moviemodel.js';

export const addSeats=async(req,res) => {
    const { userId, seats,movieId,date,cost,time,food} = req.body; // Seats is an array of strings

    if (!userId || !Array.isArray(seats) || !cost || !time || !date) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    try {

        const newBooking = {
            movieId: movieId,
            seatNumbers: seats,
            movieTime:time,
            movieCost:cost,
            movieDate:date,
            food:food,

        };

        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { bookings: newBooking } },
            { new: true } // Return the updated user
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Seats added successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error adding seats', error });
    }
};







    export const googleAuth = async (req, res, next) => {
        try {
          const user = await User.findOne({ email: req.body.email });
          console.log(user)
          if (user) {
            console.log("1")
            const token = jwt.sign({ id: user._id },process.env.SECRET_KEY);
            res
              .cookie("access_token", token, {
                httpOnly: true,
              })
              .status(200)
              .json(user._doc)
          } else {
            console.log("2");
            const generatedPassword = crypto.randomBytes(8).toString("hex"); // Example: "abc123xyz"

            const password = await bcrypt.hash(generatedPassword, 10);
            const newUser = new User({
              ...req.body,
              password,
    
              fromGoogle: true,
            });
            const savedUser = await newUser.save();
            const token = jwt.sign({ id: savedUser._id },process.env.SECRET_KEY);
            res
              .cookie("access_token", token, {
                httpOnly: true,
              })
              .status(200)
              .json(savedUser._doc);
          }
        } catch (err) {
          next(err);
        }
      };
    
    // const { email, name } = req.body;

    // if (!email || !name) {
    //     return res.status(400).json({ success: false, message: "Email and name are required" });
    // }

    // try {
    //     // Check if the user already exists in the database
    //     let user = await User.findOne({ email });

    //     if (!user) {
    //         // Generate a random password for new users
    //         const generatedPassword = crypto.randomBytes(8).toString("hex"); // Example: "abc123xyz"

    //         // Hash the password before saving
    //         const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    //         // Create a new user account
    //         user = new User({
    //             email,
    //             name,
    //             password: hashedPassword, // Store hashed password
    //         });

    //         await user.save(); // Save the new user in the database

    //         return res.status(201).json({
    //             success: true,
    //             message: "Account created successfully! Your password has been emailed.",
    //             password: generatedPassword, // Optionally, send this to the user
    //             user,
    //         });
    //     }

    //     // If user exists, log them in directly
    //     return res.status(200).json({ success: true, message: "Login successful!", user });
    // } catch (error) {
    //     console.error("Error during Google Authentication:", error.message);
    //     return res.status(500).json({ success: false, message: "Server error" });
    // }


export const Glogin=async(req,res,next)=>{
    let {name,email}=req.body;
        if(!email )
        {   
        return res.status(500).json({message:"email not provided"})
        }

        let xuser;
        try {
        xuser= await User.findOne({email})  
        } catch (error) {
         return next(error)  
        }
                 if(!xuser)
                 {
                let newuser;
                let generatedPassword;
                let hashpassword;
                generatedPassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);//slice -8 antee last characters tostrinng ante numbers 0-9 lettres a-Z

                if(!name)
                name=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);//slice -8 antee last characters tostrinng ante numbers 0-9 lettres a-Z
                hashpassword = bcrypt.hashSync(generatedPassword);

        try {
            newuser= new User({
                name:name,
                email:email,
                password:hashpassword,
            });
           newuser= await newuser.save();
        } catch (error) {
            return next(error)
            
        }
    
        if(!newuser)
            {
               return res.status(500).json({message:"unexpected error "})
            }
    
           return  res.status(200).json({id:newuser._id,message:"created account succesfully"})
     
 }
 else{

    // const password=req.body.password;
    // const crctpass= bcrypt.compareSync(password,xuser.password);
    // if(!crctpass)
    //     {
    //        return   res.status(500).json({message:"pass incrct "})

    //     }
  return  res.status(200).json({id:xuser._id,message:"successfully logged in"})


 }


}



export const getBookingsofUser=async(req,res,next)=>{

    const id=req.params.id;
    console.log(id);
    let bookings;

    try {

        bookings=await Booking.find({user:id}).populate({path:"movie",model:"Movie"})

        
    } catch (error) {
        return console.log(error)
        
    }

    if(!bookings)
        {
            return res.status(400).json({message:"no booking by user"});

        }

        return res.status(200).json({bookings});




}

export  const getAllusers=async(req,res,next)=>{
    let users;

    try {
        users=await User.find();

        
    } catch (error) {
        return next(error)
        
    }

    if(!users)
        {
            return res.status(500).json({message : "unexpected error occured"})
        }

        return res.status(200).json({users})

}

export const signUp=async(req,res,next)=>{
const {name,email,password}=req.body;


if(!name && !email && !password)
    {
        return res.status(500).json({message:"invalid inputs"})
    }
    const imgFile = req.files.image && req.files.image[0];
    if (!imgFile) {
        return res.status(400).json({ message: "Video and image files are required." });
    }
    let newuser;
    let validEmail=await User.findOne({email})
    if(validEmail)
    {
        return res.status(400).json({message:"user already exists"})
    }
    const hashpassword= await bcrypt.hash(password,10);
    try {
        newuser= new User({
            name,
            email,
            password:hashpassword,
            imgUrl:`/${imgFile.path}`,
        })
       newuser= await newuser.save();
    } catch (error) {
        return next(error)
        
    }

    if(!newuser)
        {
           return res.status(500).json({message:"unexpected error "})
        }

       return  res.status(200).json(newuser);



}




export const updateUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    const userId = req.params.userId;
  
    // Validate inputs
    if (!name && !email && !password) {
      return res.status(400).json({ message: "Invalid inputs" });
    }
  
    try {
      
      const updateFields = {};
      if (name) updateFields.name = name;
      if (email) updateFields.email = email;
      if (password) {
        const hashpassword = await bcrypt.hash(password, 10);
        updateFields.password = hashpassword;
      }
  
    
      const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json({ message: "Successfully updated", user: updatedUser });
    } catch (error) {
      return next(error); 
    }
  };
    

export const deleteUser=async(req,res,next)=>{
 

    const id=req.params.id;
    
    
    
   
        let newuser;
     
        try {
            newuser= await User.findByIdAndDelete(id);
          
        } catch (error) {
            return next(error)
            
        }
    
        if(!newuser)
            {
                res.status(500).json({message:"something went wrong "})
            }
    
            res.status(200).json({message:"successfully deleted"})
    
    
    
    }


    
export const Login=async(req,res,next)=>{
    const {email,password}=req.body;

 
    
    
    
    if(!email && !password)
        {
            return res.status(500).json({message:"invalid inputs"})
        }
        let newuser;

       
        try {
            newuser= await User.findOne({email})
          
        } catch (error) {
            return next(error)
            
        }
      
        
    
        if(!newuser)
            {
               return  res.status(500).json({message:"user not found"})
            }
            const crctpass= bcrypt.compareSync(password,newuser.password);
            if(!crctpass)
                {
                   return   res.status(500).json({message:"pass incrct "})
   
                }
    
          return  res.status(200).json({newuser})
    
    
    
    }



    
export const userName=async(req,res,next)=>{


    const id=req.params.id;
    
    let newuser;
    
    
        try {
         newuser= await User.findById(id).populate({ path: 'movieId', strictPopulate: false })
              
          
        } catch (error) {
            return next(error)
            
        }
    
        if(!newuser)
            {
                res.status(500).json({message:"something went wrong "})
            }
    
            res.status(200).json({name:newuser.name,email:newuser.email,newuser})
    
    
    
    }

    export const getUserId=async(req,res,next)=>{
        const id=req.params.id;

         
    let newuser;
    
    
    try {
     newuser= await User.findById(id)
          
      
    } catch (error) {
        return next(error)
        
    }

    if(!newuser)
        {
            res.status(500).json({message:"something went wrong "})
        }

        res.status(200).json({newuser})
    }


       
export const getUserHistory=async(req,res,next)=>{


    const id=req.params.id;
    
    let newuser;
    
    
        try {
         newuser= await User.findById(id).populate({
            path: 'bookings.movieId',
            model: 'Movie',
            strictPopulate: false
        }).exec();
              
          
        } catch (error) {
            return next(error)
            
        }
    
        if(!newuser)
            {
                res.status(500).json({message:"something went wrong "})
            }
    
            res.status(200).json({bookings:newuser.bookings})
    
    
    
    }

    export const deleteUserBookings=async(req,res)=>{

        const userId=req.params.userId;
        const BookingIndex=parseInt(req.params.BookingIndex,10);
        // console.log(BookingIndex)

        try {
            
            let user=await User.findOne({_id:userId})

            if (user && user.bookings && user.bookings.length > BookingIndex) {
                const updatedBookings = [...user.bookings];
          
                updatedBookings.splice(BookingIndex, 1); 
          
                
                const result = await User.updateOne(
                  { _id: userId },
                  { $set: { bookings: updatedBookings } } 
                );
                return res.status(200).json({result});
          
              }
              else{


                return res.status(500).json({message:"bookings are empty",});


              }
        } catch (error) {
            return res.status(500).json({msg:error})
            
        }


    }

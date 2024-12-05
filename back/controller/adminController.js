import Admin from '../models/adminmodel.js'

import bcrypt from "bcryptjs"

import jwt from 'jsonwebtoken'


export const addAdmin=async(req,res,next)=>{
    const {name,email,password}=req.body;

    if(!email && !password && !name)
        {
            return res.status(500).json({message:"invalid inputs"})
        }
 
    
    
    

        let xadmin;
        try {
            xadmin= await Admin.findOne({email})
          
        } catch (error) {
            return next(error)
            
        }
      
        
    
        if(xadmin)
            {
               return  res.status(500).json({message:"admin already exits"})
            }
            
    let admin;
    const hashpassword=bcrypt.hashSync(password)

    try {
        admin= new Admin({name,email,password:hashpassword});
        admin=await admin.save()
        
    } catch (error) {

        return next(error)
        
    }

    if(!admin)
        {
            return res.status(500).json({message:"unable to store admin"});

        }
        return res.status(200).json({admin})
    
    }



    
export  const getAdminById=async(req,res,next)=>{
    const id=req.params.id;
    let admin;

    try {
        admin=await Admin.findById(id).populate({path:"addMovies",model:"Movie"});

        
    } catch (error) {
        return next(error)
        
    }

    if(!admin)
        {
            return res.status(500).json({message : "unexpected error occured"})
        }

        return res.status(200).json({admin})

}




export const adminLogin=async(req,res,next)=>{
    const {email,password}=req.body;

 
    
    
    
    if(!email && !password)
        {
            return res.status(500).json({message:"invalid inputs"})
        }
        let xadmin;

       
        try {
            xadmin= await Admin.findOne({email})
          
        } catch (error) {
            return next(error)
            
        }
      
        
    
        if(!xadmin)
            {
               return  res.status(500).json({message:"admin not found"})
            }
            const crctpass= bcrypt.compareSync(password,xadmin.password);
            if(!crctpass)
                {
                   return   res.status(500).json({message:"pass incrct "})
   
                }

                const token=jwt.sign({id:xadmin._id},process.env.SECRET_KEY,{
                    expiresIn:"7d",
                })
    
          return  res.status(200).json({email:xadmin.email,token,name:xadmin.name,id:xadmin._id})
    
    
    
    }

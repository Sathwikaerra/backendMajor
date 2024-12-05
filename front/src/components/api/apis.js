// import { ClickAwayListener } from "@mui/material";
import axios from "axios";

export  const getAllMovies=async()=>{

    const res=await axios.get("/movie/allmovies").catch(err=>console.log(err))

    if(res.status!==200)
        {
            return console.log("no data")
        }
        const data=await res.data;
        return data;
}


// export const sendUserGoogleRequest=async(data)=>{
//     const res= await axios.post(`/user/Glogin"}`,{
//          name:"",
//          email:data.email,
//          password:data.password,
//      }).catch((err)=>console.log(err))
 
//      if(res.status!==200 && res.status!==201)
//          {
//              return console.log("unexpected error ")
//          }
 
//          const resData=await res.data;
//          return resData;
//  }

export const getUserBookingsArray=async(userId,movieId,date,time,seats,cost,food)=>{

    console.log(seats)

    const res=await axios.post('/user/addseats',{
        movieId:movieId,
        date:date,
        time:time,
        seats:seats,
        userId:userId,
        cost:cost,
        food:food,
       

    }).catch((err)=>{
        return console.log("error in  addingg seats")
    })

    const data=await res.data;
    return data;

}


export const sendUserAuthRequest=async(inputs,signup)=>{
    if(signup)
    {
        console.log("insignup")
        const formData=new FormData()
        formData.append('name',inputs.name)
        formData.append('email',inputs.email)
        formData.append('password',inputs.password)
        formData.append('image',inputs.image)
        console.log("in posting")
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
          }
        const res= await axios.post(`/user/signup`,formData).catch((err)=>console.log(err))
    
        if(res.status!==200 && res.status!==201)
            {
                return console.log("unexpected error ")
            }
    
            const resData=await res.data;
            return resData;
    }
    else {
        console.log("inlogin")
   const res= await axios.post(`/user/login`,{
        email:inputs.email,
        password:inputs.password,
    }).catch((err)=>console.log(err))

    if(res.status!==200 && res.status!==201)
        {
            return console.log("unexpected error ")
        }

        const resData=await res.data;
        return resData;
    }
}

export const sendAdminAuthRequest=async(data,signup)=>{
    const res= await axios.post(`/admin/login`,{

         email:data.email,
         password:data.password,
     }).catch((err)=>console.log(err))
 
     if(res.status!==200 && res.status!==201)
         {
             return console.log("unexpected error ")
         }
 
         const resData=await res.data;
         return resData;
 }

 export const getMovieDetails=async(id)=>{
    const res=await axios.get(`/movie/${id}`).catch((err)=>console.log(err))

    if(res.status!==200)
        {
            return res.status(400).json({message:"movie not found"})

        }

        const data=await res.data;
        return data;
 }

 export const newBooking=async({bdate,seats,movie})=>{

    const res=await axios.post(`/booking/newbooking`,{
        movie:movie,
        date:bdate,
        seatnumber:seats,
        user:localStorage.getItem("userId")

    }).catch((err)=>console.log(err))

    if(res.status!==200)
        {
            return res.status(400).json({message:"error in booking the ticket"})
        }

        const resdata=await res.data;
        return resdata;


 }


 export const getUserBookings=async(id)=>{
    const res=await axios.get(`/user/bookings/${id}`).catch((err)=>console.log(err))

    if(res.status!==200)
        {
            return res.status(400).json({message:"no Booking on this user"});
        }

        const data=await res.data;
        return data;
 }

 export const getBookings=async()=>{
    // const id=localStorage.getItem("userId")
    const res=await axios.get(`/booking`).catch((err)=>console.log(err))

    if(res.status!==200)
        {
            return res.status(400).json({message:"no Booking on this user"});
        }

        const data=await res.data;
        return data;
 }

 export const getUserName=async(id)=>{
    // const id=localStorage.getItem("UserId");

    const res=await axios.get(`/user/name/${id}`).catch((err)=>{
        console.log(err)
    })

    if(res.status!==200)
        {
            return res.status(400).json({message:"no user"})
        }

        
    }
 

 export const getUserHistory=async(id)=>{
    const res=await axios.get(`/user/history/${id}`).catch((err)=>{
        console.log("eroor in history")
    })

    if(res.status==200)
    {
        const data=await res.data;
        return data;

    }
    return  console.log("error");


 }



 
 export const getMovieName=async({movieId})=>{


   
        const res=await axios.get(`/movie/${movieId}`).catch((err)=>{
            console.log(err)
        })

        if(res.status!==200)
            {
                return res.status(400).json({message:"no movie"})
            }
    
            const data=await res.data;
            return data;
           

    


  

   

   
 }
 

 export const  MovieNamebyId=async(id)=>{

    const res=await axios.get(`/movie/${id}`).catch((err)=>console.log(err))

    if(res.status!==200)
    {
        return res.status(400).json({message:"no movie found"})
    }

    const data=await res.data;
    return data;
    

 }


 export const deleteBooking=async(id)=>{
    await axios.delete(`/booking/${id}`).catch((err)=>console.log(err))   
 }


 export const addMovie=async(data)=>{

  const res=  await axios.post(`/movie`,{
        title: data.title,
        description: data.description,
        releaseDate:data.releaseDate,
        image:data.image,
        video:data.video,
        actors:data.actors,
        featured:data.featured,
        admin:localStorage.getItem("AdminId"),

    },{
        headers:{
            authorization:`Bearer ${localStorage.getItem("token")}`
        }
    }).catch((err)=>console.log(err))

    if(res.status!==200)
        {
            return console.log("unexpected error in adding movie")
        }
        const resData=await res.data;
        return resData;


 }


 export const getAdminById=async()=>{
    const id=localStorage.getItem("AdminId");

    const res=await axios.get(`/admin/${id}`).catch((err)=>console.log(err))

    if(res.status!==200)
        {
            return console.log("unexpected error in getting admin data")

        }

        const resData=await res.data;
        return resData;
 }



 export const deleteMovie=async(id)=>{
  

    const res=await axios.delete(`/movie/${id}`).catch((err)=>console.log(err))

    if(res.status!==200)
        {
            return console.log("unexpected error in getting admin data")

        }

        const resData=await res.data;
        return resData;
 }
 

 export const getMovie=async(id)=>{

    const res=await axios.get(`/movie/${id}`).catch((err)=>console.log(err))
    if(res.status!==200)
        {
            return console.log("no movie found")
        }

        const data=await res.data;
        return data;

 }


 export const username=async()=>{
    const id=localStorage.getItem("userId")

    const res=await axios.get(`/user/name/${id}`).catch((err)=>console.log(err));
    if(res.status!==200)
        {
            return console.log("unexpected error in retriving user details")
        }

        const data=await res.data;
        return data;
 }

 export  const updateUser=async({userId,name,email,password})=>{
    
    const res=await axios.put(`/user/${userId}`,{name,password,email}).catch((err)=>console.log(err))
    if(res.status!==200)
        {
            return console.log("error in updating user");
        }
        const data=await res.data;
        return data;
 }


 export const addTicket=async({seats,bdate,email})=>{

    const res=await axios.post('/ticket',{
        seatnumber:seats,
        email:email,
        date:bdate,
    }).catch((err)=>console.log("error in axios ..."))

    if(res.status!==200)
        {
            return console.log("error in booking ticket")
        }

        const Resdata=await res.data;
        return Resdata;

 }


 export const BookedTickets=async()=>{
    const res=await axios.get('/ticket/').catch((err)=>console.log(err))

    if(res.status!==200)
        {
            return console.log("errror in getting tickets")
        }

        const Resdata=await res.data;
        return Resdata;
 }

 export const DeleteBookedTicket=async(id)=>{
    const res=await axios.delete(`/booking/${id}`).catch((err)=>console.log(err))

    if(res.status!==200)
        {
            return console.log("error in deleting tickets");
        }

        const data=await res.data;
        return data;
 }

 
export const getTimingsMovie=async(movieId)=>{
 
      
    const res=await axios.get(`/timing/${movieId}`).catch((err)=>{
        console.log(err)
       })
       if(res.status!==200)
        {
            return console.log("no data")
        }
        const data=await res.data;
        return data;


}


export const getTimingOfOneMovie=async(movieId,timeId)=>{
 
      
    const res=await axios.get(`/timing/movie/${movieId}/${timeId}`).catch((err)=>{
        console.log(err)
       })
       if(res.status!==200)
        {
            return console.log("no data")
        }
        const data=await res.data;
        return data;


}


export const deleteUserBookings=async(userId,BookingIndex)=>{

    const res=await axios.delete(`/user/delete/${userId}/${BookingIndex}`).catch((err)=>console.log("error in deleting"))
    if(res.status==200)
    {
        const data=await res.data;
        return data;
    }
    return console.log("error in deleting Bookings")
}

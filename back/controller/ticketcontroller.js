import TCounter from "../models/T.js";

export const addticket=async(req,res,next)=>{
    const {seatnumber,email,date}=req.body;
    
    
    if(!email)
        {

            return res.status(500).json({message:"email"})

        }
        if(!seatnumber)
            {
                return res.status(500).json({message:"seatnumber inputs"})

            }
    
    if(!date)
        {
            return res.status(500).json({message:"bookedDate inputs"})
        }
        let newTicket;
        try {
            newTicket= new TCounter({
                email,
                seatnumber,
                date
            })
            newTicket= await newTicket.save();
        } catch (error) {
            return next(error)
            
        }
    
        if(!newTicket)
            {
               return res.status(500).json({message:"unexpected error "})
            }
    
           return  res.status(200).json({id:newTicket._id,newTicket})
    
    
    
    }

    export  const getAllTickets=async(req,res,next)=>{
        let Tickets;
    
        try {
            Tickets=await TCounter.find();
    
            
        } catch (error) {
            return next(error)
            
        }
    
        if(!Tickets)
            {
                return res.status(500).json({message : "unexpected error occured"})
            }
    
            return res.status(200).json({Tickets})
    
    }


    
export const getTicketsById=async(req,res,next)=>{
    const id=req.params.id;

    let Ticket;

    try {
        Ticket=await TCounter.findById(id)
    } catch (error) {
       return console.log(error)
       
    }

    if(!Ticket)
       {
           return res.status(400).json({message:"no movie found"});
       }

       return res.status(200).json({Ticket})
}



export const deleteTicket=async(req,res,next)=>{
    const id=req.params.id;

    let movie;

    try {
       movie=await TCounter.findByIdAndDelete(id)
    } catch (error) {
       return console.log(error)
       
    }

    if(!movie)
       {
           return res.status(400).json({message:"no Ticket found"});
       }

       return res.status(200).json({message:"Ticket deleted successfully"})
}


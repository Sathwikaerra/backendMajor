import express from "express";
import { addticket, getAllTickets,getTicketsById ,deleteTicket } from "../controller/ticketcontroller.js";
const ticketRouter=express.Router();

ticketRouter.post('/',addticket)

ticketRouter.get("/:id",getTicketsById)
ticketRouter.get('/',getAllTickets)
ticketRouter.delete('/:id',deleteTicket);


export default ticketRouter; 
import express from "express";
import { getTimingMovie,getTimingOfOneMovie,bookTimingMovie} from "../controller/timingController.js";

const timingRouter= express.Router();
timingRouter.get("/:movieId",getTimingMovie);
timingRouter.get('/movie/:movieId/:timeId',getTimingOfOneMovie)
timingRouter.post("/book",bookTimingMovie);


export default timingRouter
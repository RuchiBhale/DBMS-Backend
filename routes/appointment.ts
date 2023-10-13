import express from "express";
const router = express.Router();



// TODO: Add Collection routes
import {
    setappointment,
   
} from "../controllers/appointment";

router
    .route("/:p_contact")
    .post(setappointment);

export default router;
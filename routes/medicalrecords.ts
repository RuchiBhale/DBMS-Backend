import express from "express";

const router = express.Router();


import {
    setmedicalrecords,
   
} from "../controllers/medicalrecords";


router
    .route("/:d_id")
    .post(setmedicalrecords);
export default router;


// TODO: Add Admin routes


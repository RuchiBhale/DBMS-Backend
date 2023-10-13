import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
// import jwt from "jsonwebtoken";
dotenv.config(); // Load environment variables from .env file

import { queryDatabase } from "../database/connection";

export const setmedicalrecords = async (req: Request, res: Response) => {
    try {
        const d_id = req.params.d_id;

    
        const {p_id,dov,prescription,diagnosis } = req.body; // fields of appointment table

         // Check if username already exists
         let checkDoctorQuery = `SELECT *
         FROM doctor
         WHERE d_id = '${d_id}'`;
     let retrievedDoctor = await queryDatabase(checkDoctorQuery);
     if (retrievedDoctor.length == 0) {
         return res.status(400).json({
             status: false,
             message: "Sorry there is no such doctor registered",
         });
     }
        const setrecordQuery = `SELECT SetRecordAndGetID('${p_id}', '${d_id}', '${dov}','${prescription}','${diagnosis}');`;

        // const createUser = await queryDatabase(createUserQuery);
        const setrecordQueryArray = await queryDatabase(setrecordQuery);
        const set_r_id = Object.values(setrecordQueryArray[0])[0];

      
        return res.status(201).json({
            status: true,
            message: "Medical record inserted successfully",
            a_id:set_r_id
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured while inserting the record",
            error: error,
        });
    }
};


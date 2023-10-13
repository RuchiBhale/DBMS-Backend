import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config(); // Load environment variables from .env file

import { queryDatabase } from "../database/connection";


export const setappointment = async (req: Request, res: Response) => {
    try {
        const p_contact = req.params.p_contact;

        // Check if username already exists
        let checkPatientQuery = `SELECT *
            FROM patient
            WHERE p_contact = '${p_contact}'`;
        let retrievedPatient = await queryDatabase(checkPatientQuery);
        if (retrievedPatient.length == 0) {
            return res.status(400).json({
                status: false,
                message: "Sorry there is no such patient registered",
            });
        }

        const { p_id,d_id,a_date,a_time,description } = req.body; // fields of appointment table

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
        const setappointmentQuery = `SELECT SetAppointmentAndGetID('${p_id}', '${d_id}', '${a_date}','${a_time}','${description}');`;

        // const createUser = await queryDatabase(createUserQuery);
        const setappointmentQueryArray = await queryDatabase(setappointmentQuery);
        const set_a_id = Object.values(setappointmentQueryArray[0])[0];

      
        return res.status(201).json({
            status: true,
            message: "Appointment booked successfully",
            a_id:set_a_id
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured while booking an appointment",
            error: error,
        });
    }
};


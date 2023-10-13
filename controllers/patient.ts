import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
// import jwt from "jsonwebtoken";
dotenv.config(); // Load environment variables from .env file

import { queryDatabase } from "../database/connection";

// import { Token } from "../interfaces/token";

// User Functions

export const createPatient = async (req: Request, res: Response) => {
    try {
        const p_contact = req.params.p_contact;

        // Check if username already exists
        let retrieveUserQuery = `SELECT *
            FROM patient
            WHERE p_contact = '${p_contact}'`;
        let retrieveUser = await queryDatabase(retrieveUserQuery);
        if (retrieveUser.length !== 0) {
            return res.status(400).json({
                status: false,
                message: "Sorry, the phone number is associated with a different patient",
            });
        }

        const { p_name, address, gender, dob , email, d_id, password } = req.body;


        // Hashing the password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(password, salt);

        const createUserQuery = `SELECT InsertUserAndGetID ('${p_name}', '${address}', '${gender}','${dob}','${p_contact}', '${email}', '${d_id}','${securedPassword}');`;

        // const createUser = await queryDatabase(createUserQuery);
        const createPatientQueryArray = await queryDatabase(createUserQuery);
        const new_pid = Object.values(createPatientQueryArray[0])[0];

        

        return res.status(201).json({
            status: true,
            message: "Patient created successfully",
            p_id:new_pid
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured while creating a patient",
            error: error,
        });
    }
};




export const loginPatient = async (req: Request, res: Response) => {
    try {
        const { p_id, password } = req.body;
        const getUserQuery = `SELECT *
		FROM patient 
		WHERE p_id = '${p_id}'`;

        let retrievedUserArray = await queryDatabase(getUserQuery);

        if (!retrievedUserArray || retrievedUserArray.length === 0) {
            return res.status(400).json({
                status: false,
                message: "No such patient found",
            });
        }

        const retrievedUser = retrievedUserArray[0];

        const passwordCompare = await bcrypt.compare(
            password,
            retrievedUser.password
        );

        if (!passwordCompare) {
            return res.status(401).json({
                status: false,
                message: "Login with correct password",
            });
        }

        const updateLoginQuery = `UPDATE patient
            SET last_login = NOW()
            WHERE p_id = '${retrievedUser.p_id}';`;

        queryDatabase(updateLoginQuery);

        return res.status(201).json({
            status: true,
            message: "User Login successful",
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured",
            error: error,
        });
    }
};

export const updatePatient = async (req: Request, res: Response) => {
    try {
        
        const p_contact = req.params.p_contact;

        // Check if username already exists
        let retrieveUserQuery = `SELECT *
            FROM patient
            WHERE p_contact = '${p_contact}'`;
        let retrieveUser = await queryDatabase(retrieveUserQuery);
        if (retrieveUser.length == 0) {
            return res.status(400).json({
                status: false,
                message: "Sorry, the phone number is not registered",
            });
        }
        const {pname,paddress, pgender, pemail, did, ppassword } = req.body;


        let sql = "UPDATE `patient` SET ";
        const updateFields = [];

        if (pname) {
            updateFields.push(`p_name = '${pname}'`);
        }

        if (pgender) {
            updateFields.push(`gender = '${pgender}'`);
        }


        if (pemail) {
            updateFields.push(`p_email = '${pemail}'`);
        }
        if (paddress) {
            updateFields.push(`address = '${paddress}'`);

        }
        if(did){
            updateFields.push(`d_id = '${did}'`);

        }
        



        if (ppassword) {
            const salt = await bcrypt.genSalt(10);
            const securedPassword = await bcrypt.hash(ppassword, salt);
            updateFields.push(`password = '${securedPassword}'`);
        }

        sql += updateFields.join(", ");
        await queryDatabase(sql);

        const updatedUserArray = await queryDatabase(
            `SELECT * FROM patient WHERE p_contact = ${p_contact}`
        );

        return res.status(200).json({
            status: true,
            message: "User updated successfully",
            updated_query: updatedUserArray[0],
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured",
            error: error,
        });
    }

};

// Admin Functions

// export const getUserByUsername = async (req: Request, res: Response) => {
//     try {
//         const token = req.headers.authorization?.split(" ")[1];
//         if (!token) {
//             return res.status(200).json({
//                 success: false,
//                 message: "Error! Please provide a token.",
//             });
//         }
//         const decodedToken = jwt.verify(token!, process.env.JWT_SECRET!);
//         const role = (decodedToken as Token).role;

//         if (role !== Role.admin) {
//             return res.status(403).json({
//                 status: false,
//                 message: "You are not authorized to perform this action",
//             });
//         }
//         const query = `SELECT * FROM users WHERE username = '${req.params.username}'`;
//         const result = await queryDatabase(query);
//         return res.status(200).json({
//             status: true,
//             results: result.length,
//             data: {
//                 users: result,
//             },
//         });
//     } catch (error) {
//         return res.status(500).json({
//             status: false,
//             message: "Some error occured",
//             error: error,
//         });
//     }
// };

// export const getAlldoctors = async (req: Request, res: Response) => {
//     // console.log(req.body)
//     try {
//         const token = req.headers.authorization?.split(" ")[1];
//         if (!token) {
//             return res.status(200).json({
//                 success: false,
//                 message: "Error! Please provide a token.",
//             });
//         }
//         const decodedToken = jwt.verify(token!, process.env.JWT_SECRET!);
//         // const role = (decodedToken as Token).role;

//         // if (role !== Role.admin) {
//         //     return res.status(403).json({
//         //         status: false,
//         //         message: "You are not authorized to perform this action",
//         //     });
//         // }

//         const query = "SELECT * FROM doctor";

//         const results = await queryDatabase(query);
//         return res.status(200).json({
//             status: true,
//             results: results.length,
//             doctorData: decodedToken,
//             data: {
//                 doctors: results,
//             },
//         });
//     } catch (error) {
//         return res.status(500).json({
//             status: false,
//             message: "Some error occured",
//             error: error,
//         });
//     }
// };

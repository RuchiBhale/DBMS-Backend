import * as dotenv from "dotenv";
import express from "express";
import * as mysql from "mysql2";
dotenv.config(); // Load environment variables from .env file
// var bodyParser = require("body-parser");

import AppointmentRouter from './routes/appointment';
import MedicalRecordRouter from './routes/medicalrecords';
import PatientRouter from './routes/patient';
const app = express();
const port = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Static Files directory
// app.use(express.static("./public"));

// Routes


// clean routes (ex. api/v1/{user}/pdf and then upload etc.)
app.use("/patient", PatientRouter);
app.use("/appointment", AppointmentRouter);
app.use("/medicalrecords", MedicalRecordRouter);


// Starting Server
const start = async () => {
    try {
        const connection = mysql.createConnection({
            // host: '%',
            port: 5432,
            user: 'ruchi',
            password: '1234',
            database: process.env.DATABASE_DATABASE,
        });
        await connection.connect((err) => {
            if (err) {
                console.error("Error connecting to MySQL:", err);
                return;
            }
            console.log("Connected to MySQL!");
        });
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();

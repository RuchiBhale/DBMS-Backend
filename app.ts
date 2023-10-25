import * as dotenv from "dotenv";
import express from "express";
import * as mysql from "mysql2";
const cors = require("cors");
dotenv.config(); // Load environment variables from .env file
var bodyParser = require("body-parser");

import AppointmentRouter from "./routes/appointment";
import MedicalRecordRouter from "./routes/medicalrecords";
import PatientRouter from "./routes/patient";
const app = express();
const port = process.env.PORT || 6606;

// // Middleware
app.use(bodyParser.json());
app.use(
    // Enable CORS for multiple origins
    cors({
      origin:"http://localhost:3000",
    })
  );

app.use("/patient", PatientRouter);
app.use("/appointment", AppointmentRouter);
app.use("/medicalrecords", MedicalRecordRouter);

// Starting Server
const start = async () => {
    try {
        const connection = mysql.createConnection({
            host: "localhost",
            port: 5432,
            user: "root",
            password: "1234",
            database: "trustcare",
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

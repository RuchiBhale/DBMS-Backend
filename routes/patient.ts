import express from "express";
const router = express.Router();

import {
  createPatient,
  loginPatient,
  updatePatient,
} from "../controllers/patient";

// import { createAdminUser } from "../testing/admin";

// router.route("/get").get(getAllUsers);
  // Get all users in the db

router.route("/login").post(loginPatient); //  login
router  
    .route("/:p_contact")
    // .get(getUserByUsername)             // Get user with that username
    .post(createPatient)                   // Create user
    .patch(updatePatient);                 // update user

// router.route("/admin/create/:username").post(createAdminUser); // Create admin user
export default router;

// TODO: Add User routes

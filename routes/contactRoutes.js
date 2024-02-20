import express from "express";
import { contact, requestCourse } from "../controllers/contactController.js";

const router = express.Router();

//Contact form
router.route("/").post(contact);

//Request Course
router.route("/request-course").post(requestCourse);

export default router;

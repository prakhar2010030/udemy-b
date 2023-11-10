import express from "express";
import {
  createCourse,
  getAllCourses,
} from "../controllers/courseController.js";

const router = express.Router();

//getting all courses
router.route("/courses").get(getAllCourses);

//for creating courses - only admin
router.route("/createCourse").post(createCourse);


//add lectures, delete course, get course details


//delete lecture

export default router;

import express from "express";
import {
  addLecture,
  courseLecture,
  createCourse,
  deleteCourse,
  deleteLecture,
  getAllCourses,
} from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import {
  authorizedAdmin,
  authorizedSubscribers,
  isAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

//getting all courses
router.route("/courses").get(getAllCourses);

//for creating courses - only admin
router
  .route("/createCourse")
  .post(isAuthenticated, authorizedAdmin, singleUpload, createCourse);

//add lectures, delete course, get course details
router
  .route("/course/:id")
  .get(isAuthenticated, authorizedSubscribers, courseLecture)
  .post(isAuthenticated, authorizedAdmin, singleUpload, addLecture)
  .delete(isAuthenticated, authorizedAdmin, deleteCourse);

//delete lecture
router
  .route("/deleteLecture")
  .delete(isAuthenticated, authorizedAdmin, singleUpload, deleteLecture);

export default router;

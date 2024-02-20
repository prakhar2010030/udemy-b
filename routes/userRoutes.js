import express from "express";
import {
  addToPlayList,
  changePassword,
  deleteMyProfile,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  profilePicture,
  profileUpdate,
  register,
  removePlayList,
  resetPassword,
  updateUserRole,
} from "../controllers/userController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);

router.route("/login").post(login);

router.route("/logout").get(logout);

//to get my profile
router.route("/profile").get(isAuthenticated, getMyProfile);

//to delete my profile
router.route("/profile").delete(isAuthenticated, deleteMyProfile);
//to update profile
router.route("/profileUpdate").put(isAuthenticated, profileUpdate);

//profile picture update
router
  .route("/profilePictureUpdate")
  .put(isAuthenticated, singleUpload, profilePicture);

//change password
router.route("/changePassword").put(isAuthenticated, changePassword);

//forget password
router.route("/forgetPassword").post(forgetPassword);

//reset password
router.route("/resetPassword/:token").put(resetPassword);

//add to playlist
router.route("/addToPlayList").post(isAuthenticated, addToPlayList);

//remove playlist
router.route("/removePlayList").delete(isAuthenticated, removePlayList);

//Admin Routes
router.route("/admin/users").get(isAuthenticated, authorizedAdmin, getAllUsers);

//to update user role
router
  .route("/admin/update-role/:id")
  .put(isAuthenticated, authorizedAdmin, updateUserRole);

//  to delet user through admin
router
  .route("/admin/deleteUser/:id")
  .delete(isAuthenticated, authorizedAdmin, deleteUser);

export default router;

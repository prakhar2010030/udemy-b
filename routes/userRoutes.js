import express from "express";
import {
  addToPlayList,
  changePassword,
  forgetPassword,
  getMyProfile,
  login,
  logout,
  profilePicture,
  profileUpdate,
  register,
  removePlayList,
  resetPassword,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/profile").get(isAuthenticated, getMyProfile);

router.route("/profileUpdate").put(isAuthenticated, profileUpdate);

router.route("/profilePictureUpdate").put(isAuthenticated, profilePicture);

router.route("/changePassword").put(isAuthenticated, changePassword);

router.route("/forgetPassword").post(forgetPassword);

router.route("/resetPassword/:token").put(resetPassword);

router.route("/addToPlayList").post(isAuthenticated, addToPlayList);

router.route("/removePlayList").delete(isAuthenticated, removePlayList);

export default router;

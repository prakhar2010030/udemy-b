import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../model/user.js";
import sendToken from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import { Course } from "../model/course.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  // const file = req.file;

  if (!name || !email || !password)
    return next(new ErrorHandler("please enter all field", 400));

  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("user already exist", 409));

  // upload file on cloudinary
  // const hashedPassword = await bcrypt.hash(password, 10);//(value, salt)

  user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: "temp", url: "temp" },
  });

  sendToken(res, user, "registered successfully", 201);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // console.log("login");

  if (!email || !password)
    return next(new ErrorHandler("please enter all field", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("user doesn't exist", 401));

  // let passwordValidate =await bcrypt.compare(password, user.password);
  let passwordValidate = await user.comparePassword(password);

  if (!passwordValidate)
    return next(new ErrorHandler("invalid credential", 401));

  sendToken(res, user, `welcome ${user.name}`, 200);
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "logged out successfully",
    });
});

export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});
export const changePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    return next(new ErrorHandler("please enter all field", 400));

  const user = await User.findById(req.user._id).select("+password");

  const isMatch = await user.comparePassword(oldPassword);

  if (!isMatch) return next(new ErrorHandler("incorrect old password", 401));

  user.password = newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "password changed successfully",
  });
});
export const profileUpdate = catchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user._id);

  if (name) user.name = name;
  if (email) user.email = email;

  await user.save();

  res.status(200).json({
    success: true,
    message: "profile updated successfully",
  });
});

export const profilePicture = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "profile picture updated successfully",
  });
});
export const forgetPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  console.log(email);

  const user = await User.findOne({ email });

  console.log(user);

  if (!user) return next(new ErrorHandler("user not found", 400));

  const resetToken = await user.getResetToken();

  await user.save();

  // console.log(resetToken);

  //send an email via nodeMailer
  const url = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;

  const message = `click on the link to reset your password. ${url}. If you have not request then please ignore`;

  await sendEmail(user.email, "Reset Password", message);

  res.status(200).json({
    success: true,
    message: `Reset link has been sent to ${user.email}`,
  });
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;

  const ResetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // console.log(ResetPasswordToken);

  const user = await User.findOne({
    ResetPasswordToken,
    ResetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  // console.log(user);
  // console.log(req.body.password);

  if (!user)
    return next(
      new ErrorHandler("invalid token or token has been expired", 400)
    );

  user.password = req.body.password;

  user.ResetPasswordExpire = undefined;
  user.ResetPasswordToken = undefined;

  await user.save();
  res.status(200).json({
    success: true,
    message: "password updated successfully",
  });
});

export const addToPlayList = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const course = await Course.findById(req.body.id);

  if (!course) return next(new ErrorHandler("Invalid course Id", 400));

  const itemExist = user.playlist.find((item) => {
    if (item.course.toString() === course._id.toString()) return true;
  });

  if (itemExist) return next(new ErrorHandler("Course already Exist", 409));

  user.playlist.push({
    course: course._id,
    poster: course.poster.url,
  });

  await user.save();

  res.status(200).json({
    success: true,
    message: "course added to playList",
  });
});

export const removePlayList = catchAsyncError(async (req, res, next) => {
  
  const user = await User.findById(req.user._id);

  const course = await Course.findById(req.query.id);

  if (!course) return next(new ErrorHandler("Invalid course Id", 400));

  const newPlayList = user.playlist.filter((item) => {
    if (item.course.toString() !== course._id.toString()) return item;
  });

  user.playlist = newPlayList;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Removed course from PlayList",
  });
});

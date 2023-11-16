import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../model/user.js";
import sendToken from "../utils/sendToken.js";

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

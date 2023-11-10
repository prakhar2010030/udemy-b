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

  user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: "temp", url: "temp" },
  });

  sendToken(res, user, "registered successfully", 201);
});

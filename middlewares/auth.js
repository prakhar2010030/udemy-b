import jwt from "jsonwebtoken";
import catchAsyncError from "./catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../model/user.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  // console.log(token);

  if (!token) return next(new ErrorHandler("user not logged in", 401));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET); // to get user object

  req.user = await User.findById(decodedData._id);
  // console.log(req.user)
  next(); // to call next middleware
});

export const authorizedAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this resource`,
        403
      )
    );
  next();
};

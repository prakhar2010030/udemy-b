import catchAsyncError from "../middlewares/catchAsyncError.js";
import { Course } from "../model/course.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getAllCourses = catchAsyncError(async (req, res, next) => {
  const courses = await Course.find({}).select("-lectures");
  res.status(200).json({
    success: true,
    courses,
  });
});
export const createCourse = catchAsyncError(async (req, res, next) => {
  const { Title, description, category, createdBy } = req.body;
  //   console.log(req.body);

  if (!Title || !category || !description || !createdBy)
    return next(new ErrorHandler("please add all field", 400));

  //   const file = req.file;
  //   console.log(Title,description,category,createdBy);

  await Course.create({
    Title,
    description,
    category,
    createdBy,
    poster: {
      public_id: "temp",
      url: "temp",
    },
  });

  res.status(201).json({
    success: true,
    message: "Course created successfully. You can add lectures now",
  });
});

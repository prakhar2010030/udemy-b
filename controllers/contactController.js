import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";

export const contact = catchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return next(new ErrorHandler("All fileds are mandatory", 403));

  const to = process.env.MY_EMAIL;
  const subject = `contact request`;
  const text = `hello, I'm ${name} and my email is ${email}.\n${message}`;

  await sendEmail(to, subject, text);
  res.status(200).json({
    success: true,
    message: "Your message has been sent.",
  });
});
export const requestCourse = catchAsyncError(async (req, res, next) => {
  const { name, email, courseName } = req.body;

  if (!name || !email || !courseName)
    return next(new ErrorHandler("All fileds are mandatory", 403));

    const to = process.env.MY_EMAIL;
  const subject = `Course request`;
  const text = `hello, I'm ${name} and my email is ${email}.\n Requesting for course '${courseName}'`;

  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Your request has been sent.",
  });
});

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import courseRouter from "./routes/courseRoutes.js";
import userRouter from "./routes/userRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import contactRouter from "./routes/contactRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js"
import errorMiddleware from "./middlewares/Error.js";

export const app = express();

// middlewares
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

// routes
app.use("/api/course", courseRouter);
app.use("/api/user", userRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/contact", contactRouter);
app.use("/api/dashboard", dashboardRouter);

//env configuration
dotenv.config({ path: "./configurations/config.env" });

app.get("/", (req, res) => {
  res.send("server is working!!");
});

app.use(errorMiddleware); //custom error handler

import express from "express";
import dotenv from "dotenv";
import courseRouter from "./routes/courseRoutes.js";
import userRouter from "./routes/userRoutes.js";
import errorMiddleware from "./middlewares/Error.js";

export const app = express();

// middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// routes
app.use("/api/course", courseRouter);
app.use("/api/user", userRouter);

//env configuration
dotenv.config({ path: "./configurations/config.env" });


app.get("/", (req, res) => {
  res.send("server is working!!");
});


app.use(errorMiddleware); //custom error handler

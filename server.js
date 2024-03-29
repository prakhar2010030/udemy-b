import { app } from "./app.js";
import { connectDb } from "./configurations/connection.js";
import {Stats} from './model/stats.js'
import cloudinary from "cloudinary";
import Razorpay from "razorpay";
import nodeCron from 'node-cron';

connectDb(); //db connection

export const razorPayInstance = new Razorpay({
  key_id: process.env.RAZOR_PAY_API_KEY,
  key_secret: process.env.RAZOR_PAY_SECRET,
});

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

//(sec min hrs day month year) runs a task
nodeCron.schedule("0 0 0 1 * *",async()=>{
  try {
    await Stats.create({})
  } catch (error) {
    console.log(error)
  }
})



app.listen(process.env.PORT, () => {
  console.log(`Server is running at port: ${process.env.PORT}`);
});

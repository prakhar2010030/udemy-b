import mongoose from "mongoose";

export const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "udemy-backend" })
    .then((c) => console.log(`db is connected at host : ${c.connection.host}`))
    .catch((e) => console.log(e));
};

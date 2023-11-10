import { app } from "./app.js";
import { connectDb } from "./configurations/connection.js";

connectDb(); //db connection

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port: ${process.env.PORT}`);
});

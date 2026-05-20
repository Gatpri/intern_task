import "./env.js";
import express from "express";
import cors  from "cors";
import { connectDB } from "./db.js";
import signupRoutes from "./routes/signup.js";
import loginRoutes from "./routes/login.js"
import recoverRoutes from "./routes/password_recover.js";
import mongoose from "mongoose";


const app = express();


//middleware

app.use(cors());
app.use(express.json());

//connectDB
 await connectDB();

 //routes
 app.use("/", signupRoutes)
 app.use("/", loginRoutes)
 app.use("/", recoverRoutes);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

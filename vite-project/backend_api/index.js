import "./env.js";
import express from "express";
import cors  from "cors";
import { connectDB } from "./db.js";
import signupRoutes from "./routes/signup.js";
import loginRoutes from "./routes/login.js"
import recoverRoutes from "./routes/password_recover.js";
import googleAuthRoutes from "./routes/google_auth_signup.js";
import mongoose from "mongoose";
import admin from "firebase-admin";
import { readFileSync } from "fs";
const serviceAccount = JSON.parse(
  readFileSync(new URL("./serviceAccountKey.json", import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

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
 app.use("/", googleAuthRoutes);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

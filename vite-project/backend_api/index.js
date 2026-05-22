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

// Initialize Firebase Admin from environment variables
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  })
});

const app = express();

//middleware

// Configure CORS properly for Firebase authentication
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Add security headers for Firebase popup authentication
app.use((req, res, next) => {
  res.header("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

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

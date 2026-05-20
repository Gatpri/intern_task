import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import sgMail from "../sendgrid.js";
import crypto from "crypto";


const router = express.Router();




const pendingUsers = {}; // { email: { data, expiresAt } }





//user submits form -> store in pendingUsers with expiry (5min) -> send verification email with token link -> on click, verify token, create user in DB, delete from pendingUsers



// API route
router.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;


    if(!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

 const existingUser = await User.findOne({email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
  



    const hashedPassword = await bcrypt.hash(password, 10);
        const token = crypto.randomBytes(32).toString("hex"); // random unique token


    pendingUsers[token]={
      firstname,
      lastname,
      email,
      password: hashedPassword,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 minute expiry
    }

      // Send verification email
    const link = `http://localhost:3000/verify-email?token=${token}`;
    await sgMail.send({
      to: email,
      from: "saugatkapri@gmail.com",       
      subject: "Verify your email",
      html: `
        <h2>We are pleased to welcome you in our community!</h2>
        <p>Click the link below to verify your email address:</p>
        <a href="${link}">Verify my email</a>
        <p>This link expires in 5 minutes.</p>
      `,
    });

    res.json({
      success: true,
      message: "Confirmation link sent! Please check your email.",
    });

  }
  

  catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});



// After verification link is clicked
router.get("/verify-email", async (req, res) => {
  try{
  const { token } = req.query;
  const record = pendingUsers[token];

  if (!record) {
    return res.status(400).send("Invalid or expired token");
  }


     if (Date.now() > record.expiresAt) {
      delete pendingUsers[token];
      return res.status(400).send("Link has expired. Please register again.");
    }


  //create user in database
  await User.create({
    firstname: record.firstname,
    lastname: record.lastname,
    email: record.email,
    password: record.password,
  });
  
  delete pendingUsers[token]; // cleanup

  res.send(`
      <h2>✅ Account confirmed and created successfully!</h2>
      <p>Your account has been created. You can now <a href="http://localhost:5173/login">login here</a>.</p>
    `);
  }
  catch(err){
    res.status(500).send("Server error");
  }
});




export default router;
 
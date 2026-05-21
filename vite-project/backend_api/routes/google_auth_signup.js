import express from "express";
import User from "../models/User.js";
import admin from "firebase-admin";
const router = express.Router();


router.post("/google-auth", async (req, res) => {
  const { idToken } = req.body;

  try {
    //  Verify the token with Google/Firebase
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, name, picture } = decodedToken;

    // 2. Check if user exists in MongoDB
    let user = await User.findOne({ email });

    if (!user) {
      // Splitting name
      const [firstname, ...lastnameParts] = name.split(" ");
      const lastname = lastnameParts.join(" ") || " ";

      user = await User.create({
        firstname,
        lastname,
        email,
        password: "GOOGLE_AUTH_USER", // Password not used for Google users
      });
    }

    res.json({ success: true, user });
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid Token" });
  }
});

export default router;
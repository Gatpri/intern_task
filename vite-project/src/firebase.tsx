// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCImPvwwHlxWkhkjuOS-irORN3wsteBTR4",
  authDomain: "vite-project-b6c97.firebaseapp.com",
  projectId: "vite-project-b6c97",
  storageBucket: "vite-project-b6c97.firebasestorage.app",
  messagingSenderId: "230648309457",
  appId: "1:230648309457:web:8c6179a5a2680ddc0107f0",
  measurementId: "G-2CR4YX90WS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
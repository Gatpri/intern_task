// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyDUi2c04DY0qjZ3yHGqm9sZ24nb4PYNy8s",
  authDomain: "vite-e5c25.firebaseapp.com",
  projectId: "vite-e5c25",
  storageBucket: "vite-e5c25.firebasestorage.app",
  messagingSenderId: "1035830726436",
  appId: "1:1035830726436:web:251f3eb9fede9915a8edb1",
  measurementId: "G-PTYSQB10LB"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize analytics only where available (guards SSR / non-browser env)
let _analytics = null;
try {
  _analytics = getAnalytics(app);
} catch (e) {
  console.log("Analytics not available in this environment");
}

export const analytics = _analytics;
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
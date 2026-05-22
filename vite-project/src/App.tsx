import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';
import { getRedirectResult } from 'firebase/auth';
import { auth } from './firebase';
import { toast } from 'react-toastify';
import Login from "./AUthentication_Components/Pages/Login";
import Signin from "./AUthentication_Components/Pages/Signin";
import Recover from './AUthentication_Components/Pages/Recover';
import ResetPassword from './AUthentication_Components/Pages/reset_password';
import Home from './home_components/Pages/home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(){

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          const idToken = await result.user.getIdToken();
          const response = await axios.post("http://localhost:3000/google-auth", { idToken, email: result.user.email, displayName: result.user.displayName });
          if (response.data.success) {
            toast.success("Sign in successful");
          } else {
            toast.error(response.data.message || "Authentication failed");
          }
        }
      } catch (err: any) {
        // Redirect flow errors are often benign; log for debugging
        console.error('getRedirectResult error:', err);
      }
    };
    handleRedirect();
  }, []);

  return(
<>
    <ToastContainer
     position="top-right"
  autoClose={5000}
  closeOnClick
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme='colored'
    aria-label="notifications" />
<Routes>

   <Route path="/" element={<Navigate to="/signin" />} />
  <Route path = "/signin" element={<Signin />}/>
<Route path = "/login" element={<Login />}/>
<Route path = "/recover" element={<Recover />}/>
<Route path = "/reset-password" element={<ResetPassword/>}/>
<Route path = "/home" element={<Home />}/>
</Routes>
</>
  );
}
export default App;



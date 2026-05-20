import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./AUthentication_Components/Pages/Login";
import Signin from "./AUthentication_Components/Pages/Signin";
import Recover from './AUthentication_Components/Pages/Recover';
import ResetPassword from './AUthentication_Components/Pages/reset_password';
import Home from './home_components/Pages/home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(){

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



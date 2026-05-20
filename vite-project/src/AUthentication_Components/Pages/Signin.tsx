import { useState } from "react";//it is a react hook (function) used to re-render the UI
import "../styles/Signin.css";
import { Link} from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';

function Signin(){

  const[ firstname , setFirstName ] =useState<string>("");
  const[lastname , setLastName ] =useState<string>("");
  const[ email , setEmail ] =useState<string>("");
  const[ password , setPassword ] =useState<string>("");
   
  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

const handleSubmit = async (e: React.FormEvent) => {//e = event object i.e. It contains info about what just happened (form submit) and its type is React.FormEvent
  e.preventDefault();//this stops page refresh or reload

  try {
    const result = await axios.post(// sends data to backend server using post method to the API URLwhich is inside ''

      "http://localhost:3000/register",
      {
        firstname,
        lastname,
        email,
        password,
      }
    );

    console.log(result);
    if(result.data.success){
      clearForm();// Clear form fields after successful registration
      toast.success(result.data.message);
    } else {
      toast.error("Registration failed: " + result.data.message);
    }
  } catch (err) {
    console.log(err);
  }
};

  const [showPassword , setShowPassword] =useState(false);
  return(
<div className="main">
    <div className="container">

{/*LeftSide*/}
<div className="left">
  
  <h3 className="logo">Practice<span>Project</span></h3>

  <h1>Launch Product With 
  <br/>
  <span className="gradient">ACME IT</span>
  <br/>
  Build Career
  </h1>

</div>


{/*RightSide*/}
<div className="right">
<h2>Create Account</h2>
<form onSubmit={handleSubmit}> {/*“When user clicksSubmit function” submit button → run handle*/}

  <div className="name">
  <div className="firstName">
  <label htmlFor="firstname">First Name*
  <input type="text" id="firstname" name="myFirstName" value={firstname} onChange={(e) => setFirstName(e.target.value)}/>
  </label>
  </div>

<div className="lastName">
  <label htmlFor="lastname">Last Name*
  <input type="text" id="lastname" name="myLastName" value={lastname} onChange={(e) => setLastName(e.target.value)}/>
  </label>
  </div>
  </div>

  <div className="email">
    <label htmlFor="email">Email*
    <input type="email" id="email" name="myEmail" placeholder="example@gmail.com"  value={email} onChange={(e) => setEmail(e.target.value)}/>
    </label>
  </div>

  <div className="password">
    <label htmlFor="password">Password*
    <input type={showPassword ? "text" : "password"} id="password" name="mypassword" value={password} onChange={(e) => setPassword(e.target.value)}/>
    </label>
    <span className="toogle" onClick={() => setShowPassword(!showPassword)}>
     {showPassword ? "🙈" : "👁️"}
    </span>
    
  </div>
<p className="below_password">Must be at least 8 characters</p>


<div className="create_acc_button">
  <button type="submit" id="button">Create Account</button>
</div>

<div className="google_button">
  <button type="submit" id="google_button">Sign up with Google</button>
</div>
<p className="account_already">
  Already have an account?
  <Link to="/login" >Login</Link>
</p>

</form>
  
</div>



    </div>
</div>
  );
}



export default Signin;


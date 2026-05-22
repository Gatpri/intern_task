import { useState } from "react";
import "../styles/Signin.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import { auth, googleProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";  // ✅ popup, no useEffect needed

function Signin(){

  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSigning, setIsSigning] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3000/register", {
        firstname,
        lastname,
        email,
        password,
      });
      console.log(result);
      if (result.data.success) {
        clearForm();
        toast.success(result.data.message);
        navigate("/home");
      } else {
        toast.error("Registration failed: " + result.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ popup works perfectly on localhost, no Chrome state issues
  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isSigning) return;
    setIsSigning(true);
    try {
      googleProvider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, googleProvider);  // ✅ result comes back directly
      console.log("Google user:", result.user);
      const idToken = await result.user.getIdToken();
      const response = await axios.post("http://localhost:3000/google-auth", { idToken });
      if (response.data.success) {
        toast.success("Login Successful!");
        navigate("/home");  // ✅ goes to home immediately
      } else {
        toast.error("Google login failed");
      }
    } catch (error: any) {
      console.error("Google Sign-In error:", error);
      toast.error(error.message || 'Google Sign-In failed');
    } finally {
      setIsSigning(false);  // ✅ always resets button whether success or fail
    }
  };

  return (
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
          <form onSubmit={handleSubmit}>

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
                <input type="email" id="email" name="myEmail" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
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
              <button type="button" id="google_button" onClick={handleGoogleSignIn} disabled={isSigning}>
                {isSigning ? 'Signing in...' : 'Sign up with Google'}
              </button>
            </div>

            <p className="account_already">
              Already have an account?
              <Link to="/login">Login</Link>
            </p>

          </form>
        </div>

      </div>
    </div>
  );
}

export default Signin;
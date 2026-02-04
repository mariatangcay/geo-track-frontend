import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./Login.css"; 
import logo from "../assets/GeoTrack_logo.svg";
import phone from "../assets/GeoTrack_phone.svg";



export default function Login() {
  const [email, setEmail] = useState("");       
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState("");       
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const res = await axios.post(
        `${API_URL}/api/login`, 
        { email, password }
      )
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Try again.");
      }
    }
  };

  return (
    <div className="login-container">
      {/* Left side */}
      <div className="login-left">
        {/* Logo */}
      <img src={logo} alt="GeoTrack Logo" className="login-logo" />
      {/* Phone illustration */}
      <img src={phone} alt="GeoTrack Phone" className="login-phone" />
        <p>Discover and track IP locations instantly. Stay on top of your searches and discover insights in no time.</p>
  
      </div>
      {/* Right side */}
      <div className="login-right">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(""); 
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(""); 
            }}
            required
          />
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

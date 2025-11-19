import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/profile");
    } catch (error) {
      // Better error messages
      if (error.code === 'auth/invalid-credential') {
        setError("Invalid email or password. Please check your credentials.");
      } else if (error.code === 'auth/user-not-found') {
        setError("No account found with this email.");
      } else if (error.code === 'auth/wrong-password') {
        setError("Incorrect password.");
      } else {
        setError("Failed to log in: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <h1>Login</h1>
        
        {error && <ErrorBox message={error} />}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="login-btn"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Login"}
          </button>
        </form>
        
        <div className="auth-link">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
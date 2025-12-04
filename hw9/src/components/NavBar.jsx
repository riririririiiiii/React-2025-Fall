import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/NavBar.css";

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Ghibli App
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/about" 
              className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/movies" 
              className={`nav-link ${location.pathname === "/movies" ? "active" : ""}`}
            >
              Movies
            </Link>
          </li>
          
          {currentUser ? (
            <>
              <li className="nav-item">
                <Link 
                  to="/profile" 
                  className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`}
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <button 
                  onClick={handleLogout}
                  className="nav-link logout-btn"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link 
                  to="/login" 
                  className={`nav-link ${location.pathname === "/login" ? "active" : ""}`}
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/signup" 
                  className={`nav-link ${location.pathname === "/signup" ? "active" : ""}`}
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
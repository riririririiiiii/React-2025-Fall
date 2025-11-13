import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/NavBar.css";

export default function NavBar() {
  const location = useLocation();

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
          <li className="nav-item">
            <Link 
              to="/login" 
              className={`nav-link ${location.pathname === "/login" ? "active" : ""}`}
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
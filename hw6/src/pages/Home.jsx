import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import bg from "../assets/bg.jpg";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Studio Ghibli Films</h1>
        <p className="home-description">
          Discover the magical world of Studio Ghibli through our collection of
          enchanting animated films. From the beloved classics like "My Neighbor Totoro"
          to epic adventures like "Princess Mononoke", explore the stories that have
          captured hearts worldwide.
        </p>

        <div className="home-links">
          <Link to="/movies" className="home-link primary">
            Explore Movies
          </Link>
          <Link to="/about" className="home-link secondary">
            About Me
          </Link>
        </div>

        <div className="home-image">
          <img src={bg} alt="Background" />
        </div>
      </div>
    </div>
  );
}
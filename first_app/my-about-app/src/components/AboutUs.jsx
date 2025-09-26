import React from "react";
import "../App.css";
import "../css/AboutUs.css";
import photo from "../assets/photo.jpg";

export default function AboutUs() {
  return (
    <section id="about" className="about-section">
      <h2 className="about-title">Learn about me</h2>
      <div className="divider">
        <span className="diamond"></span>
      </div>

      <div className="about-content">
        <div className="about-image">
          <img src={photo} alt="photo" />
        </div>

        <div className="about-text">
          <p className="about-description">
            I'm just a girl, who loves reading and romanticizing my everyday life. 
            The habit of walking in the evenings helps me a lot to relax and spend time alone.
            Also, planning everything keeps me well organized and disciplined.
          </p>

          <div className="about-info">
            <div className="info-row">
              <h4>City:</h4>
              <p>Almaty</p>
            </div>
            <div className="info-row">
              <h4>Education:</h4>
              <p>Kazakh-British Technical University</p>
            </div>

            <div className="info-row">
              <h4>Email:</h4>
              <p>r_muktar@kbtu.kz</p>
            </div>
            <div className="info-row">
              <h4>Birth year:</h4>
              <p>2006</p>
            </div>

            <div className="info-row">
              <h4>Languages:</h4>
              <p>Kazakh, Russian, English</p>
            </div>
            <div className="info-row">
              <h4>Hobbies:</h4>
              <p>Watching romcom movies and cooking</p>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}


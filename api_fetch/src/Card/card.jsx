import React from "react";
import "./card.css";

export default function Card({ movie }) {
  if (!movie) return null;

  return (
    <div className="card">
      <div className="card-content">
        <img src={movie.image} alt={movie.title} className="card-poster" />

        <div className="card-info">
          <h2>{movie.title}</h2>
          <p className="card-original">
            <em>{movie.original_title} ({movie.original_title_romanised})</em>
          </p>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Producer:</strong> {movie.producer}</p>
          <p><strong>Release Year:</strong> {movie.release_date}</p>
          <p><strong>Running Time:</strong> {movie.running_time} min</p>
          <p><strong>Rotten Tomatoes Score:</strong> {movie.rt_score}%</p>
        </div>
      </div>

      <p className="card-description">{movie.description}</p>
    </div>
  );
}


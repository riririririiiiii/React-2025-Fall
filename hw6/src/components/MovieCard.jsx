import React from "react";
import "../styles/MovieCard.css";

export default function MovieCard({ movie }) {
  if (!movie) return null;

  return (
    <div className="movie-card">
      <img src={movie.image} alt={movie.title} className="movie-card-poster" />
      
      <div className="movie-card-content">
        <h3 className="movie-card-title">{movie.title}</h3>
        <p className="movie-card-director">
          <strong>Director:</strong> {movie.director}
        </p>
        <p className="movie-card-year">
          <strong>Year:</strong> {movie.release_date}
        </p>
        <p className="movie-card-score">
          <strong>Score:</strong> {movie.rt_score}%
        </p>
        <p className="movie-card-description">
          {movie.description.substring(0, 120)}...
        </p>
        <div className="movie-card-link">View Details →</div>
      </div>
    </div>
  );
}
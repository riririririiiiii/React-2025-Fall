import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ghibliService } from "../services/ghibliService";
import Spinner from "./Spinner";
import ErrorBox from "./ErrorBox";
import "../styles/MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMovie();
  }, [id]);

  async function loadMovie() {
    try {
      setLoading(true);
      setError(null);
      const data = await ghibliService.getMovieById(id);
      setMovie(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Spinner />;
  if (error) return <ErrorBox message={error} onRetry={loadMovie} />;
  if (!movie) return <ErrorBox message="Movie not found" />;

  return (
    <div className="movie-details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <div className="movie-details">
        <div className="movie-details-poster">
          <img src={movie.image} alt={movie.title} />
        </div>

        <div className="movie-details-info">
          <h1>{movie.title}</h1>
          <p className="original-title">
            <em>{movie.original_title} ({movie.original_title_romanised})</em>
          </p>

          <div className="details-grid">
            <div className="detail-item">
              <strong>Director:</strong> {movie.director}
            </div>
            <div className="detail-item">
              <strong>Producer:</strong> {movie.producer}
            </div>
            <div className="detail-item">
              <strong>Release Year:</strong> {movie.release_date}
            </div>
            <div className="detail-item">
              <strong>Running Time:</strong> {movie.running_time} min
            </div>
            <div className="detail-item">
              <strong>Rotten Tomatoes:</strong> {movie.rt_score}%
            </div>
            <div className="detail-item">
              <strong>Rating:</strong> {movie.rt_score / 20}/5
            </div>
            <div className="detail-item full-width">
              <strong>Category:</strong> {movie.director}'s Films
            </div>
          </div>

          <div className="movie-description">
            <h3>Synopsis</h3>
            <p>{movie.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
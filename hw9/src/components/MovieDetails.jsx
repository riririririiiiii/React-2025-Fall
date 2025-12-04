import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieById, clearSelectedMovie } from "../features/movies/moviesSlice";
import Spinner from "./Spinner";
import ErrorBox from "./ErrorBox";
import "../styles/MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // state from redux
  const { selectedMovie, loadingMovie, errorMovie } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovieById(id));
    
    return () => {
      dispatch(clearSelectedMovie());
    };
  }, [id, dispatch]);

  if (loadingMovie) return <Spinner />;
  if (errorMovie) return <ErrorBox message={errorMovie} onRetry={() => dispatch(fetchMovieById(id))} />;
  if (!selectedMovie) return <ErrorBox message="Movie not found" />;

  return (
    <div className="movie-details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      
      <div className="movie-details">
        <div className="movie-details-poster">
          <img src={selectedMovie.image} alt={selectedMovie.title} />
        </div>

        <div className="movie-details-info">
          <h1>{selectedMovie.title}</h1>
          <p className="original-title">
            <em>{selectedMovie.original_title} ({selectedMovie.original_title_romanised})</em>
          </p>

          <div className="details-grid">
            <div className="detail-item">
              <strong>Director:</strong> {selectedMovie.director}
            </div>
            <div className="detail-item">
              <strong>Producer:</strong> {selectedMovie.producer}
            </div>
            <div className="detail-item">
              <strong>Release Year:</strong> {selectedMovie.release_date}
            </div>
            <div className="detail-item">
              <strong>Running Time:</strong> {selectedMovie.running_time} min
            </div>
            <div className="detail-item">
              <strong>Rotten Tomatoes:</strong> {selectedMovie.rt_score}%
            </div>
            <div className="detail-item">
              <strong>Rating:</strong> {selectedMovie.rt_score / 20}/5
            </div>
            <div className="detail-item full-width">
              <strong>Category:</strong> {selectedMovie.director}'s Films
            </div>
          </div>

          <div className="movie-description">
            <h3>Synopsis</h3>
            <p>{selectedMovie.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ghibliService } from "../services/ghibliService";
import Spinner from "./Spinner";
import ErrorBox from "./ErrorBox";
import MovieCard from "./MovieCard";
import "../styles/MoviesList.css";

export default function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";

  useEffect(() => {
    loadMovies();
  }, []);

  async function loadMovies() {
    setLoading(true);
    setError(null);
    try {
      const data = await ghibliService.getAllMovies();
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorBox message={error} onRetry={loadMovies} />;

  return (
    <div className="movies-list-container">
      <h2>Studio Ghibli Movies</h2>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <button 
            className="search-btn"
            onClick={() => setSearchParams({})}
          >
            Clear
          </button>
        )}
      </div>

      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <Link 
            key={movie.id} 
            to={`/movies/${movie.id}`}
            className="movie-card-link"
          >
            <MovieCard movie={movie} />
          </Link>
        ))}
      </div>

      {filteredMovies.length === 0 && searchTerm && (
        <p className="no-results">No movies found for "{searchTerm}"</p>
      )}
    </div>
  );
}
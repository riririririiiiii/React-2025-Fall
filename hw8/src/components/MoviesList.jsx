import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, Link } from "react-router-dom";
import { fetchMovies, setQuery } from "../features/movies/moviesSlice";
import Spinner from "./Spinner";
import ErrorBox from "./ErrorBox";
import MovieCard from "./MovieCard";
import "../styles/MoviesList.css";

export default function MoviesList() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { list, loadingList, errorList } = useSelector(
    (state) => state.movies
  );

  const [inputValue, setInputValue] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue) {
        setSearchParams({ q: inputValue });
      } else {
        setSearchParams({});
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, setSearchParams]);

  useEffect(() => {
    const searchTerm = searchParams.get("q") || "";
    dispatch(setQuery(searchTerm));
    dispatch(fetchMovies(searchTerm)); //backend search
  }, [searchParams, dispatch]);

  const handleSearchChange = (e) => {
    setInputValue(e.target.value); 
  };

  const handleClear = () => {
    setInputValue("");
    setSearchParams({});
  };

  if (loadingList) return <Spinner />;
  if (errorList) {
    return (
      <ErrorBox
        message={errorList}
        onRetry={() => dispatch(fetchMovies(searchParams.get("q") || ""))}
      />
    );
  }

  return (
    <div className="movies-list-container">
      <h2>Studio Ghibli Movies</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search movies..."
          value={inputValue}
          onChange={handleSearchChange}
        />
        {inputValue && (
          <button className="search-btn" onClick={handleClear}>
            Clear
          </button>
        )}
      </div>

      <div className="movies-grid">
        {list.map((movie) => (
          <Link
            key={movie.id}
            to={`/movies/${movie.id}`}
            className="movie-card-link"
          >
            <MovieCard movie={movie} />
          </Link>
        ))}
      </div>

      {list.length === 0 && inputValue && (
        <p className="no-results">No movies found for "{inputValue}"</p>
      )}

      {list.length === 0 && !inputValue && !loadingList && (
        <p className="no-results">No movies available</p>
      )}
    </div>
  );
}

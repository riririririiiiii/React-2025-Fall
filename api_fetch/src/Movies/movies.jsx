import React, { useState } from "react";
import Card from '../Card/card'
import "./movies.css";

export default function MoviesList() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    async function loadMovies() {
        const res = await fetch("https://ghibliapi.vercel.app/films");
        const data = await res.json();
        setMovies(data);
    }
    
    //добавляеи хук useEffect
    useEffect(() => {
        loadMovies();
    }, []);

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedMovie) {
        return (
            <div className="movies-container">
                <button
                    className="load-btn"
                    onClick={() => setSelectedMovie(null)} // назад к списку
                >
                    Back to list
                </button>
                <Card movie={selectedMovie} />
            </div>
        );
    }
    return (
        <div className="movies-container">
            <h2>Studio Ghibli Movies</h2>
            <button className="load-btn" onClick={loadMovies}>
                Load movies
            </button>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                    <button className="search-btn"
                        onClick={() => setSearchTerm("")}>Clear</button>
                )}
            </div>
            <ul className="movies-list">
                {filteredMovies.map((movie) => (
                    <li
                        key={movie.id}
                        onClick={() => setSelectedMovie(movie)}
                        className="movie-item"
                    >
                        {movie.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}


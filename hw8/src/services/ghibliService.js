const BASE_URL = "https://ghibliapi.vercel.app/films";

export const ghibliService = {
  async getAllMovies() {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch movies");
    return await res.json();
  },

  async getMovieById(id) {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error("Movie not found");
    return await res.json();
  },

  async searchMovies(query) {
    const movies = await this.getAllMovies();
    return movies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
  }
};
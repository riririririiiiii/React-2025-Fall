const BASE_URL = "https://ghibliapi.vercel.app/films";

const checkOnlineStatus = async () => {
  if (!navigator.onLine) {
    throw new Error("You are offline. Please check your internet connection.");
  }
  return true;
};

const cacheResponse = async (url, data) => {
  if ('caches' in window) {
    try {
      const cache = await caches.open('ghibli-api-cache');
      const response = new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      });
      await cache.put(url, response);
    } catch (error) {
      console.warn('Failed to cache response:', error);
    }
  }
};

const getCachedResponse = async (url) => {
  if ('caches' in window) {
    try {
      const cache = await caches.open('ghibli-api-cache');
      const cachedResponse = await cache.match(url);
      if (cachedResponse) {
        const data = await cachedResponse.json();
        return { ...data, isCached: true };
      }
    } catch (error) {
      console.warn('Failed to get cached response:', error);
    }
  }
  return null;
};

export const ghibliService = {
  async getAllMovies() {
    const url = BASE_URL;
    
    try {
      await checkOnlineStatus();
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch movies");
      const data = await res.json();
      
      await cacheResponse(url, data);
      
      return data;
    } catch (error) {
      const cachedData = await getCachedResponse(url);
      if (cachedData) {
        return cachedData;
      }
      throw error;
    }
  },

  async getMovieById(id) {
    const url = `${BASE_URL}/${id}`;
    
    try {
      await checkOnlineStatus();
      const res = await fetch(url);
      if (!res.ok) throw new Error("Movie not found");
      const data = await res.json();
      
      await cacheResponse(url, data);
      
      return data;
    } catch (error) {
      const cachedData = await getCachedResponse(url);
      if (cachedData) {
        return cachedData;
      }
      throw error;
    }
  },

  async searchMovies(query) {
    const url = BASE_URL;
    
    try {
      await checkOnlineStatus();
      const movies = await this.getAllMovies();
      const filtered = movies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      
      await cacheResponse(`${url}?q=${query}`, filtered);
      
      return filtered;
    } catch (error) {
      const cachedData = await getCachedResponse(`${url}?q=${query}`);
      if (cachedData) {
        return cachedData;
      }
      throw error;
    }
  }
};
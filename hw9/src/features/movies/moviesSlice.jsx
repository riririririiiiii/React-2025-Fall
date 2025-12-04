import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ghibliService } from '../../services/ghibliService';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (query = '') => {
    if (query) {
      return await ghibliService.searchMovies(query);
    }
    return await ghibliService.getAllMovies();
  }
);

export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (id) => {
    return await ghibliService.getMovieById(id);
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    selectedMovie: null,
    loadingList: false,
    loadingMovie: false,
    errorList: null,
    errorMovie: null,
    query: '',
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
      state.errorMovie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.error.message;
      })
      // Fetch single movie cases
      .addCase(fetchMovieById.pending, (state) => {
        state.loadingMovie = true;
        state.errorMovie = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loadingMovie = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loadingMovie = false;
        state.errorMovie = action.error.message;
      });
  },
});

export const { setQuery, clearSelectedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
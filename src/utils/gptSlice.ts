import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "GPT",
  initialState: {
    showGptSearch: false,
    moviesName: [],
    moviesRecommendation: [],
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addRecommendedMovies: (state, action) => {
      state.moviesName = action.payload.moviesName;
      state.moviesRecommendation = action.payload.moviesRecommended;
    },
  },
});

export const { toggleGptSearchView, addRecommendedMovies } = gptSlice.actions;

export default gptSlice.reducer;

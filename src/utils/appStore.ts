import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
  },
});

const rootReducer = combineReducers({
  user: userReducer,
  movies: moviesReducer,
  // Add other reducers here if you have them
});

export type RootState = ReturnType<typeof rootReducer>;

export default appStore;

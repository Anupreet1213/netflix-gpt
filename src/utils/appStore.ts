import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: gptReducer,
    config: configReducer,
  },
});

const rootReducer = combineReducers({
  user: userReducer,
  movies: moviesReducer,
  gpt: gptReducer,
  config: configReducer,
  // Add other reducers here if you have them
});

export type RootState = ReturnType<typeof rootReducer>;

export default appStore;

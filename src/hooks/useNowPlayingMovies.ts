import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/appStore";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store: RootState) => store.movies.nowPlayingMovies
  );
  const getMovieData = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const jsonData = await data.json();
    dispatch(addNowPlayingMovies(jsonData?.results));
    // console.log(jsonData);
  };
  useEffect(() => {
    !nowPlayingMovies && getMovieData();
  }, []);
};

export default useNowPlayingMovies;

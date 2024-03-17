import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/appStore";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector(
    (store: RootState) => store.movies.nowPlayingMovies
  );
  const getMovieData = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      API_OPTIONS
    );
    const jsonData = await data.json();
    dispatch(addTopRatedMovies(jsonData?.results));
    // console.log(jsonData);
  };
  useEffect(() => {
    !topRatedMovies && getMovieData();
  }, []);
};

export default useTopRatedMovies;

import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/appStore";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector(
    (store: RootState) => store.movies.popularMovies
  );
  const getMovieData = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      API_OPTIONS
    );
    const jsonData = await data.json();
    dispatch(addPopularMovies(jsonData?.results));
    // console.log(jsonData);
  };
  useEffect(() => {
    !popularMovies && getMovieData();
  }, []);
};

export default usePopularMovies;

import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../utils/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/appStore";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector(
    (store: RootState) => store.movies.upcomingMovies
  );
  const getMovieData = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      API_OPTIONS
    );
    const jsonData = await data.json();
    dispatch(addUpcomingMovies(jsonData?.results));
    // console.log(jsonData);
  };
  useEffect(() => {
    !upcomingMovies && getMovieData();
  }, []);
};

export default useUpcomingMovies;

import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import { RootState } from "../utils/appStore";

const SecondaryContainer = () => {
  const movies = useSelector((store: RootState) => store.movies);
  //   console.log(movies);

  return (
    <div className="p-6 text-white -mt-[10rem] sm:-mt-38 flex flex-col gap-12">
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Popular"} movies={movies.popularMovies} />
      <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
      <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies} />
    </div>
  );
};

export default SecondaryContainer;

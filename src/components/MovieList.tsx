import MovieCard from "./MovieCard";

interface MovieListProps {
  movies:
    | { poster_path: null; original_title: null; overview: null; id: null }[]
    | null;
  title: string | null;
}

const MovieList: React.FC<MovieListProps> = ({ movies, title }) => {
  //   if (movies) {
  //     console.log(movies[0]);
  //   }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-white z-10 text-lg sm:text-2xl">{title}</h2>
      <div className="flex overflow-x-scroll gap-4 no-scrollbar z-10">
        {movies ? (
          movies.map((movie) => {
            return <MovieCard imgPathCode={movie.poster_path} />;
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MovieList;

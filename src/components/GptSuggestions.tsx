import { useSelector } from "react-redux";
import { RootState } from "../utils/appStore";
import MovieList from "./MovieList";

const GptSuggestions = () => {
  const { moviesName, moviesRecommendation } = useSelector(
    (store: RootState) => store.gpt
  );
  return (
    <div className="bg-black p-4 flex flex-col gap-4">
      {moviesRecommendation.map((movie: [], index: number) => {
        return <MovieList movies={movie} title={moviesName[index]} />;
      })}
    </div>
  );
};

export default GptSuggestions;

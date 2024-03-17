import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/appStore";
import lang from "../utils/langConstants";
import { useRef } from "react";
import { genAI } from "../utils/gemini";
import { API_OPTIONS } from "../utils/constants";
import { addRecommendedMovies } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector(
    (store: RootState) => store.config.lang
  ) as keyof typeof lang;
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const getMovieDetails = async (movie: string) => {
    const movieDetails = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await movieDetails.json();

    return json.results;
  };

  const handleGptSearch = () => {
    if (inputRef.current) {
      const gptQuery =
        "Act as a Movie Recommendation System and suggest some movies for the query: " +
        inputRef.current.value +
        ". Only give me names of 5 movies, comma separated like the example result given ahead. Example : Movie1, Movie2, Movie3, Movie4, Movie5  ";

      const callGemini = async () => {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = gptQuery;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const moviesArr = text.split(",");
        const movieDetailsPromise = moviesArr.map((eachMovie) =>
          getMovieDetails(eachMovie)
        );

        const movieDetails = await Promise.all(movieDetailsPromise);
        console.log(movieDetails);

        dispatch(
          addRecommendedMovies({
            moviesName: moviesArr,
            moviesRecommended: movieDetails,
          })
        );
      };
      callGemini();
    }
  };

  return (
    <div className="w-6/12 bg-black opacity-90 py-4 ">
      <form
        className="flex justify-center gap-4"
        action=""
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder={lang[langKey].placeholder}
          className="py-2 px-4 w-9/12"
          ref={inputRef}
        />
        <button
          className="bg-red-500 px-4 rounded-lg"
          onClick={handleGptSearch}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;

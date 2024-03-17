import GptSearchBar from "./GptSearchBar";
import GptSuggestions from "./GptSuggestions";

const GptSearchPage = () => {
  return (
    <div className="bg-login-bg h-screen bg-cover flex flex-col items-center pt-[45%] md:pt-[15%] gap-12">
      <GptSearchBar />
      <GptSuggestions />
    </div>
  );
};

export default GptSearchPage;

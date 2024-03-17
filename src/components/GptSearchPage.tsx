import GptSearchBar from "./GptSearchBar";
import GptSuggestions from "./GptSuggestions";

const GptSearchPage = () => {
  return (
    <div className="bg-login-bg h-screen bg-cover flex flex-col items-center pt-[10%] gap-12">
      <GptSearchBar />
      <GptSuggestions />
    </div>
  );
};

export default GptSearchPage;

import { useSelector } from "react-redux";
import { RootState } from "../utils/appStore";
import lang from "../utils/langConstants";

const GptSearchBar = () => {
  const langKey = useSelector(
    (store: RootState) => store.config.lang
  ) as keyof typeof lang;
  return (
    <div className="w-6/12 bg-black opacity-90 py-4 ">
      <form className="flex justify-center gap-4" action="">
        <input
          type="text"
          placeholder={lang[langKey].placeholder}
          className="py-2 px-4 w-9/12"
        />
        <button className="bg-red-500 px-4 rounded-lg">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;

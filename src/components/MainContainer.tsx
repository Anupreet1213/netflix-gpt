import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import { RootState } from "../utils/appStore";

const MainContainer = () => {
  const movies = useSelector(
    (store: RootState) => store.movies?.nowPlayingMovies
  );
  if (!movies) return;
  const { original_title, overview, id } = movies[0];
  console.log(movies[0]);

  return (
    <div className="relative">
      <VideoBackground id={id} />
      <VideoTitle original_title={original_title} overview={overview} />
    </div>
  );
};

export default MainContainer;

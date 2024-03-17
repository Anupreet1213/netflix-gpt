import { useSelector } from "react-redux";
import { RootState } from "../utils/appStore";
import useMovieTrailer from "../hooks/useMovieTrailer";

interface VideoBackgroundProps {
  id: number | null;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ id }) => {
  const trailerVideo = useSelector(
    (store: RootState) => store.movies.trailerVideo
  );

  useMovieTrailer(id);

  return (
    <div className="h-screen pt-[45%] sm:pt-0">
      <iframe
        className="aspect-video w-screen"
        src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&rel=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;

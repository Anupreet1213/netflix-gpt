import { FaPlay } from "react-icons/fa6";

interface VideoTitleProps {
  original_title: string;
  overview: string;
}

const VideoTitle: React.FC<VideoTitleProps> = ({
  original_title,
  overview,
}) => {
  return (
    <div className="flex flex-col gap-4 w-screen absolute top-0 text-white p-7 bg-gradient-to-r from-black aspect-video pl-8 justify-center">
      <h1 className="text-6xl font-bold">{original_title}</h1>
      <p className="text-lg sm:w-1/3 py-6">{overview}</p>
      <div className="flex gap-4 ">
        <button className="bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg flex items-center gap-2">
          <FaPlay /> <span>Play</span>
        </button>
        <button className="bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;

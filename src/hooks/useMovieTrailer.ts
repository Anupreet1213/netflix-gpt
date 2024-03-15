import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (id: number | null) => {
  const dispatch = useDispatch();

  const getVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      API_OPTIONS
    );
    const jsonData = await data.json();

    const filterData = jsonData.results.filter(
      (video: { type: string }) => video.type === "Trailer"
    );

    const trailer = filterData.length ? filterData[0] : jsonData[0];
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    getVideo();
  }, []);
};

export default useMovieTrailer;

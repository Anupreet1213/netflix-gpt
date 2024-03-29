import { POSTER_IMG } from "../utils/constants";

interface MovieCardProps {
  imgPathCode: string | null;
}

const MovieCard: React.FC<MovieCardProps> = ({ imgPathCode }) => {
  if (!imgPathCode) return null;

  return (
    <img
      className="w-[8rem] md:w-[12rem]"
      src={POSTER_IMG + imgPathCode}
      alt="Movie Card"
    />
  );
};

export default MovieCard;

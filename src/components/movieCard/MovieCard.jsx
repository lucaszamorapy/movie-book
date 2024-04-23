import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import ImageSkeleton from "../../utils/imageSkeleton/ImageSkeleton";
const imagesURL = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true }) => {
  return (
    <div className="flex flex-col shadow-lg">
      <ImageSkeleton src={imagesURL + movie.poster_path} alt={movie.title} />
      <div className="flex flex-col py-4 px-4 h-full rounded-b-lg bg-blueMovie100 text-black min-h-[100px]">
        <div className="flex justify-between">
          <h2 className="text-white">{movie.title}</h2>
          <div className="flex items-center gap-2 text-white">
            <FaStar color="#FFC700" /> {movie.vote_average}
          </div>
        </div>
        {showLink && (
          <Link to={`/movie/${movie.id}`}>
            <button className="bg-[#1B2440] tracking-widest uppercase font-semibold w-full text-white rounded-lg py-2 mt-5 hover:bg-[#090C16] duration-300 ease-in-out">
              Saber mais
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MovieCard;

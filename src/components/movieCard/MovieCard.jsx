import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
const imagesURL = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink }) => {
  return (
    <div className="flex flex-col shadow-lg">
      <img
        src={imagesURL + movie.poster_path}
        alt={movie.title}
        className="rounded-t-lg"
      />
      <div className="flex flex-col py-4 px-4  rounded-b-lg bg-blueMovie100 text-black min-h-[100px]">
        <div className="flex justify-between">
          <h2 className="text-white">{movie.title}</h2>
          <div className="flex items-center gap-2 text-white">
            <FaStar color="#FFC700" /> {movie.vote_average}
          </div>
        </div>
        {showLink && (
          <button className="bg-[#1B2440] tracking-widest text-white rounded-lg py-2 mt-5 hover:bg-[#090C16] duration-300 ease-in-out">
            <Link to={`/movie/${movie.id}`} className="uppercase font-semibold">
              Saber mais
            </Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;

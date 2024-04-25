import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import Loader from "../utils/loader/Loader";
import MovieCard from "../components/movieCard/MovieCard";
import ButtonBack from "../utils/buttonBack/ButtonBack";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const { request, loading } = useFetch();

  useEffect(() => {
    const getMovie = async (url) => {
      const { json } = await request(url);
      if (json) {
        setMovie(json); // Definir o filme como o objeto completo retornado pela API
      }
      console.log(json);
    };

    const movieUrl = `${moviesURL}${id}?${apiKey}`;
    getMovie(movieUrl);
  }, []);

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="container animeLeft">
        {movie ? (
          <>
            <div className="flex justify-center items-center gap-5">
              <ButtonBack />
              <h2 className="uppercase font-semibold text-4xl py-16">
                Detalhes do Filme: {movie.title}
              </h2>
            </div>
            <div className="flex flex-col gap-10 lg:grid lg:grid-cols-3">
              <MovieCard movie={movie} showLink={false} />
              <div className="flex gap-10 flex-col col-span-2">
                <div className="flex flex-col gap-5">
                  <h1 className="font-semibold text-greenMovie">Descrição:</h1>
                  <div className="flex items-center">
                    <span className="h-full border-l-2 px-4 border-greenMovie mr-2 font-normal text-white">
                      {movie.overview}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <h1 className="font-semibold text-greenMovie">Genêro:</h1>
                  <div className="h-full flex gap-2 items-center border-l-2 px-4 border-greenMovie mr-2 font-normal text-white">
                    {movie.genres.map((genre, index) => (
                      <p key={index}>{genre.name}</p>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <h1 className="font-semibold text-greenMovie">Orçamento:</h1>
                  <div className="h-full flex gap-2 items-center border-l-2 px-4 border-greenMovie mr-2 font-normal text-white">
                    <p>{formatCurrency(movie.budget)}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <h1 className="font-semibold text-greenMovie">Receita:</h1>
                  <div className="h-full flex gap-2 items-center border-l-2 px-4 border-greenMovie mr-2 font-normal text-white">
                    <p>{formatCurrency(movie.revenue)}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <h1 className="font-semibold text-greenMovie">
                    Tempo de duração:
                  </h1>
                  <div className="h-full flex gap-2 items-center border-l-2 px-4 border-greenMovie mr-2 font-normal text-white">
                    <p>{movie.runtime} minutos</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </section>
  );
};

export default MoviePage;

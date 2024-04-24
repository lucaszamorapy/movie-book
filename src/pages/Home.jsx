import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import MovieCard from "../components/movieCard/MovieCard";

import Search from "../utils/search/Search";
import Loader from "../utils/loader/Loader";
import Header from "../components/header/Header";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [topMovies, setTopMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [page, setPage] = useState(1);
  const { request } = useFetch();

  useEffect(() => {
    const getTopRatedMovies = async () => {
      const url = `${moviesURL}top_rated?${apiKey}&page=${page}`;
      const { json } = await request(url);
      if (json && json.results) {
        setTopMovies((topMovies) => {
          //topMovies é o valor anterior do useState, no caso array vazia []
          // Filtrar filmes para evitar repetição de IDs
          const uniqueMovies = json.results.filter(
            (movie) => !topMovies.some((topMovie) => topMovie.id === movie.id) //Quero que igual seja falso e o diferente seja true, por isso o !
          );
          return [...topMovies, ...uniqueMovies];
        });
        setFilteredMovies((topMovies) => {
          // Filtrar filmes para evitar repetição de IDs
          const uniqueMovies = json.results.filter(
            (movie) => !topMovies.some((topMovie) => topMovie.id === movie.id)
          );
          return [...topMovies, ...uniqueMovies];
        });
      }
    };

    getTopRatedMovies();
  }, [request, page]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    if (value.length === 1) {
      filterMoviesByInitial(value);
    } else {
      filterMovies(value);
    }
  };

  const filterMoviesByInitial = (initial) => {
    const filtered = topMovies.filter((movie) =>
      movie.title.toLowerCase().startsWith(initial.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const filterMovies = (term) => {
    const filtered = topMovies.filter((movie) =>
      movie.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <section className="mt-20 animeLeft">
      <Header />
      <div className="container">
        <div className="px-5 lg:px-0">
          <Search
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Pesquisar os melhores"
          />
        </div>
        {filteredMovies.length > 0 ? (
          <>
            {searchTerm.length === 0 && (
              <h2 className="uppercase px-5 font-semibold text-4xl text-center py-16 lg:px-0">
                Exibindo os melhores filmes da TMDB
              </h2>
            )}
            <div className="grid grid-cols-1 mt-10 gap-10 px-5 lg:px-0 lg:grid-cols-4">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            <div className="flex justify-center mt-5">
              <button
                onClick={handleLoadMore}
                className="bg-[#1B2440] tracking-widest uppercase font-semibold px-5 text-white rounded-lg py-2 mt-5 hover:bg-[#090C16] duration-300 ease-in-out"
              >
                Carregar Mais Filmes
              </button>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </section>
  );
};

export default Home;

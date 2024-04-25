import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import MovieCard from "../components/movieCard/MovieCard";

import Search from "../utils/search/Search";
import Loader from "../utils/loader/Loader";
import Header from "../components/header/Header";
import Select from "../utils/select/Select";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectTerm, setSelectTerm] = useState("");
  const [topMovies, setTopMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [page, setPage] = useState(1);
  const { request, loading, setLoading } = useFetch();

  useEffect(() => {
    const getTopRatedMovies = async () => {
      const url = `${moviesURL}top_rated?${apiKey}&page=${page}`;
      const { json } = await request(url);
      if (json && json.results) {
        setTopMovies((topMovies) => {
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

  const handleSelectChange = ({ target }) => {
    const value = target.value;
    setSelectTerm(value);
    filterMoviesBySelect(value);
  };

  const filterMoviesBySelect = (option) => {
    if (option !== "") {
      const sortedMovies = [...topMovies]; //Uma cópia da array topMovies, para ela não ser afetada
      if (option === "crescente") {
        sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
      } else if (option === "decrescente") {
        sortedMovies.sort((a, b) => b.title.localeCompare(a.title));
      }
      setFilteredMovies(sortedMovies);
    } else {
      setFilteredMovies(topMovies);
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
    setLoading(true);
    setPage(page + 1);
  };

  return (
    <section className="mt-10 animeLeft px-5 lg:px-0">
      <Header />
      <div className="container">
        <div className="flex justify-center items-center flex-col gap-5 lg:flex-row">
          <Search
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Pesquisar os melhores"
          />
          <Select value={selectTerm} onChange={handleSelectChange} />
        </div>
        {filteredMovies.length > 0 ? (
          <>
            <h2 className="uppercase font-semibold text-4xl text-center py-16">
              Exibindo os melhores filmes da TMDB
            </h2>
            <div className="grid grid-cols-1 mt-10 gap-10 lg:grid-cols-4">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            <div className="flex justify-center mt-5">
              {loading ? (
                <Loader />
              ) : (
                <button
                  onClick={handleLoadMore}
                  className="bg-[#1B2440] tracking-widest uppercase font-semibold px-5 text-white rounded-lg py-2 mt-5 hover:bg-[#090C16] duration-300 ease-in-out"
                >
                  Carregar Mais Filmes
                </button>
              )}
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

import React, { useEffect, useState } from "react";
import MovieCard from "../components/movieCard/MovieCard";
import Search from "../utils/search/Search";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "../utils/loader/Loader";
import Header from "../components/header/Header";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const query = searchParams.get("q");
  const { loading, request } = useFetch();

  useEffect(() => {
    const getSearchMovies = async () => {
      const searchQueryURL = `${searchURL}?${apiKey}&query=${query}`;
      const { json } = await request(searchQueryURL);
      if (json && json.results) {
        setMovies(json.results);
        setFilteredMovies(json.results);
      }
    };

    getSearchMovies();
  }, [query]); // Agora a chamada da API será feita toda vez que 'query' mudar

  const handleSearchChange = (value) => {
    //Pegando o value do handleInputChange, para se tornar reativo e filtrado
    setSearchTerm(value);
    if (value.length === 1) {
      filterMoviesByInitial(value);
    } else {
      filterMovies(value);
    }
  };

  const filterMoviesByInitial = (initial) => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().startsWith(initial.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const filterMovies = (term) => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  return (
    <section className="mt-20 animeLeft">
      <Header />
      <div className="container">
        <div className="px-5 lg:px-0">
          <Search
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Pesquise os filmes"
          />
        </div>
        <h1 className="text-center px-5 text-3xl py-10 lg:px-0">
          Exibindo resultados para {query}
        </h1>
        {loading && (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        )}
        <div className="grid grid-cols-1 mt-10 gap-10 px-5 lg:px-0 lg:grid-cols-4">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} showLink={true} />
          ))}
        </div>
        {filteredMovies.length === 0 && !loading && (
          <p className="text-center mt-8">Nenhum resultado encontrado.</p>
        )}
      </div>
    </section>
  );
};

export default SearchPage;

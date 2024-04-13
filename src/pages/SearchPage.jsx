import React, { useEffect, useState } from "react";
import MovieCard from "../components/movieCard/MovieCard";
import Search from "../utils/search/Search";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "../utils/loader/Loader";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");
  const { loading, request } = useFetch();

  useEffect(() => {
    const getSearchMovies = async () => {
      const searchQueryURL = `${searchURL}?${apiKey}&query=${query}`;
      const { json } = await request(searchQueryURL);
      if (json && json.results) {
        setMovies(json.results);
      }
    };

    getSearchMovies();
  }, [query]); // Agora a chamada da API será feita toda vez que 'query' mudar

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  return (
    <section>
      {loading && <Loader />}
      <div className="container">
        <div className="px-5 lg:px-0">
          <Search
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Pesquise os filmes"
          />
        </div>
        <h1 className="text-center text-3xl py-10">
          Exibindo resultados para {query}
        </h1>
        <div className="grid grid-cols-1 mt-10 gap-10 px-5 lg:px-0 lg:grid-cols-3">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} showLink={true} />
          ))}
        </div>
        {movies.length === 0 && (
          <p className="text-center text-gray-500 py-52">
            <Loader />
          </p>
        )}
      </div>
    </section>
  );
};

export default SearchPage;

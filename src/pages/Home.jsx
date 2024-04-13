import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import MovieCard from "../components/movieCard/MovieCard";

import Search from "../utils/search/Search";
import Loader from "../utils/loader/Loader";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [topMovies, setTopMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const { request } = useFetch();

  useEffect(() => {
    const getTopRatedMovies = async (url) => {
      const { json } = await request(url);
      if (json && json.results) {
        setTopMovies(json.results);
        setFilteredMovies(json.results);
      }
    };

    const topRatedUrl = `${moviesURL}top_rated?${apiKey}`;
    getTopRatedMovies(topRatedUrl);
  }, []);

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

  return (
    <section>
      <div className="container">
        <div className="px-5 lg:px-0">
          <Search
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Pesquisar os melhores "
          />
        </div>
        {searchTerm.length === 0 && (
          <h2 className="uppercase px-5 font-semibold text-4xl text-center py-16 lg:px-0">
            Exibindo os melhores filmes da TMDB
          </h2>
        )}
        <div className="grid grid-cols-1 mt-10 gap-10 px-5 lg:px-0 lg:grid-cols-3">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        {filteredMovies.length === 0 && <Loader />}
      </div>
    </section>
  );
};

export default Home;

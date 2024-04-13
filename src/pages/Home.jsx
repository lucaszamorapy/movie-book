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
  const { loading, error, request } = useFetch();

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
      {loading && <Loader />}
      <div className="container">
        <div className="px-5 lg:px-0">
          <Search
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Pesquisar os melhores "
          />
        </div>
        <div className="grid grid-cols-1 mt-40 gap-10 px-5 lg:px-0 lg:grid-cols-3">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} showLink={true} />
          ))}
        </div>
        {filteredMovies.length === 0 && (
          <p className="text-center text-gray-500 py-52">
            Nenhum dos melhores filmes encontrados.
          </p>
        )}
      </div>
    </section>
  );
};

export default Home;

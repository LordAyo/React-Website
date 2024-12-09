import React, { useEffect, useState } from "react";
import axios from "axios";
import { Movie, Genre } from "../types/Movie";
import MovieCard from "../components/MovieCard";
import GenreFilter from "../components/GenreFilter";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie`,
      {
        params: {
          api_key: "6acc04b6670a782c34026382251189e6",
          page: currentPage,
          with_genres: selectedGenre || undefined,
          query: searchQuery || undefined,
        },
      }
    );
    setMovies(response.data.results);
    setTotalPages(response.data.total_pages);
  };

  const fetchGenres = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list`,
      {
        params: { api_key: "6acc04b6670a782c34026382251189e6" },
      }
    );
    setGenres(response.data.genres);
  };

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, [selectedGenre, searchQuery, currentPage]);

  return (
    <div>
      <SearchBar onSearch={setSearchQuery} />
      <GenreFilter
        genres={genres}
        selectedGenre={selectedGenre}
        onSelectGenre={setSelectedGenre}
      />
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Home;

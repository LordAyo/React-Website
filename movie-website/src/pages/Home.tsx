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
  const [isSearching, setIsSearching] = useState(false);

  const API_KEY = "6acc04b6670a782c34026382251189e6";

  const fetchMovies = async () => {
    try {
      const url = isSearching
        ? `https://api.themoviedb.org/3/search/movie`
        : `https://api.themoviedb.org/3/discover/movie`;

      const params = isSearching
        ? {
            api_key: API_KEY,
            query: searchQuery,
            page: currentPage,
          }
        : {
            api_key: API_KEY,
            page: currentPage,
            with_genres: selectedGenre || undefined,
          };

      const response = await axios.get(url, { params });
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list`,
        {
          params: { api_key: API_KEY },
        }
      );
      setGenres(response.data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [currentPage, selectedGenre, isSearching, searchQuery]);

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      // Reset to default state when search is cleared
      setSearchQuery("");
      setCurrentPage(1);
      setIsSearching(false);
      setSelectedGenre(null);
    } else {
      // Perform search
      setSearchQuery(query);
      setCurrentPage(1);
      setIsSearching(true);
    }
  };

  const handleGenreChange = (genreId: number | null) => {
    setSelectedGenre(genreId);
    setCurrentPage(1);
    setIsSearching(false);
    setSearchQuery(""); // Clear the search query
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <GenreFilter
        genres={genres}
        selectedGenre={selectedGenre}
        onSelectGenre={handleGenreChange}
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

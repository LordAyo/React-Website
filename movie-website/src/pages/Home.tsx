import React, { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "../types/Movie";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("popularity.desc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list`,
          {
            params: { api_key: "6acc04b6670a782c34026382251189e6" },
          }
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  // Fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        
        // Use search endpoint if there's a search query
        const endpoint = searchQuery
          ? "https://api.themoviedb.org/3/search/movie"
          : "https://api.themoviedb.org/3/discover/movie";

        const response = await axios.get(endpoint, {
          params: {
            api_key: "6acc04b6670a782c34026382251189e6",
            page: currentPage,
            ...(searchQuery
              ? { query: searchQuery }
              : {
                  with_genres: selectedGenre || undefined,
                  primary_release_year: selectedYear || undefined,
                  sort_by: sortBy,
                }),
          },
        });

        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setIsLoading(false);
      }
    };

    // Add debounce for search queries
    const timeoutId = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [selectedGenre, selectedYear, sortBy, searchQuery, currentPage]);

  // Handle pagination
  const handlePagination = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0); // Scroll to top when changing pages
  };

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedGenre, selectedYear, sortBy]);

  return (
    <div className="home-page container">
      {/* About Section */}
      <section className="about-section">
        <h1 className="about-title">Welcome to Movie Hub</h1>
        <p className="about-description">
          Dive into the world of entertainment! At Movie Hub, we bring you the latest trending movies and curated collections to help you decide what to watch next. Explore genres, search for hidden gems, and stay up-to-date with the most popular releases. Let us be your guide in the cinematic universe!
        </p>
      </section>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <select
          onChange={(e) => setSelectedGenre(Number(e.target.value))}
          value={selectedGenre || ""}
          disabled={!!searchQuery}
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          disabled={!!searchQuery}
        />
        <select 
          onChange={(e) => setSortBy(e.target.value)} 
          value={sortBy}
          disabled={!!searchQuery}
        >
          <option value="popularity.desc">Most Popular</option>
          <option value="vote_average.desc">Highest Rated</option>
          <option value="primary_release_date.desc">Latest</option>
        </select>
      </div>

      {/* Movie List */}
      {isLoading ? (
        <p>Loading...</p>
      ) : movies.length > 0 ? (
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>No movies found</p>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePagination}
      />
    </div>
  );
};

export default Home;
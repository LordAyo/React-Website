import React, { useEffect, useState } from "react";

const Discover: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("popularity.desc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=6acc04b6670a782c34026382251189e6&language=en-US"
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const query = `https://api.themoviedb.org/3/discover/movie?api_key=6acc04b6670a782c34026382251189e6&language=en-US&page=${currentPage}&sort_by=${sortBy}&with_genres=${selectedGenre}&primary_release_year=${selectedYear}&query=${searchQuery}`;
        const response = await fetch(query);
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [selectedGenre, selectedYear, sortBy, currentPage, searchQuery]);

  const handlePagination = (direction: "next" | "prev") => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="discover-page container">
      <h1 className="page-title">Discover Movies</h1>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select onChange={(e) => setSelectedGenre(e.target.value)} value={selectedGenre}>
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
        />
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="popularity.desc">Most Popular</option>
          <option value="vote_average.desc">Highest Rated</option>
          <option value="primary_release_date.desc">Latest</option>
        </select>
      </div>

      {/* Movies */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="movies-grid">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
                <p>{new Date(movie.release_date).getFullYear()}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePagination("prev")}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePagination("next")}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discover;

// WatchList.tsx
import React from "react";
import { Movie } from "../types/Movie";
import MovieCard from "../components/MovieCard";

const WatchList: React.FC = () => {
  // Get movies from localStorage
  const getSavedMovies = (): Movie[] => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  };

  const [watchlist, setWatchlist] = React.useState<Movie[]>(getSavedMovies);

  const removeFromWatchlist = (movieId: number) => {
    const updatedList = watchlist.filter((movie) => movie.id !== movieId);
    setWatchlist(updatedList);
    localStorage.setItem("watchlist", JSON.stringify(updatedList));
  };

  return (
    <div className="container">
      <section className="about-section">
        <h1 className="about-title">My Watch List</h1>
        <p className="about-description">
          Keep track of movies you want to watch later. Your watchlist is saved locally
          and will persist even after closing the browser.
        </p>
      </section>

      {watchlist.length > 0 ? (
        <div className="movie-list">
          {watchlist.map((movie) => (
            <div key={movie.id} className="watchlist-item">
              <MovieCard movie={movie} />
              <button 
                onClick={() => removeFromWatchlist(movie.id)}
                className="remove-button"
              >
                Remove from Watchlist
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-watchlist">
          <h2>Your watchlist is empty</h2>
          <p>Start adding movies to keep track of what you want to watch!</p>
        </div>
      )}
    </div>
  );
};

export default WatchList;
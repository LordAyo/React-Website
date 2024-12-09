import React, { useState } from "react";
import ReactModal from "react-modal";
import { Movie } from "../types/Movie";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState<boolean>(() => {
    const watchlist = localStorage.getItem("watchlist");
    if (watchlist) {
      const movies = JSON.parse(watchlist);
      return movies.some((m: Movie) => m.id === movie.id);
    }
    return false;
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    const watchlist = localStorage.getItem("watchlist");
    let movies = watchlist ? JSON.parse(watchlist) : [];

    if (isInWatchlist) {
      movies = movies.filter((m: Movie) => m.id !== movie.id);
    } else {
      movies.push(movie);
    }

    localStorage.setItem("watchlist", JSON.stringify(movies));
    setIsInWatchlist(!isInWatchlist);
  };

  return (
    <div>
      <div className="movie-card" onClick={handleOpenModal}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.png'; // You should add a placeholder image
          }}
        />
        <div className="movie-card-content">
          <h3 title={movie.title}>{movie.title}</h3>
          <div className="movie-card-footer">
            <p>{new Date(movie.release_date).getFullYear()}</p>
            <button 
              onClick={toggleWatchlist}
              className={`watchlist-button ${isInWatchlist ? 'in-watchlist' : ''}`}
            >
              {isInWatchlist ? '★ In Watchlist' : '☆ Add to Watchlist'}
            </button>
          </div>
        </div>
      </div>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Movie Details"
        className="movie-modal"
        overlayClassName="movie-modal-overlay"
        ariaHideApp={false}
      >
        <button onClick={handleCloseModal} className="close-modal-button">
          &times;
        </button>
        <h2>{movie.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
          alt={movie.title}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.png';
          }}
        />
        <p><strong>Overview:</strong> {movie.overview}</p>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Rating:</strong> {movie.vote_average}/10</p>
        <p><strong>Language:</strong> {movie.original_language.toUpperCase()}</p>
        <p><strong>Popularity:</strong> {movie.popularity}</p>
      </ReactModal>
    </div>
  );
};

export default MovieCard;
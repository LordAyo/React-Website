import React, { useState } from "react";
import ReactModal from "react-modal";
import { Movie } from "../types/Movie";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Movie Card */}
      <div className="movie-card" onClick={handleOpenModal}>
        <img
          src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
          alt={movie.title}
        />
        <h3>{movie.title}</h3>
        <p>{new Date(movie.release_date).getFullYear()}</p>

      </div>

      {/* Modal */}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Movie Details"
        className="movie-modal"
        overlayClassName="movie-modal-overlay"
        ariaHideApp={false}
      >
        <div className="movie-modal-content">
          <button onClick={handleCloseModal} className="close-modal-button">
            &times;
          </button>
          <h2>{movie.title}</h2>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            alt={movie.title}
          />
          <p><strong>Overview:</strong> {movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average}/10</p>
          <p><strong>Language:</strong> {movie.original_language.toUpperCase()}</p>
          <p><strong>Popularity:</strong> {movie.popularity}</p>
        </div>
      </ReactModal>
    </div>
  );
};

export default MovieCard;

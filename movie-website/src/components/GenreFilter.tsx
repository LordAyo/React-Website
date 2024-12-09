import React from "react";
import { Genre } from "../types/Movie";

interface GenreFilterProps {
  genres: Genre[];
  selectedGenre: number | null;
  onSelectGenre: (genreId: number | null) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({
  genres,
  selectedGenre,
  onSelectGenre,
}) => {
  return (
    <div className="genre-filter">
      {/* All Button */}
      <button
        className={selectedGenre === null ? "active" : ""}
        onClick={() => onSelectGenre(null)} // Set to null for "All"
      >
        All
      </button>

      {/* Genre Buttons */}
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={selectedGenre === genre.id ? "active" : ""}
          onClick={() => onSelectGenre(genre.id)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;

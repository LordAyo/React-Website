export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path?: string;
    overview: string;
    release_date: string;
    vote_average: number;
    popularity: number;
    original_language: string;
    runtime?: number; // Optional, depending on the API response
    genres?: { id: number; name: string }[]; // Optional, depending on the API response
  }
  
  
  export interface Genre {
    id: number;
    name: string;
  }
  
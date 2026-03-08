import axios from "axios";
import type { Movie } from "../types/movie";

// Визначаємо інтерфейс відповіді тут, а не імпортуємо його
export interface FetchMoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

export const fetchMovies = async (query: string, page: number = 1): Promise<FetchMoviesResponse> => {
  const response = await axios.get<FetchMoviesResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`, 
      },
    }
  );

  return response.data;
};
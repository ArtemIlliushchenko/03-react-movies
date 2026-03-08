import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { Toaster, toast } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import css from './App.module.css';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

import type { Movie, FetchMoviesResponse } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';

function App() {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Явно вказуємо типи <FetchMoviesResponse, Error> для useQuery
  const { data, isLoading, isError, isSuccess } = useQuery<FetchMoviesResponse, Error>({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== '',
    // У версії v5 keepPreviousData переїхав сюди:
    placeholderData: keepPreviousData, 
  });

  const movies = data?.results ?? [];

  useEffect(() => {
    if (isSuccess && query !== '' && movies.length === 0) {
      toast.error('No movies found for your request.');
    }
  }, [isSuccess, movies.length, query]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setSelectedMovie(null);
  };

  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const PaginateComponent = (ReactPaginate as unknown as { default?: typeof ReactPaginate }).default || ReactPaginate;

  return (
    <div className={css.app}>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />
      
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      
      {movies.length > 0 && (
        <>
          <MovieGrid movies={movies} onSelect={setSelectedMovie} />
          
          <PaginateComponent
            previousLabel={'←'}
            nextLabel={'→'}
            breakLabel={'...'}
            pageCount={data?.total_pages ?? 0}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            forcePage={page - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
          />
        </>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default App;
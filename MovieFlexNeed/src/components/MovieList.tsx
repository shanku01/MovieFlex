import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  FlatList,
  ActivityIndicator,
  TextInput,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { getMovies, getGenres, searchMovies } from '../services/api';
import MovieCard from './MovieCard';
import GenreFilter from './GenreFilter';
import { Movie } from '../types/movie';
import { Genre } from '../types/genre';
import { MovieResponse } from '../types/api';
import { AxiosResponse } from 'axios';

const MOVIES_PER_YEAR = 20;
const PAGE_LIMIT = 4;

interface SectionData {
  title: string;
  data: Movie[];
}

const MovieList: React.FC = () => {
  const [moviesByYear, setMoviesByYear] = useState<{ [key: number]: Movie[] }>({});
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [year, setYear] = useState<number>(2012);
  const [genres, setGenres] = useState<{ [key: number]: string }>({});
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [searchPage, setSearchPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [genresError, setGenresError] = useState<boolean>(false);
  const [moviesError, setMoviesError] = useState<boolean>(false);
  const pagesQueue = useRef<number[]>([]);

  useEffect(() => {
    getGenres()
      .then((response: AxiosResponse<{ genres: Genre[] }>) => {
        const genreMap = response.data.genres.reduce((acc: { [key: number]: string }, genre: Genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});
        setGenres(genreMap);
        setGenresError(false);
      })
      .catch(() => {
        setGenresError(true);
      });
  }, []);

  useEffect(() => {
    if (loading || isSearch) return;

    setLoading(true);

    const fetchMovies = async () => {
      try {
        let response: AxiosResponse<MovieResponse>;

        if (isSearch && searchTerm) {
          response = await searchMovies(searchTerm, searchPage);
          const data: MovieResponse = response.data;
          setSearchResults(prevResults => {
            const newResults = data.results;
            const uniqueResults = Array.from(new Map([...prevResults, ...newResults].map(movie => [movie.id, movie])).values());
            return uniqueResults;
          });
          setSearchLoading(false);
        } else {
          response = await getMovies(year, page);
          const data: MovieResponse = response.data;
          const newMovies: Movie[] = data.results;

          setMoviesByYear(prevMovies => {
            const existingMovies = prevMovies[year] || [];
            const updatedMovies = [...existingMovies, ...newMovies];
            const uniqueMovies = Array.from(new Map(updatedMovies.map(movie => [movie.id, movie])).values());
            
            if (pagesQueue.current.length >= PAGE_LIMIT) {
              const oldestYear = pagesQueue.current.shift();
              if (oldestYear !== undefined) {
                const updatedMoviesByYear = { ...prevMovies };
                delete updatedMoviesByYear[oldestYear];
                return {
                  ...updatedMoviesByYear,
                  [year]: uniqueMovies.slice(0, MOVIES_PER_YEAR)
                };
              }
            }

            pagesQueue.current.push(year);

            return {
              ...prevMovies,
              [year]: uniqueMovies.slice(0, MOVIES_PER_YEAR)
            };
          });
          setMoviesError(false);
        }
      } catch {
        setMoviesError(true);
      } finally {
        setLoading(false);
        setSearchLoading(false);
      }
    };

    fetchMovies();
  }, [year, page, searchTerm, searchPage, isSearch, selectedGenres]);

  const handleGenreChange = (id: number) => {
    setSelectedGenres(prevGenres => prevGenres.includes(id) ? prevGenres.filter(genreId => genreId !== id) : [...prevGenres, id]);
  };

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    setSearchPage(1);
    setIsSearch(true);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const direction = contentOffset.y > layoutMeasurement.height ? 'down' : 'up';

    if (direction !== scrollDirection) {
      setScrollDirection(direction);

      if (direction === 'down' && !isSearch) {
        if (year < new Date().getFullYear()) {
          setYear(prevYear => prevYear + 1);
        }
      } else if (direction === 'up' && !isSearch) {
        if (year > 2012) {
          setYear(prevYear => prevYear - 1);
        }
      }
    }
  };

  const loadMore = useCallback(() => {
    if (loading || searchLoading) return;

    if (isSearch) {
      setSearchPage(prevPage => prevPage + 1);
    } else {
      setPage(prevPage => prevPage + 1);
    }
  }, [loading, searchLoading, isSearch]);

  const renderSectionHeader = ({ section }: { section: SectionData }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  const renderMovieCard = ({ item }: { item: Movie }) => (
    <MovieCard
      movie={item}
      genres={genres}
    />
  );

  const renderSection = ({ section }: { section: SectionData }) => (
    <FlatList
      data={section.data}
      renderItem={renderMovieCard}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.listContainer}
    />
  );

  const sections: SectionData[] = isSearch
    ? [{ title: 'Search Results', data: searchResults }]
    : Object.entries(moviesByYear).map(([year, movies]) => ({
        title: year,
        data: movies
      }));

  return (
    <View style={styles.container}>
      {Object.keys(genres).length > 0 && !genresError && (
        <View style={styles.header}>
          <GenreFilter
            genres={Object.entries(genres).map(([id, name]) => ({ id: Number(id), name }))}
            selectedGenres={selectedGenres}
            onGenreChange={handleGenreChange}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search movies..."
            value={searchTerm}
            onChangeText={handleSearch}
          />
        </View>
      )}
      {!moviesError && sections.length > 0 ? (
        <SectionList
          sections={sections.sort((a, b) => parseInt(a.title) - parseInt(b.title))}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderSection}
          ListFooterComponent={loading || searchLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          onScroll={handleScroll}
        />
      ) : (
        !moviesError && <Text style={styles.noDataText}>No movies available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d2e2e',
  },
  header: {
    backgroundColor: '#2d2e2e',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  sectionHeader: {
    padding: 10,
    backgroundColor: '#333',
  },
  sectionHeaderText: {
    fontSize: 18,
    color: '#fff',
  },
  listContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  noDataText: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default MovieList;

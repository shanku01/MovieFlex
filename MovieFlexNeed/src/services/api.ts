import axios, { AxiosResponse } from 'axios';
import { MovieResponse } from '../types/api';
import { GenreResponse } from '../types/genre';
import { MovieDetails } from '../types/movie';

const API_KEY = '2dca580c2a14b55200e784d157207b4d';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getMovies = (year: number, page: number = 1): Promise<AxiosResponse<MovieResponse>> =>
  axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      sort_by: 'popularity.desc',
      primary_release_year: year,
      vote_count: { gte: 100 },
      page,
    },
  });

export const getGenres = (): Promise<AxiosResponse<GenreResponse>> =>
  axios.get(`${BASE_URL}/genre/movie/list`, {
    params: { api_key: API_KEY },
  });

export const getMovieDetails = (movieId: number): Promise<AxiosResponse<MovieDetails>> =>
  axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: { api_key: API_KEY, append_to_response: 'credits' },
  });

export const searchMovies = async (query: string, page: number): Promise<AxiosResponse<MovieResponse>> => {
  const response = await axios.get<MovieResponse>(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
      page,
      vote_count_gte: 100,
    },
  });
  return response;
};

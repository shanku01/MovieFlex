

export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    genre_ids: number[];
    overview: string;
    vote_average: number;
    release_date: string;
  }
  
  export interface MovieDetails {
    id: number;
    title: string;
    poster_path: string;
    genre_ids: number[];
    overview: string;
    vote_average: number;
    release_date: string;
    credits: {
      cast: {
        name: string;
      }[];
      crew: {
        job: string;
        name: string;
      }[];
    };
  }
  
  export interface MovieResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }
  
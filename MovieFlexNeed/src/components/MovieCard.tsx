
import React, { memo, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getMovieDetails } from '../services/api';
import { MovieDetails } from '../types/movie';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    genre_ids: number[];
    overview: string;
    vote_average: number;
    release_date: string;
  };
  genres: { [key: number]: string };
}

const MovieCard: React.FC<MovieCardProps> = memo(({ movie, genres }) => {
  const [details, setDetails] = useState<{ cast: string; director?: string } | null>(null);

  useEffect(() => {
    getMovieDetails(movie.id).then(response => {
      const cast = response.data.credits.cast.map(member => member.name).join(', ');
      const director = response.data.credits.crew.find(member => member.job === 'Director')?.name;
      setDetails({ cast, director });
    });
  }, [movie.id]);

  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{movie.title}</Text>
        <Text style={styles.releaseDate}>Release Date: {movie.release_date}</Text>
        <View style={styles.genresContainer}>
          {movie.genre_ids.map(id => (
            <Text key={id} style={styles.genreBadge}>{genres[id]}</Text>
          ))}
        </View>
        <Text style={styles.rating}>Rating: {movie.vote_average}</Text>
        {details && (
          <>
            <Text style={styles.cast} numberOfLines={1} ellipsizeMode="tail">Cast: {details.cast}</Text>
            <Text style={styles.director} numberOfLines={1} ellipsizeMode="tail">Director: {details.director || 'Unknown'}</Text>
          </>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    borderRadius: 15,
    overflow: 'hidden',
    flex: 1,
    height: 300,
    margin: 5
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  info: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flexDirection: "column",
    justifyContent:"flex-end"
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  releaseDate: {
    fontSize: 12,
    color: '#fff',
    marginTop: 3,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 3,
  },
  genreBadge: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 6,
    margin: 2,
    fontSize: 10,
    color: '#333',
  },
  rating: {
    fontSize: 12,
    color: '#fff',
    marginTop: 3,
  },
  cast: {
    fontSize: 12,
    color: '#fff',
    marginTop: 3,
  },
  director: {
    fontSize: 12,
    color: '#fff',
    marginTop: 3,
  },
});

export default MovieCard;

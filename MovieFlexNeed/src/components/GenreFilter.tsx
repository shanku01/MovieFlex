import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Genre } from '../types/genre';

interface GenreFilterProps {
  genres: Genre[];
  selectedGenres: number[];
  onGenreChange: (id: number) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ genres, selectedGenres, onGenreChange }) => {
  const renderItem = ({ item }: { item: Genre }) => (
    <TouchableOpacity
      style={[
        styles.filterItem,
        selectedGenres.includes(item.id) && styles.selectedFilterItem,
      ]}
      onPress={() => onGenreChange(item.id)}
    >
      <Text style={styles.filterText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={genres}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    marginTop: -1
  },
  filterContainer: {
    backgroundColor: "#2d2e2e",
    paddingVertical: 10, 
    paddingHorizontal: 20
  },
  filterItem: {
    backgroundColor: '#505050',
    paddingVertical: 8,
    paddingHorizontal: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center', 
    minWidth: 80,
    height: 32,
    borderRadius: 10
  },
  selectedFilterItem: {
    backgroundColor: '#EA2027',
  },
  filterText: {
    color: '#FAF9F6',
    fontSize: 12,
  },
});

export default GenreFilter;

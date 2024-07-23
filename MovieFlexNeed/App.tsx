import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import MovieList from './src/components/MovieList';
import Header from './src/components/Header';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <MovieList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  }
});

export default App;

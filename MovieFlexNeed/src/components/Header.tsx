import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header: React.FC = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>MovieFlex</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#2d2e2e',
    padding: 10,
    paddingHorizontal:20,
    paddingBottom:0,
    borderBottomWidth: 1,
    alignItems: 'flex-start',
  },
  headerText: {
    color: 'rgb(229,9,20)', 
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'left',
  },
});

export default Header;

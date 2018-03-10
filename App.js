import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Tabs } from './Router';

const App = () => {
  return (
    <Tabs style={styles.container} />
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100
  },
});

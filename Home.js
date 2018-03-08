import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: 'darkviolet', fontSize: 32, alignSelf: 'center'}}>
          Sarah's
        </Text>
        <Text style={{color: 'darkviolet', fontSize: 32, alignSelf: 'center'}}>
          Interval Timer!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

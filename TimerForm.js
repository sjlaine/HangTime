import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import db from './firebase';

export default class TimerForm extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount () {
    const rootRef = db.ref().child('timerHolder');
    const timerRef = rootRef.child('timerOne');
    timerRef.on('value', (snapshot) => {
      this.setState({time: snapshot.val()['0'].duration});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          {this.state.time}
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


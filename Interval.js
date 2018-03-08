import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

export default class Interval extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayTime: null,
      isClicked: false
    };
  }

  componentDidMount() {

    this.startFrame(10000)
  }

  startFrame = (duration) => {
    this.duration = duration
    requestAnimationFrame(this.frame)
  }

  frame = (currentTime) => {
    if (!this.endTime) this.endTime = currentTime + this.duration
    const timeRemaining = this.endTime - currentTime
    this.setState({timeRemaining});
    if (this.state.timeRemaining > 0) {
      requestAnimationFrame(this.frame)
    }
  }

  render() {
    const color = this.state.isClicked ? 'darkviolet' : 'magenta';

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => this.setState({isClicked: !this.state.isClicked})}>
          <View>
            <Text style={{color, fontSize: 64}}>
              {(this.state.timeRemaining / 1000).toFixed(2)}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

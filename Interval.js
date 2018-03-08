import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 3,
      isClicked: false
    };
  }

  componentDidMount() {
    const intervals = [2, 1, 3, 2, 3];

    window.setInterval(() => {
      if (this.state.count > 0 && !this.state.isClicked) {
        this.setState({count: this.state.count - 1});
      } else if (!this.state.isClicked) {
          this.setState({count: intervals[0]});
          intervals.shift();
      }
      if (!intervals.length) {
        this.setState({count: 'You finished!'});
      }
    }, 1000);

  }


  render() {
    const color = this.state.isClicked ? 'darkviolet' : 'magenta';

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => this.setState({isClicked: !this.state.isClicked})}>
          <View>
            <Text style={{color, fontSize: 64}}>
              {this.state.count}
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

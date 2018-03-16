import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Button } from 'react-native';
import { intervals } from './TimerOne';
import db from './firebase';

export default class Interval extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayTime: null,
      isClicked: false
    };
  }

  componentDidMount = () => {
    let myTimer;

    return db.ref('timer/').once('value').then(function(snapshot) {
      return snapshot.val();
    })
    .then(value => this.setState({intervals: value}))
  }

  handleStart = () => {
    this.setState({begin: true})
    this.startFrame(this.state.intervals[0].duration * 1000);
  }

  startFrame = (duration) => {
    this.duration = duration
    requestAnimationFrame(this.frame);
  }

  frame = (currentTime) => {

      if (!this.endTime && !this.state.isClicked) this.endTime = currentTime + this.duration;
        const timeRemaining = this.endTime - currentTime;
        this.setState({timeRemaining});
      if (this.state.timeRemaining > 0 && !this.state.isClicked) {
        requestAnimationFrame(this.frame)
      }
      if (this.state.timeRemaining <= 0 && !this.state.isClicked) {
        this.setState({timeRemaining: 0})
      }

      if(!this.state.timeRemaining && !this.state.isClicked) {
        let newTime = this.state.intervals.length ? this.state.intervals[0].duration : 0;
        window.setTimeout(() => {
          this.setState({timeRemaining: newTime * 1000});
          this.endTime = null;
          this.startFrame(this.state.timeRemaining);
          this.setState({intervals: this.state.intervals.slice(1)});
        }, 100);
      }

      if (isNaN(this.state.timeRemaining) && !this.state.intervals.length && this.state.begin) {
        this.setState({timeRemaining: 0})
      }
  }

  handlePause = () => {
    if(!this.isClicked) {
      if (this.state.timeRemaining > 0) {
        this.startFrame(this.state.timeRemaining);
      } else {
        let newTime = this.state.intervals.length ? this.state.intervals[0].duration : 0;
        window.setTimeout(() => {
          this.setState({timeRemaining: newTime * 1000, intervals: this.state.intervals.slice(1)});
          this.endTime = null;
          this.startFrame(this.state.timeRemaining);
        }, 900);
      }
    }
    this.setState({isClicked: !this.state.isClicked});
  }

  render() {
    const color = this.state.isClicked ? '#8b475d' : '#db7093';
    const done = 'DONE'
    return (
      <View style={styles.container}>
        {
          !this.state.begin ?
          (<TouchableHighlight
              onPress={this.handleStart}
              style={styles.button}>
            <Text style={styles.buttonText}>
              Start
            </Text>
          </TouchableHighlight>) : null
        }
        <View>
          <Text style={{color, fontSize: 64, marginLeft: -10}}>
            { !this.state.begin ?
                null :
                (this.state.timeRemaining / 1000).toFixed(1)
            }
          </Text>
        </View>
        { !this.state.isClicked && this.state.intervals && this.state.intervals[0]
          && this.state.begin ?
            (<Text style={styles.textStyle}>{this.state.intervals[0].name}</Text>) : null
        }
        <TouchableHighlight onPress={this.handlePause} style={styles.button2}>
            <Text style={styles.buttonText}>
              {this.state.isClicked ? "Start" : "Pause"}
            </Text>
        </TouchableHighlight>
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
  buttonText: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 50,
    width: 100,
    backgroundColor: "#8b475d",
    borderColor: "#db7093",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
  button2: {
    height: 50,
    width: 100,
    backgroundColor: "#db7093",
    borderColor: "#db7093",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: '#8b475d',
    fontSize: 32,
    alignSelf: 'center'
  }
});

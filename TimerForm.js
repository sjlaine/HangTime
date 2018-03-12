import React, { Component } from 'react';
import { Text, ScrollView, StyleSheet, TouchableHighlight, Button } from 'react-native';
import db from './firebase';
import _ from 'lodash';

import t from 'tcomb-form-native';

const Form = t.form.Form;
let stylesheet = t.form.Form.stylesheet;
stylesheet.textbox.normal.width = 170;
stylesheet.textbox.normal.height = 35;
stylesheet.controlLabel.normal.fontSize = 13;
stylesheet.formGroup.normal.marginLeft = 50;
stylesheet.formGroup.normal.flexDirection = 'row';
stylesheet.controlLabel.normal.paddingRight = 10;
stylesheet.fieldset.flexDirection = 'column';

const options = {
  fields: {
    name: {
      stylesheet: stylesheet
    }
  }
};


let Interval;
Interval = t.struct({
  name: t.String,
  duration: t.Number
});

let Repeats = t.struct({
  repeats: t.Number
})

export default class TimerForm extends Component {
  constructor() {
    super();
    this.state = {
      intSet: []
    };
  }

  componentDidMount () {}

  handleChangeInterval = (interval) => {
    this.setState({interval});
  }

  addInterval = () => {
    this.setState({intSet: [...this.state.intSet, this.state.interval]});
    this.setState({interval: null})
  }

  handleChangeRepeats = (repeats) => {
    this.setState({repeats})
  }

  addRepeats = () => {
    let newRepeats = this.state.repeats.repeats;
    this.setState({repeatInt: newRepeats})
  }

  addToTimer = () => {
    let repeats = +this.state.repeatInt;
    let timerChunk = [];
    while (repeats > 0) {
      timerChunk.push(...this.state.intSet);
      repeats--;
    }
    this.state.currentTimer ?
    this.setState({currentTimer: [...this.state.currentTimer, ...timerChunk]}) :
    this.setState({currentTimer: [...timerChunk]});
    this.setState({
      intSet: [],
      repeats: null,
      repeatInt: null,
      interval: null
    })
  }

  handleSubmit = () => {
    const rootRef = db.ref('timer/').set(this.state.currentTimer);
    this.setState({currentTimer: null})
  }

  render() {
    return (
      <ScrollView style={{marginTop: 50}}>
        <Form type={Interval} options={options} onChange={this.handleChangeInterval} value={this.state.interval} />
        <TouchableHighlight style={styles.button} onPress={this.addInterval} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Add Interval</Text>
        </TouchableHighlight>
        <Text>
          { this.state.intSet.length ?
            this.state.intSet.map(obj => obj.name + ': ' + obj.duration + 's \n') : null
          }
        </Text>
        <Text>
          {this.state.repeatInt && ' Repeats: ' + this.state.repeatInt +'\n'}
        </Text>
        <Form type={Repeats} options={options} onChange={this.handleChangeRepeats} value={this.state.repeats} />
        <TouchableHighlight style={styles.button2} onPress={this.addRepeats} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Repeat Interval</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.addToTimer} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Add To Timer</Text>
        </TouchableHighlight>
        <Text>Current Timer: </Text>
        <Text>
        {
          !!this.state.currentTimer &&
          this.state.currentTimer.map(interval => interval.name + ': ' + interval.duration + 's \n')
        }
        </Text>
        <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save Timer</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#800000',
    alignItems: 'center',
    justifyContent: 'center',
    width: 90
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
  }
});


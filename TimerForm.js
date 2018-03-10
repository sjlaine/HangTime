import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Button } from 'react-native';
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
      intSet: [],
      currentTimer: []
    };
  }

  componentDidMount () {
    const rootRef = db.ref().child('timerHolder');
    const timerRef = rootRef.child('timerOne');
    timerRef.on('value', (snapshot) => {
      this.setState({time: snapshot.val()['0'].duration});
    });
  }

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
    this.setState({repeatInt: this.state.repeats.repeats})
    console.log(this.state.repeatInt);
  }

  render() {
    console.log(this.state.repeats)
    return (
      <View style={{marginTop: 50}}>
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
      </View>
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
    height: 30,
    backgroundColor: "#ff00ff",
    borderColor: "#ff00ff",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    alignSelf: "center",
    justifyContent: "center",
    width: 100
  },
  button2: {
    height: 30,
    backgroundColor: "#8A2BE2",
    borderColor: "#8A2BE2",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    alignSelf: "center",
    justifyContent: "center",
    width: 100
  }
});


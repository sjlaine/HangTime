import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Home from './Home';
import Interval from './Interval';

export const Tabs = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: <Icon name="home" size={32} color="magenta" />
    }
  },
  Interval: {
    screen: Interval,
    navigationOptions: {
      tabBarLabel: 'Interval',
      tabBarIcon: <Icon name="timer" size={32} color="magenta" />
    }
  }
});

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import Capture from './screens/Capture';
import HomeNavigation from "./screens/HomeNavigation";
import ReviewCapture from "./screens/ReviewCapture";

const Navigation = StackNavigator({
    Home: { screen: HomeNavigation },
    ReviewCapture: {screen: ReviewCapture }
});

export default class App extends Component<{}> {
  render() {
    return (
        <Navigation />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

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
import TransactionView from "./screens/TransactionView";

const Navigation = StackNavigator({
    Home: { screen: HomeNavigation },
    ReviewCapture: {screen: ReviewCapture },
    TransactionView: {screen: TransactionView}
});

export default class App extends Component<{}> {
  render() {
    return (
        <Navigation />
    );
  }
}

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
import HomeNavigation from "./screens/HomeNavigation";
import ReviewCapture from "./screens/splitProcess/ReviewCapture";
import ReceiptItems from "./screens/splitProcess/ReceiptItems";
import TransactionView from "./screens/TransactionView";

const Navigation = StackNavigator({
    Home: { screen: HomeNavigation },
    ReviewCapture: {screen: ReviewCapture },
    ReceiptItems: {screen: ReceiptItems},
    TransactionView: {screen: TransactionView}
});

export default class App extends Component<{}> {
  render() {
    return (
        <Navigation />
    );
  }
}



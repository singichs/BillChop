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
import ReceiptPeople from "./screens/splitProcess/ReceiptPeople";
import TransactionHistory from "./screens/TransactionHistory";
import Settings from "./screens/accountManagement/Settings"

const Navigation = StackNavigator({
    Home: { screen: HomeNavigation },
    Settings: { screen: Settings},
    ReviewCapture: {screen: ReviewCapture },
    ReceiptItems: {screen: ReceiptItems},
    ReceiptPeople: {screen: ReceiptPeople},
    TransactionView: {screen: TransactionView},
    TransactionHistory: {screen: TransactionHistory}
});

export default class App extends Component<{}> {
  render() {
    return (
        <Navigation />
    );
  }
}



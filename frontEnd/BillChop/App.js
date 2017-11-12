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
import AddGroup from "./screens/AddGroup";
import Settings from "./screens/accountManagement/Settings"
import Login from "./screens/accountManagement/Login";
import CreateAcct from "./screens/accountManagement/CreateAcct";

const Navigation = StackNavigator({
    Login: { screen: Login },
    CreateAcct: { screen: CreateAcct },
    Home: { screen: HomeNavigation },
    Settings: { screen: Settings},
    ReviewCapture: {screen: ReviewCapture },
    ReceiptItems: {screen: ReceiptItems},
    ReceiptPeople: {screen: ReceiptPeople},
    TransactionView: {screen: TransactionView},
    TransactionHistory: {screen: TransactionHistory},
    AddGroup: {screen: AddGroup},
});

export default class App extends Component<{}> {
  render() {
    return (
        <Navigation />
    );
  }
}



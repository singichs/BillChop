import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, Button, TouchableHighlight
} from 'react-native';
import Home from './Home';
import Capture from './Capture';
import { TabNavigator } from "react-navigation";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const HomeScreenNavigator = TabNavigator({
    Home: {screen: Home},
    Capture: { screen: Capture },
});

export default class HomeNavigation extends Component<{}> {
    static navigationOptions = {
        headerRight: (<Button title="Settings" />)
    };
    render() {
        return (
            <HomeScreenNavigator/>
        );
    }
}
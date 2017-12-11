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
import FriendList from "./FriendList";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const HomeScreenNavigator = TabNavigator({
    FriendList: {screen: FriendList},
    Home: {screen: Home},
    Capture: { screen: Capture }},
    {
        initialRouteName: 'Capture'
    }, {
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: '#e91e63',
            labelStyle: {
                fontSize: 12
            }
        },
    });

export default class HomeNavigation extends Component<{}> {
    constructor (props) {
        super(props);
    }

    static navigationOptions = ({ navigation }) => {
        let title = 'Home';
        let headerRight =  (<Button title="Settings" onPress={() => navigation.navigate('Settings')}/>);
        return {title, headerRight};
    };
    render() {
        return (
            <HomeScreenNavigator screenProps={{ rootNavigation: this.props.navigation }}/>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26,
    },
});
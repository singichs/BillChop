import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, Button, TouchableHighlight
} from 'react-native';

export default class Capture extends Component<{}> {
    static navigationOptions = {
        title: 'Capture',
    };
    render() {
        return (
            <View>
                <Text>
                    Capture dat image!
                </Text>
            </View>
        );
    }
}
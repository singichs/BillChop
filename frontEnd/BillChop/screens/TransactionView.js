import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, Button, TouchableHighlight, Image
} from 'react-native';
import { NavigationActions } from 'react-navigation'


export default class TransactionView extends Component<> {
    static navigationOptions = {
        title: 'View Transaction',
    };

    render() {
        console.log(this.props);
        return (
            <View style={styles.container}>
                <Text>{this.props.navigation.state.params.transactionid}</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    imageContainer: {
        flex: .75,
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});
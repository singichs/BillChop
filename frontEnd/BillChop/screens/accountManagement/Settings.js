import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Button,
    StatusBar
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { StackNavigator } from 'react-navigation';
import {hosturl} from "../../constants";

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Login'})
    ]
});

export default class Settings extends Component {
    logout = () => {
        fetch(hosturl+'chop/user_logout/', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        }).then((responseJson) => {
                this.setState({data: responseJson["groups"]});
        }).catch((error) => {
                console.log(error);
        });
       this.props.navigation.dispatch(resetAction);
    };
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.logout()}>
                    <Text style={styles.buttonText}> Logout </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding:20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#A31621',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 16
    }
});
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
import {hosturl} from "../../constants";

export default class Settings extends Component {
    logout = () => {
        fetch(hosturl+'/chop/user_logout/', {
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
    };
    render() {
        return (
            <View style={styles.container}>
                <Button title="Logout" onPress={() => this.logout()}/>
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
        backgroundColor: '#bdc3c7',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    }
});
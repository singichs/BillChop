import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    KeyboardAvoidingView
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import LoginForm from './LoginForm';

export default class Login extends Component {
    render(){
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source = {require('../../images/BillChop.png')}
                />

                <Text style={styles.title}>Capture, Select, Charge</Text>
                <LoginForm />
              </View>
            </KeyboardAvoidingView>
    );
    }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#4286f4' //white, for now
    },
      logoContainer: {
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center'
    },
    logo: {
      width: 100,
      height: 100
    },
    title: {
      color: '#000', //Black for now
      marginTop: 10,
      width: 160,
      textAlign: 'center',
      opacity: 0.9
    }
});


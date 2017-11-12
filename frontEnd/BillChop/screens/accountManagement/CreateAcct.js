import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Button,
    KeyboardAvoidingView
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { StackNavigator } from 'react-navigation';

export default class CreateAcct extends Component<{}> {
    static navigationOptions = {
        headerLeft: (<Button title="Login" onPress={()=>{this.props.navigation.navigate('Login')}}/>)
    };

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source = {require('../../images/BillChop.png')}
                />

                <Text style={styles.title}>Whatever our value proposition is I forget...</Text>
              
                <TextInput
                  placeholder="enter username or email"
                  placeholderTextColor='rgba(255,255,255,0.7)'
                  returnKeyType="next"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                />
                <TextInput
                  placeholder="enter phone number"
                  placeholderTextColor='rgba(255,255,255,0.7)'
                  returnKeyType="next"
                  keyboardType="numeric"
                  style={styles.input}
                  ref={(input) => {this.phoneInput = input;}}
                />
                <TextInput
                  placeholder="password"
                  placeholderTextColor='rgba(255,255,255,0.7)'
                  returnKeyType="next"
                  secureTextEntry
                  style={styles.input}
                  ref={(input) => this.passwordFirstInput = input}
                />
                <TextInput
                  placeholder="re-enter password"
                  placeholderTextColor='rgba(255,255,255,0.7)'
                  returnKeyType="go"
                  secureTextEntry
                  style={styles.input}
                  ref={(input) => this.passwordSecondInput = input}
                />

                <TouchableOpacity style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
                </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#FFFFFF' //white, for now
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
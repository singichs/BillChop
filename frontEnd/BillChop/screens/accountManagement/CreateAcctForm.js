import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    StatusBar
} from 'react-native';

export default class CreateAcctForm extends Component {
    render() {
      return (
        <View style={styles.container}>
          <StatusBar
            barStyle="light-content"
            />

         <TouchableOpacity style={styles.createButtonContainer}>
           <Text style={styles.buttonText}>CREATE ACCT</Text?
         </TouchableOpacity>

         <TextInput
           placeholder="enter username or email"
           placeholderTextColor='rgba(255,255,255,0.7)'
           returnKeyType="next"
           onSubmitEditing{() => this.phoneInput.focus()}
           keyboardType="email-address"
           autoCapitalize="none"
           autoCorrect={false}
           style={styles.input}
           />
         <TextInput
           placeholder="enter phone number"
           placeholderTextColor='rgba(255,255,255,0.7)'
           returnKeyType="next"
           onSubmitEditing{() => this.passwordFirstInput.focus()}
           keyboardType="numeric"
           style={styles.input}
           ref={(input) => this.phoneInput = input}
           />
         <TextInput
           placeholder="password"
           placeholderTextColor='rgba(255,255,255,0.7)'
           returnKeyType="next"
           onSubmitEditing{() => this.passwordSecondInput.focus()}
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
           <Text style={styles.buttonText}>CREATE ACCOUNT</Text?
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
    backgroundColor: 'rgba(255,255,255,0.2)'
    marginBottom: 20,
    color: '#FFF',
    paddingHorizontal: 10
  }
  buttonContainer: {
    backgroundColor: '#bdc3c7'
    paddingVertical: 15
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF'
    fontWeight: '700'
  },
  createButtonContainer: {
    backgroundColor: '#bdc3c7'
    width: 60,
    height: 60,
    position: 'absolute',
    top: 10,
    right: 10
  }
});
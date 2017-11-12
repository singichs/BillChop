import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    StatusBar,
    TextInput,
    TouchableOpacity,
    Button,
    KeyboardAvoidingView,
    AsyncStorage
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { StackNavigator } from 'react-navigation';
import Login from './Login';

export default class CreateAcct extends Component<{}> {
    constructor(props) {
      super(props);
      this.state = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        username: '',
        firstPassword: '',
        secondPassword: ''
      }
    }

    /*componentDidMount() {
      this._loadInitialState().done();
    } 

    _loadInitialState = async () => {
      var value = await AsyncStorage.getItem('user');
      if(value !== null){
        this.props.navigation.navigate('Login');
      }
    }*/

    render() {
        return (
            <KeyboardAvoidingView behavior="position" style={styles.container}>
              <View style={styles.container}>
                
                <Text style={styles.header}>Create Account</Text>
              
               <TextInput
                  placeholder="Enter your first name"
                  placeholderTextColor='rgba(255,255,255,0.7)'
                  onChangeText={ (firstName) => this.setState({firstName}) }
                  underlineColorAndroid = 'transparent'
                  returnKeyType="next"
                  onSubmitEditing={() => this.lastNameInput.focus()}
                  autoCorrect={false}
                  style={styles.input}
               />
               <TextInput
                  placeholder="Enter your last name"
                  placeholderTextColor='rgba(255,255,255,0.7)'
                  onChangeText={ (lastName) => this.setState({lastName}) }
                  underlineColorAndroid = 'transparent'
                  returnKeyType="next"
                  onSubmitEditing={() => this.phoneNumberInput.focus()}
                  autoCorrect={false}
                  style={styles.input}
                  ref={(input) => this.lastNameInput = input}
               />
                <TextInput
                  placeholder="Enter your phone number"
                  placeholderTextColor='rgba(255,255,255,0.7)'
                  onChangeText={ (phoneNumber) => this.setState({phoneNumber}) }
                  returnKeyType="next"
                  onSubmitEditing={() => this.username.focus()}
                  keyboardType="numeric"
                  style={styles.input}
                  ref={(input) => this.phoneNumberInput = input}
                />
                <TextInput
                  placeholder="Enter your username"
                  placeholderTextColor='rgba(255,255,255,0.7)'
                  onChangeText={ (username) => this.setState({username}) }
                  underlineColorAndroid = 'transparent'
                  returnKeyType="next"
                  onSubmitEditing={() => this.passwordFirstInput.focus()}
                  autoCorrect={false}
                  autoCapitalize="none"
                  style={styles.input}
                  ref={(input) => this.username = input}
               />
                <TextInput
                  placeholder="password"
                  placeholderTextColor='rgba(255,255,255,0.7)'
                  onChangeText={ (firstPassword) => this.setState({firstPassword}) }
                  returnKeyType="next"
                  onSubmitEditing={() => this.passwordSecondInput.focus()}
                  secureTextEntry
                  style={styles.input}
                  ref={(input) => this.passwordFirstInput = input}
                />
                <TextInput
                  placeholder="re-enter password"
                  placeholderTextColor='rgba(255,255,255,0.7)'
                  onChangeText={ (secondPassword) => this.setState({secondPassword}) }
                  returnKeyType="go"
                  secureTextEntry
                  style={styles.input}
                  ref={(input) => this.passwordSecondInput = input}
                />

                <TouchableOpacity style={styles.button} onPress={this.signUpFunc}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        );
    }

        signUpFunc = () => {
          if(this.state.username === "" || this.state.firstPassword === ""|| this.state.secondPassword === "" 
              || this.state.phoneNumber === "" || this.state.firstName === "" || this.state.lastName === "")
          {
            alert('Not all fields were completed! Enter information for missing fields!')
          }
          else if(this.state.firstPassword != this.state.secondPassword)
          {
            alert('Passwords do not match!');
          }
          else{
            this.props.navigation.navigate('Login'); //For now, we will eventually get to use the code below...
          }

          /*fetch('http://192.5454.25.2:3000/users', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify ({
              username: this.state.username,
              password: this.state.firstPassword,
              phoneNumber: this.state.phoneNumber,
              firstName: this.state.firstName,
              lastName: this.state.lastName
            })
         })
    
        .then((response) => response.json())
        .then((res) => {
    
        if(res.success === true) {
          AsyncStorage.setItem('user', res.user);
          this.props.navigation.navigate('Login');
        }
      
        else{
          alert(res.message);
        }
      }) 
      .done();*/
    }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#FFFFFF', //white, for now
      justifyContent: 'center',
      alignItems: 'center'
    },
    header: {
      alignItems: 'center',
      fontSize: 24,
      color: '#000',
      paddingBottom: 10,
      marginTop:20,
      marginBottom: 30,
      borderBottomColor: '#000',
      borderBottomWidth: 1
    },
    textInput: {
      alignSelf: 'stretch',
      height: 40,
      marginBottom: 40,
      color: '#000',
      borderBottomColor: '#000',
      borderBottomWidth: 1
    },
    button: {
      alignSelf: 'stretch',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#000',
      marginTop: 30
    },
    buttonText: {
      color: '#FFF',
      fontWeight: 'bold'
    },
    input: {
      height: 40,
      alignItems: 'center',
      width: 300,
      backgroundColor: '#bdc3c7',
      marginTop: 10,
      marginBottom: 10,
      color: '#FFF',
      paddingHorizontal: 10
    },
});
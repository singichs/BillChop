import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    Button,
    KeyboardAvoidingView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    AsyncStorage
} from 'react-native';
import { StackNavigator } from 'react-navigation'
import { NavigationActions } from 'react-navigation'
import CreateAcct from './CreateAcct';
import {hosturl} from "../../constants";

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Home'})
    ]
});

export default class Login extends Component<{}> {
    constructor(props) {
    	super(props);
    	this.state = {
    		username: '',
    		passowrd: '',
    	}
    }
    
    componentDidMount() {
    	this._loadInitialState().done();
    }	
    
    _loadInitialState = async () => {
    	var value = await AsyncStorage.getItem('user');
    	if(value !== null){
    		this.props.navigation.navigate('Home');
    	}
    }
    
    render(){
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
             <View style={styles.logoContainer}>

                <Text style={styles.title}>BillChop</Text>
                <Text style={styles.valueProp}>Capture, Select, Charge</Text>
                
         		   <TextInput
          			  placeholder="username"
                  placeholderTextColor='rgba(255,255,255,0.7)'
           			  onChangeText={ (username) => this.setState({username}) }
           			  underlineColorAndroid = 'transparent'
           			  returnKeyType="next"
           			  onSubmitEditing={() => this.passwordInput.focus()}
           			  keyboardType="email-address"
           			  autoCapitalize="none"
           			  autoCorrect={false}
           			  style={styles.input}
           		 />
         		   <TextInput
           			  placeholder="password"
           			  placeholderTextColor='rgba(255,255,255,0.7)'
           			  onChangeText={ (password) => this.setState({password}) }
           			  underlineColorAndroid = 'transparent'
           			  returnKeyType="go"
           			  secureTextEntry
           			  style={styles.input}
           			  ref={(input) => this.passwordInput = input}
           		 />

         		 <TouchableOpacity style={styles.buttonContainer} onPress={this.login}>
           			<Text style={styles.buttonText}> LOGIN </Text>
         		 </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={this.createAcct}>
              <Text style={styles.buttonText}>Don't have an account? Sign up here!</Text>
            </TouchableOpacity>

            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      );
    }

    createAcct = () => {
      this.props.navigation.navigate('CreateAcct');
    }
    
    login = () => {
		fetch(hosturl+'chop/user_login/', {
			method:'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json' 
			},
			body: JSON.stringify ({
				username: this.state.username,
				password: this.state.password
			})
		})
		.then((res) => {
			if(res.status === 200) {
				//AsyncStorage.setItem('user', res.user);
                this.props.navigation.dispatch(resetAction);
			}
			
			else{
				alert("Incorrect login credentials. Please try again");
			}
		}) 
		.done();
   }
}

const styles = StyleSheet.create({
    wrapper:{
    	flex:1
	},
    container:{
      flex:1,
      backgroundColor: '#FFFFFF', //white, for now
      paddingLeft: 10,
      paddingRight: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
      logoContainer: {
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center'
    },
    title: {
      color: '#000', //Black for now
      marginTop: 10,
      width: 160,
      textAlign: 'center',
      opacity: 0.9,
      fontSize: 36,
    },
    valueProp: {
      color: '#000', //Black for now
      marginTop: 10,
      width: 160,
      textAlign: 'center',
      opacity: 0.9,
    },
    signUp: {
      color: '#000', //Black for now
      marginTop: 30,
      width: 160,
      textAlign: 'center',
      opacity: 0.9,
      borderBottomColor: '#000',
    },
  	input: {
    	height: 40,
      width: 300,
    	backgroundColor: '#bdc3c7',
      marginTop: 20,
    	marginBottom: 20,
    	color: '#FFF',
    	paddingHorizontal: 10
  	},
  	buttonContainer: {
      alignSelf: 'stretch',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#3b5998',
      marginTop: 30
  	},
  	buttonText: {
    	color: '#FFF',
      fontWeight: 'bold'
  	}
});
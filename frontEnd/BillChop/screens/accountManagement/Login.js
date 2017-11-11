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
    StatusBar,
    AsyncStorage
} from 'react-native';
import { StackNavigator } from 'react-navigation'
import { NavigationActions } from 'react-navigation'
import HomeNavigation from '../HomeNavigation';
import LoginForm from './LoginForm';

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
    		this.props.navigation.navigate('HomeNavigation');
    	}
    }
    
    render(){
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source = {require('../../images/BillChop.png')}
                />

                <Text style={styles.title}>Capture, Select, Charge</Text>
                
                <StatusBar
            		barStyle="light-content"
            	/>
         		   <TextInput
           			  placeholder="username or email"
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
            </View>
          </KeyboardAvoidingView>
    );
    }
    
    login = () => {
		fetch('http://192.5454.25.2:3000/users', {
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
		
		.then((response) => response.json())
		.then((res) => {
		
			if(res.success === true) {
				AsyncStorage.setItem('user', res.user);
				this.props.navigation.navigate('HomeNavigation');
			}
			
			else{
				alert(res.message);
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
      backgroundColor: '#4286f4', //white, for now
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


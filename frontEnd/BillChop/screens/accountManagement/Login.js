import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
    Text,
    TextInput,
    Button,
    KeyboardAvoidingView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    AnimatedButton,
    AnimationOverlay,
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
             
             <ImageBackground source={require('./BillChopBackground1.jpg')}
                  style={styles.backgroundImage}>

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
           			<Text style={styles.buttonText}> Login </Text>
         		 </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={this.createAcct}>
              <Text style={styles.buttonText}>Don't have an account? Sign up here!</Text>
            </TouchableOpacity>

            </View>
           </ImageBackground>
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
  backgroundImage: {
          flex: 1,
          position: 'absolute',
          width: '110%',
          height: '200%',
          justifyContent: 'center' 
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
      color: '#FFF', //Black for now
      backgroundColor: 'transparent',
      marginTop: 10,
      width: 160,
      textAlign: 'center',
      opacity: 0.9,
      fontSize: 36,
            fontFamily: 'TrebuchetMS-Bold'
    },
    valueProp: {
      color: '#FFF', //Black for now
            backgroundColor: 'transparent',
      marginTop: 10,
      width: 160,
      textAlign: 'center',
      opacity: 0.9,
            fontFamily: 'TrebuchetMS-Bold'
    },
    signUp: {
      marginTop: 30,
      width: 160,
      textAlign: 'center',
      opacity: 0.9,
      borderBottomColor: '#000',
            backgroundColor: 'transparent',
      fontFamily: 'Trebuchet MS'
    },
  	input: {
    	height: 40,
      width: 300,
      marginTop: 20,
    	marginBottom: 20,
      backgroundColor: 'transparent',
    	paddingHorizontal: 10,
       borderWidth: 25,
  	},
  	buttonContainer: {
      // Setting up Hint Align center.
      textAlign: 'center',
 
// Setting up TextInput height as 50 pixel.
height: 50,
 
// Set border width.
 borderWidth: 2,
 
 // Set border Hex Color Code Here.
 borderColor: '#00cc99',
 
// Set border Radius.
 borderRadius: 25,
      alignItems: 'center',
      padding: 20,
      marginTop: 30,
      backgroundColor: '#00cc99',

  	},
  	buttonText: {
    	color: '#FFF',
      fontWeight: 'bold',
      fontFamily: 'TrebuchetMS-Bold'
  	}
});
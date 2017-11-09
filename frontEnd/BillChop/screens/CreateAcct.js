import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import CreateAcctForm from './CreateAcctForm';

export default class CreateAcct extends Component {
    render(){
        return {
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source = {require('../images/BillChop.png')}
                />
                //Create an images folder
                //and put BillChop.png in it. Images should be in src (same level as ios/andr...)
                //folder

                <Text style={styles.title}>Whatever our value proposition is I forget...</Text>
              </View>
              </View style={styles.formContainer}>
                <CreateAcctForm />
              </View>
            </KeyboardAvoidingView>
        };
    }
}

const styles = StyleSheet.create({
    container:{
      flex:1
      backgroundColor: '#ecf0f1' //white, for now
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
      color: '#000' //Black for now
      marginTop: 10,
      width: 160,
      textAlign: 'center',
      opacity: 0.9
    }
});
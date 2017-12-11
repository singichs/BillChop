import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View, Button, TouchableHighlight, Image,
    ActivityIndicator
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {hosturl} from "../../constants";

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Home'})
    ]
});

export default class ReviewCapture extends Component<{}> {
    static navigationOptions = {
        title: 'Review Image',
    };
    constructor(props) {
        super(props);
        this.state = {rendering: false};
    }
    submitPhoto = (image) => {
        const data = new FormData();
        data.append('image', {
            uri: encodeURIComponent(image),
            type: 'image/jpeg', // or photo.type
            name: 'test.jpeg'
        });
        if(this.state.rendering===false) {
            fetch(hosturl+"chop/upload_receipt", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: data
            }).then((response) => {
                this.setState({rendering: false});
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            }).then((data) => {
                this.props.navigation.navigate('ReceiptItems', {data: data});
            }).catch(error => alert(error));
        }
        this.setState({rendering: true});
    }

render() {
        let image = this.props.navigation.state.params.image;
        let view = (<TouchableOpacity style={styles.buttonContainer} onPress={() => this.submitPhoto(image)}>
            <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity> );
        if (this.state.rendering) {
            view =  (<ActivityIndicator style={{ alignSelf: 'stretch',
                padding: 20,
                marginTop: 30,
                marginLeft: 10,
                marginRight: 10}} size="large" color="#0000ff" />);
        }
        return (

            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{uri: image, isStatic:true}} style={styles.image}/>
                </View>
                {view}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    imageContainer: {
        flex: .75,
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    buttonContainer: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#00e68a',
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
});
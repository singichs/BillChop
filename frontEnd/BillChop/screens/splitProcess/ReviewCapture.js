import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, Button, TouchableHighlight, Image
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
    submitPhoto = (image) => {
        const data = new FormData();
        data.append('image', {
            uri: image,
            type: 'image/jpeg', // or photo.type
            name: 'image'
        });
        fetch(hosturl+"chop/upload_receipt", {
            method: 'POST',
            body: data
        }).then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response;
        }).then((data) => {
                alert(data.json());
                this.props.navigation.navigate('ReceiptItems', {image: image});
        }).catch(error => alert(error));
    }

render() {
        let image = this.props.navigation.state.params.image;
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{uri: image, isStatic:true}} style={styles.image}/>
                </View>
                <Button title="Continue" onPress={() => this.submitPhoto(image)}/>
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
});
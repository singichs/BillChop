import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, Button, TouchableHighlight, Image
} from 'react-native';
import { NavigationActions } from 'react-navigation'

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

render() {
        let image = this.props.navigation.state.params.image;
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{uri: image, isStatic:true}} style={styles.image}/>
                </View>
                <Button title="Continue" onPress={() => this.props.navigation.navigate('ReceiptItems', {image: image})}/>
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
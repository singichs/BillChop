import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, Button, TouchableHighlight
} from 'react-native';
import Camera from 'react-native-camera';

export default class Capture extends Component<{}> {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Capture",
    });
    render() {
        return (
            <View style={styles.container}>
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                    captureTarget={Camera.constants.CaptureTarget.temp}>
                    <Text style={styles.capture} onPress={this.takePicture.bind(this)}>CAPTURE</Text>
                </Camera>
            </View>
        );
    }

    takePicture() {
        const options = {};
        //options.location = ...
        this.camera.capture({metadata: options})
            .then((data) => {
                console.log(data);
                this.props.screenProps.rootNavigation.navigate('ReviewCapture', {image: data.path});
            })
            .catch(err => console.error("test"));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});

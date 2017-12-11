import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    tintColor,
    View, Button, TouchableHighlight, Image
} from 'react-native';
import DocumentScanner from 'react-native-document-scanner';

export default class Capture extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            initialImage: null,
            rectangleCoordinates: null,
        };
    }
    static navigationOptions = ({ navigation, screenProps }) => ({
            tabBarLabel: 'Capture',
            tabBarIcon: ({ tintcolor }) => (
            <Image
                source={require('../images/capture-icon.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    });
    evalPicture =(data)=>{
        this.props.screenProps.rootNavigation.navigate('ReviewCapture', {image: data.croppedImage});
        this.setState({
            image: null,
            initialImage: null,
            rectangleCoordinates: null,
            stableCounter: 0
        })
    }
    takePicture =()=> {
        const options = {};
        //options.location = ...
        this.scanner.capture();
    };
    render() {
        return (
            <View style={styles.container}>
                <DocumentScanner
                    ref={(ref) => {this.scanner = ref}}
                    style={styles.preview}
                    onPictureTaken={data => this.evalPicture(data)}
                    overlayColor="rgba(255,130,0, 0.7)"
                    enableTorch={false}
                    brightness={0.3}
                    saturation={0.1}
                    contrast={1.5}
                    quality={0.8}
                    onRectangleDetect={({ stableCounter, lastDetectionType }) => this.setState({ stableCounter, lastDetectionType })}
                    detectionCountBeforeCapture={50000000}
                    detectionRefreshRateInMS={50}
                    captureMultiple>
                    <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
                </DocumentScanner>
                <Image source={{ uri: `data:image/jpeg;base64,${this.state.image}`}} resizeMode="contain" />
            </View>
        );
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
        backgroundColor: '#00e68a',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    },
    icon: {
        height: 35,
        width: 35
    },
});

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Text,
    View, Button, TouchableHighlight
} from 'react-native';
import { List, ListItem} from 'react-native-elements';
import {hosturl} from "../constants";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class PeopleList extends Component {
    constructor (props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        fetch(hosturl+'chop/get_user_groups/')
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((responseJson) => {
                this.setState({data: responseJson["groups"]});
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        let getName = (item) => {
            return item.group_name;
        }
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.buttonContainer} onPress={() =>{this.props.screenProps.rootNavigation.navigate('AddGroup', {refresh: () => {this.makeRemoteRequest()}})}}>
                    <Text style={styles.buttonText}>Create a Group</Text>
                </TouchableOpacity>
                {this.state.data.length < 1 && <Text style={styles.titleText}>No groups to show</Text>}
                <List>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => (
                            <ListItem
                                title={getName(item)}
                                onPress={() => this.props.screenProps.rootNavigation.navigate('TransactionHistory', {transactionid: item.group_id})}
                            />
                        )}
                        keyExtractor={item => item.group_id}
                    />
                </List>
            </View>
        );
    }
}



export default class FriendList extends Component<{}> {
    static navigationOptions = {
        title: 'Groups',
    };
    render() {
        return (
            <View style={styles.container}>
                <PeopleList screenProps={this.props.screenProps}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        backgroundColor: '#F5FCFF',
    },
    button: {
        paddingTop: 30,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20
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
    }
});
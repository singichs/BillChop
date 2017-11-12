import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    FlatList,
    Text,
    View, Button, TouchableHighlight
} from 'react-native';
import SearchBar from 'react-native-searchbar';
import { List, ListItem} from 'react-native-elements';

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
            contacts: [],
            results: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
        };
    }

    componentDidMount() {
        if (this.state.contacts.length === 0) {
            this.getContacts();
        }
        this.makeRemoteRequest();
    }

    getContacts = () => {
        var Contacts = require('react-native-contacts');
        Contacts.getAll((err, contacts) => {
            if (err === 'denied') {
                //error TODO: implement more comprehensive error handling
                console.log("could not get contacts");
            } else {
                this.setState({contacts: contacts});
            }
        });
    };

    makeRemoteRequest = () => {
        fetch('http://127.0.0.1:8000/chop/get_user_groups/')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({data: responseJson["payments"]});
            })
            .catch((error) => {
                console.error(error);
            });

        const fake_data = [
            {"friend": "EECS 441", "group": true, "id": 7},
            {"friend": "Ramana Keerthi", "group": false, "id": 0},
            {"friend": "Mazen Oweiss", "group": false, "id": 1},
            {"friend": "Katie Matton", "group": false, "id": 2},
            {"friend": "Sagar Singichetti", "group": false, "id": 3},
            {"friend": "Will Stager", "group": false, "id": 4},
            {"friend": "Joe Kunnath", "group": false, "id": 5},
            {"friend": "Peter Kaplan", "group": false, "id": 6}];

        this.setState({data: fake_data});
    };

    _handleResults = (results) => {
        // loop through results and pull out unnecessary info
        let results_temp = []
        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            let temp_result = {"givenName": result["givenName"], "familyName": result["familyName"], "phoneNumber": ""}
            let p_nums = result["phoneNumbers"];
            for (let j = 0; j < p_nums.length; j++) {
                if (p_nums[j]["label"] === 'mobile') {
                    temp_result["phoneNumber"] = p_nums[j]["number"];
                }
            }
            if (temp_result["phoneNumber"]) {
                results_temp.push(temp_result);
            }
        }
        console.log("in handle");
        console.log(results_temp);
        this.setState({results: results_temp});
    };

    hideSearch = () => {
        this.searchBar.hide();
        this.setState({searchShown: false });
    };

    showSearch = () => {
        this.searchBar.show();
        this.setState({searchShown: true });
    };

    renderSearchButton(searchShown, showSearchFn) {
        if(searchShown) {
            return (<Text>{""}</Text>);
        }
        else {
            return(<Button title={"Search for Friends to Split With"} style={styles.button} onPress={showSearchFn}/>);
        }
    };

    render() {
        let getPerson = (item) => {
            return item.item.friend;
        }
        return (
            <List>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <ListItem
                            title={getPerson({item})}
                            subtitle={item.title}
                            onPress={() => this.props.screenProps.rootNavigation.navigate('TransactionHistory', {transactionid: item.id})}
                        />
                    )}
                    keyExtractor={item => item.id}
                />
            </List>
        );
    }
}



export default class FriendList extends Component<{}> {
    static navigationOptions = {
        title: 'Friends and Groups',
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
});
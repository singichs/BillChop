import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
    View, Button, TouchableHighlight
} from 'react-native';
import { List, ListItem, Icon} from 'react-native-elements';
import SearchBar from 'react-native-searchbar';
import {hosturl} from "../constants";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class TransactionHistory extends Component {
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
        this.makeRemoteRequests();
    }

    makeRemoteRequests = () => {
        let gID = this.props.navigation.state.params.transactionid;
        fetch(`${hosturl}chop/get_group_receipts/${gID}`)
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((responseJson) => {
                this.setState({data: responseJson["receipts"]});
            })
            .catch((error) => {
                alert(error);
            });
};

    render() {
        let getString = (item) => {
            if (item.item.is_owner) {
                return `You are owed $${item.item.total_cost}`;
            }
            return `You owe ${item.item.owner} $${item.item.total_cost}`;
        };
        let getDate = (item) => {
            let curr_date = new Date(item.item.timestamp);
            let date_str = curr_date.toLocaleString('en-US');
            return date_str;
        };
        let getTitle = (item) => {
            if (item["title"]) {
                return item["title"];
            }
            return " ";
        };
        return (
            <View>
                <Text style={styles.headingText}> {"Group History"} </Text>
                <List>
                    <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <ListItem
                            title={getString({item})}
                            subtitle={getDate({item})}
                            rightTitle={getTitle(item)}
                            titleContainerStyle={{ backgroundColor: '#F5FCFF'}}
                            rightTitleContainerStyle={{backgroundColor: '#F5FCFF'}}
                            onPress={() => this.props.screenProps.rootNavigation.navigate('ReceiptPeople', {items: [],
                                title: "",
                                preTaxCost: 0.00,
                                tax: 0.00,
                                finalCost: 0.00,
                                receipt_id: item.receipt_id,
                                lastPage: "Home",})}
                        />
                    )}
                    keyExtractor={item => item.receipt_id}
                    />
                </List>
            </View>
        );
    }
}
class GroupMembers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            page: 1,
            seed: 1,
            contacts: [],
            results: [],
            group: {"members": [], "name": ""},
            showSearch: false,
            currID: 0,
            error: null,
            refreshing: false,
        };
    }

    componentDidMount() {
        this.makeRemoteRequests();
        if (this.state.contacts.length === 0) {
            this.getContactsForGroup();
        }
    }

    getContactsForGroup = () => {
        var Contacts = require('react-native-contacts');
        Contacts.getAll((err, contacts) => {
            if (err === 'denied') {
                console.log("could not get contacts");
            } else {
                this.setState({contacts: contacts});
            }
        });
    };

    makeRemoteRequests = () => {

        let gID = this.props.navigation.state.params.transactionid;
        fetch(`${hosturl}chop/get_users_in_group/${gID}`)
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((responseJson) => {
                let group_data = this.state.group;
                group_data.members = responseJson["members"];
                this.setState({group: group_data});
            })
            .catch((error) => {
                alert(error);
            });
    };

    hideSearch = () => {
        this.searchBar.hide();
        this.setState({searchShown: false, results: [] });
    };

    showSearch = () => {
        this.searchBar.show();
        this.setState({searchShown: true });
    };

    renderGroupSearchButton(searchShown, showSearchFn) {
        if(searchShown) {
            return (<Text>{""}</Text>);
        }
        else {
            return(<TouchableOpacity style={styles.buttonContainer} onPress={showSearchFn}>
                <Text style={styles.buttonText}>Search for Members to Add</Text>
            </TouchableOpacity>);
        }
    };

    _handleGroupResults = (results) => {
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
        this.setState({results: results_temp});
    };

    addPersonToGroup = (index, givenName, familyName, phoneNumber) => {
        fetch(hosturl+'chop/add_user_to_group/', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                groupID: this.props.navigation.state.params.transactionid,
                givenName: givenName,
                familyName: familyName,
                phoneNumber: phoneNumber
            })
        })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((responseJson) => {
                // could add checking for duplicate users here
                let personID = responseJson["user_id"];
                let group = this.state.group;
                group["members"].push({"id": personID, "givenName": givenName, "familyName": familyName, "phoneNumber": phoneNumber});
                this.setState({group: group});
            })
            .catch((error) => {
                alert(error);
            });
    };

    removePersonFromGroup = (index, user_id) => {
        let group = this.state.group;
        group["members"].splice(index, 1);
        this.setState({group: group});
        fetch(hosturl+'chop/delete_user_from_group/', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                group_id: this.props.navigation.state.params.transactionid,
                user_id: user_id
            })
        })
            .then((res) => {
                if(res.status !== 200) {
                    alert("error removing person from group");
                }
            })
            .done();
    };

    render() {
        return (<View style={styles.container}>
                {this.renderGroupSearchButton(this.state.searchShown, () => {this.showSearch()})}
                <SearchBar
                    ref={(ref) => this.searchBar = ref}
                    data={this.state.contacts}
                    handleResults={this._handleGroupResults}
                    onBack={this.hideSearch}
                />
                <View style={styles.listContainer}>
                    <List>
                        <FlatList
                            data={this.state.results}
                            extraData={this.state}
                            renderItem={({item, index})  => (
                                <ListItem
                                    title={`${item.givenName} ${item.familyName}`}
                                    rightTitle={`${item.phoneNumber}`}
                                    hideChevron={true}
                                    leftIcon={<Icon name='add' color='#32cd32' size={20} containerStyle={styles.icon}
                                                onPress={() =>{this.addPersonToGroup(index, item.givenName, item.familyName, item.phoneNumber)}}/>}
                                />
                            )}
                            keyExtractor={(item, index) => index}
                        />
                    </List>
                    <Text style={styles.headingText}> {"Group Members"} </Text>
                    <List>
                        <FlatList
                            data={this.state.group.members}
                            extraData={this.state}
                            renderItem={({item, index})  => (
                                <ListItem
                                    title={`${item.givenName} ${item.familyName}`}
                                    hideChevron={true}
                                    leftIcon={<Icon name='clear' color='#ff0000'  size={20} containerStyle={styles.icon}
                                                    onPress={() =>{this.removePersonFromGroup(index, item.id)}}/>}
                                />
                            )}
                            keyExtractor={(item, index) => index}
                        />
                    </List>
                    {this.state.group.members.length < 1 && <Text style={styles.titleText}>No group members added yet</Text>}
                </View>
                </View>);
    }
}

export default class TransHistory extends Component<{}> {
    static navigationOptions = {
        title: 'Group History',
    };
    render() {
        return (
            <View style={styles.container}>
                <GroupMembers navigation={this.props.navigation}/>
                <TransactionHistory navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#F5FCFF',
    },
    titleText: {
        fontSize: 16,
        textAlign: 'center',
        paddingTop: 20,
        paddingLeft: 20,
    },
    text: {
        paddingTop: 20,
        fontWeight: 'bold',
        paddingLeft: 5,
    },
    headingText: {
        paddingTop: 20,
        fontWeight: 'bold',
        paddingLeft: 5,
        fontSize: 20,
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
    listContainer: {
        marginTop: 40,
    },
});
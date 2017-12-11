import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    FlatList,
    TextInput,
    View, Button, TouchableHighlight, Image
} from 'react-native';
import SearchBar from 'react-native-searchbar';
import { List, ListItem, Icon} from 'react-native-elements';
import {hosturl} from "../constants";

class GroupView extends Component {
    constructor (props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            contacts: [],
            results: [],
            group: {"members": [], "name": ""},
            showSearch: false,
            page: 1,
            seed: 1,
            currID: 0,
            error: null,
            refreshing: false,
        };
    }

    componentDidMount() {
        if (this.state.contacts.length === 0) {
            this.getContactsForGroup();
        }
    }

    getContactsForGroup = () => {
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

    addPersonToGroup = (index, givenName, familyName, phoneNumber) => {
        let group = this.state.group;
        let tempID = this.state.currID;
        group["members"].push({"id": tempID, "givenName": givenName, "familyName": familyName, "phoneNumber": phoneNumber});
        this.setState({group: group, currID: tempID + 1});
    };

    removePersonFromGroup = (index) => {
        let group = this.state.group;
        group["members"].splice(index, 1);
        this.setState({group: group});
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
        console.log("in handle");
        console.log(results_temp);
        this.setState({results: results_temp});
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
            return(<Button title={"Search for Members to Add"} style={styles.button} onPress={showSearchFn}/>);
        }
    };

    changeGroupName = (text) => {
        let group = this.state.group;
        group["name"] = text;
        this.setState({group: group});
    };

    saveGroup = () => {
        let temp_members = this.state.group.members;
        for (let i = 0; i < temp_members.length; i++) {
            let formatNumber = temp_members[i].phoneNumber;
            formatNumber = formatNumber.replace(/\+/g, "");
            formatNumber = formatNumber.replace(/\(/g, "");
            formatNumber = formatNumber.replace(/\)/g, "");
            formatNumber = formatNumber.replace(/\s/g, "");
            temp_members[i].phoneNumber = formatNumber;
        }
        fetch(hosturl+'chop/create_group/', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                group_name: this.state.group["name"],
                users: temp_members
            })
        })
            .then((res) => {
                if(res.status === 201) {
                    this.props.navigation.state.params.refresh();
                    this.props.navigation.goBack();
                }

                else{
                    alert("Invalid group");
                }
            })
            .done();
    };


    render() {
        return (
            <View style={styles.container}>
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
                            keyboardShouldPersistTaps={true}
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
                    <Text style={styles.text}> {"Group Members"} </Text>
                    <List>
                        <FlatList
                            keyboardShouldPersistTaps="always"
                            data={this.state.group.members}
                            extraData={this.state}
                            renderItem={({item, index})  => (
                                <ListItem
                                    title={`${item.givenName} ${item.familyName}`}
                                    rightTitle={`${item.phoneNumber}`}
                                    hideChevron={true}
                                    leftIcon={<Icon name='clear' color='#ff0000'  size={20} containerStyle={styles.icon}
                                                onPress={() =>{this.removePersonFromGroup(index)}}/>}
                                />
                            )}
                            keyExtractor={(item, index) => index}
                        />
                    </List>
                    <Text style={styles.text}> {"Enter Group Name:"} </Text>
                    <View style={styles.inputContainer}>
                        <TextInput onChangeText={(text) => this.changeGroupName(text)} placeholder="Enter Group Name" value={this.state.group["name"]}/>
                    </View>
                    <Button title={"Save Group"} style={styles.button} onPress={() =>{this.saveGroup()}}/>
                </View>
            </View>);
    }
}

export default class AddGroup extends Component<{}> {
    static navigationOptions = {
        title: 'Create a New Group',
    };

    render() {
        return (
           <GroupView navigation={this.props.navigation}/>
        );
    }

}

const styles = StyleSheet.create({
    listItem: {
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#F5FCFF',
    },
    listContainer: {
        marginTop: 40,
    },
    text: {
        paddingTop: 20,
        fontWeight: 'bold',
    },
    button: {
        paddingTop: 40
    },
    textInput: {
        fontSize: 18,
    },
    inputContainer: {
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#f8f8ff'
    }
});
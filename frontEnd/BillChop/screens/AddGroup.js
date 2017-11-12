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
        this.setState({searchShown: false });
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
            return(<Button title={"Search for More Members"} style={styles.button} onPress={showSearchFn}/>);
        }
    };

    changeGroupName = (text) => {
        let group = this.state.group;
        group["name"] = text;
        this.setState({group: group});
    };

    saveGroup = () => {
        //TODO send post request to save group
        this.props.navigation.goBack();
    };


    render() {
        return (
            <View style={styles.container}>
                {this.renderGroupSearchButton(this.state.searchShown, () => {this.showSearch()})}
                <SearchBar
                    ref={(ref) => this.searchBar = ref}
                    data={this.state.contacts}
                    handleResults={this._handleGroupResults}
                    hideBack
                    onX={this.hideSearch}
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
                    <Text style={styles.text}> {"Group Members"} </Text>
                    <List>
                        <FlatList
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
                    <TextInput onChangeText={(text) => this.changeGroupName(text)} value={this.state.group["name"]}/>
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
    }
});
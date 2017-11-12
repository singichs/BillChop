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
import Collapsible from 'react-native-collapsible';

class PeopleList extends Component {
    constructor (props) {
        super(props);

        this.state = {
            people: [{"friend": "You", "id":0, "total": 0.00, "isCollapsed": false}],
            contacts: [],
            results: [],
            page: 1,
            seed: 1,
            currID: 0,
            charged: false,
            error: null,
            searchShown: false,
            refreshing: false,
        };
        this.state.people.state = { friend: '', id: 0, payers: [{name: '', quantity: 0, cost: 0}], nonPayers: [{name: '', quantity: 0, cost: 0}] };
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
        // here we need to request to get contacts... or store in phone? not sure how to do this.
        // TODO: request user's ID to add to people data
        // TODO: request ID's of all
        let items = this.props.parentProps.items;
        for (let i=0; i<items.length; i++) {
            items[i]["payers"]=[];
        }
        this.setState({
            items: items,
            openPerson: -1
        });

    };
    //function that calculates total costs after adding or removing an item. Called before item.payers is modified!
    calculateTotal = (itemIndex, isAdd)=> {
        let items=this.state.items;
        let people=this.state.people;
        let newTotal=0;
        let oldTotal=0;
        if (isAdd) {
            newTotal = (items[itemIndex].cost/(items[itemIndex].payers.length+1)).toFixed(2);
            if (items[itemIndex].payers.length===0){
                oldTotal = 0;
            }
            else {
                oldTotal=(items[itemIndex].cost/items[itemIndex].payers.length).toFixed(2);
            }
            for (let j=0; j<people.length; j++) {
                if (people[j].id === this.state.openPerson) {
                    people[j].total=(people[j].total*1)+(newTotal * 1);
                }
            }
        }
        else {
            oldTotal=(items[itemIndex].cost/items[itemIndex].payers.length).toFixed(2);
            if (items[itemIndex].payers.length===1){
                newTotal = 0;
            }
            else {
                newTotal=(items[itemIndex].cost/(items[itemIndex].payers.length-1)).toFixed(2);
            }
            for (let j=0; j<people.length; j++) {
                if (people[j].id === this.state.openPerson) {
                    let new_people_total = (people[j].total * 1) - (newTotal * 1);
                    people[j].total = new_people_total;
                }
            }
        }
        for (let i=0; i<items[itemIndex].payers.length; i++) {
            for (let j=0; j<people.length; j++) {
                if (people[j].id === items[itemIndex].payers[i]) {
                    let new_total = ((people[j].total * 1) + (newTotal * 1) - (oldTotal * 1)).toFixed(2);
                    people[j].total = new_total;
                }
            }
        }
        this.setState({
            items: items,
            people: people,
        });
    };

    addItem = (itemIndex) => {
        this.calculateTotal(itemIndex, true);
        let items = this.state.items;
        let person = this.state.openPerson;
        items[itemIndex].payers.push(this.state.openPerson);
        this.setState({
            items: items
        });
    };
    removeItem = (itemIndex) => {
        let items = this.state.items;
        let person = this.state.openPerson;
        this.calculateTotal(itemIndex, false);
        for (let i=0; i<items[itemIndex].payers.length; i++) {
            if (items[itemIndex].payers[i]===this.state.openPerson) {
                items[itemIndex].payers.splice(i,1);
                break;
            }
        }
        this.setState({
            items: items
        });
    };
    renderEntry = ({item, index}) => {
        let icon = (<Icon name='add' color='#32cd32' size={20} containerStyle={styles.icon} onPress={() =>{this.addItem(index)}}/>);
        for (let i=0; i<item.payers.length; i++) {
            if (item.payers[i]===this.state.openPerson) {
                icon = (<Icon name='clear' color='#ff0000' size={20} containerStyle={styles.icon} onPress={() =>{this.removeItem(index)}} />);
                break;
            }
        }
        return (
            <ListItem
                title={<Text>{item.name}</Text>}
                rightTitle={`$${item.cost}`}
                hideChevron={true}
                leftIcon={icon}
            />
        );
    };
    charge = () => {
        // TODO: use apis to send twilio request
        // for now just change text and button to reflect that people have been charged
        this.setState({charged: true});
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

    addPerson = (index, givenName, familyName, phoneNumber) => {
        let people_temp = this.state.people;
        let temp_ID = this.state.currID + 1;
        let person_temp = {"friend": `${givenName} ${familyName}`, "id": index, "total": 0.00, "isCollapsed": false, "phoneNumber": phoneNumber};
        people_temp.push(person_temp);
        let results_temp = this.state.results;
        results_temp.splice(index,1);
        this.setState({people: people_temp, results: results_temp, currID: temp_ID});
    };

    removePerson = (index) => {
        let people_temp = this.state.people;
        people_temp.splice(index, 1);
        this.setState({people: people_temp});
    };

    render() {
        let getButtonStr = () => {
            if (this.state.charged) {
                return "Resend Notification";
            }
            return "Notify People of Amounts Owed";
        };
        return (
            <View style={styles.container}>
                <View style={styles.containerSearch}>
                    <SearchBar
                        ref={(ref) => this.searchBar = ref}
                        data={this.state.contacts}
                        handleResults={this._handleResults}
                        hideBack
                        onX={this.hideSearch}
                    />
                </View>
                <Text style={styles.header}>
                    {this.props.parentProps.title}
                </Text>
                {this.renderSearchButton(this.state.searchShown, () => {this.showSearch()})}
                <View style={styles.containerSearch}>
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
                                                    onPress={() =>{this.addPerson(index, item.givenName, item.familyName, item.phoneNumber)}}/>}
                                />
                            )}
                            keyExtractor={(item, index) => index}
                        />
                    </List>
                </View>
                <List>
                    <FlatList
                        data={this.state.people}
                        extraData={this.state}
                        renderItem={({item, index})  =>
                            (   <View style={styles.listItem}>
                                    <ListItem onPress={()=> {
                                        let id = item.id;
                                        if (id===this.state.openPerson) {
                                            id = -1;
                                        }
                                        this.setState({
                                            openPerson: id
                                        })
                                    }}
                                    title={<View><Text>{item.friend}</Text></View>}
                                    rightTitle={`$${item.total}`}
                                    hideChevron={true}
                                    leftIcon={<Icon name='clear' color='#ff0000' size={20} containerStyle={styles.icon} onPress={() =>{this.removePerson(index)}}/> }
                                    />
                                    <Collapsible collapsed={item.id!==this.state.openPerson}>
                                        <FlatList
                                            data={this.state.items}
                                            extraData={this.state}
                                            renderItem={this.renderEntry}
                                            keyExtractor={(item, index) => index}
                                        />
                                    </Collapsible>
                                </View>
                            )
                        }
                        keyExtractor={(person, index) => index}
                    />
                </List>
                <View style={styles.summary}>
                    <Text style={styles.footer1}>
                        {`Sub-Total: $${this.props.parentProps.preTaxCost}`}
                    </Text>
                    <Text style={styles.footer1}>
                        {`Tax: $${this.props.parentProps.tax}`}
                    </Text>
                    <Text style={styles.footer2}>
                        {`Total: $${this.props.parentProps.finalCost}`}
                    </Text>
                </View>
                <Button title={getButtonStr()} style={styles.button} onPress={() =>{this.charge()}}/>
            </View>
        );
    }
}

export default class ReceiptPeople extends Component<{}> {
    static navigationOptions = {
        title: 'Assign Items to People',
    };

    render() {
        return (
            <PeopleList parentProps={this.props.navigation.state.params}/>
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
        zIndex: 0,
    },
    containerSearch: {
        zIndex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
        paddingBottom: 20
    },
    footer1: {
        marginTop: 20,
        marginLeft: 10,
        fontSize: 16
    },
    footer2: {
        marginTop: 20,
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 16,
        paddingBottom: 20
    },
    icon: {
        marginRight: 20
    },
    button: {
        paddingTop: 40
    }
});
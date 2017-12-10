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
import {hosturl} from "../../constants";

class PeopleList extends Component {
    constructor (props) {
        super(props);

        this.state = {
            people: [{"friend": "You", "id":0, "total": 0.00, "isCollapsed": false}],
            contacts: [],
            results: [],
            items: [],
            ids: [],
            my_id: 0,
            receipt_id: 0,
            page: 1,
            seed: 1,
            tip: 0,
            currID: 0,
            charged: false,
            error: null,
            searchShown: false,
            refreshing: false,
        };

    }

    componentDidMount() {
        if (this.state.contacts.length === 0) {
            this.getContacts();
            this.getGroups();
        }
        this.makeRequestForItems();
        if (!this.props.parentProps.tip) {
            this.setState({tip: 0.00});
        }
        let last_page = this.props.parentProps.lastPage;
        if (last_page === "Home") {
            this.makeRequestForPeople();
        }
        else {
            this.getUserId();
        }
    }

    getUserId = () => {
        fetch(hosturl+'chop/check_logged_in/')
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((responseJson) => {
               let user_id = responseJson["user_id"];
               for (let i = 0; i < this.state.people.length; ++i) {
                   if (this.state.people[i]["friend"] === "You") {
                       let temp_people =  this.state.people;
                       temp_people[i]["id"] = (user_id * 1);
                       let temp_ids = this.state.ids;
                       let id_int = user_id * 1;
                       temp_ids.push(id_int);
                       this.setState({people: temp_people, ids: temp_ids});
                           break;
                   }
                   if (this.state.people[i]["id"] = user_id) {
                       let temp_people =  this.state.people;
                       temp_people[i]["friend"] = "You";
                       this.setState({people: temp_people});
                       break;
                   }
               }
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    };

    getContacts = () => {
        var Contacts = require('react-native-contacts');
        Contacts.getAll((err, contacts) => {
            if (err === 'denied') {
                alert("could not get contacts");
            } else {
                let temp_contacts = contacts;
                for (let i = 0; i < contacts.length; i++) {
                    temp_contacts[i]["type"] = "contact";
                }
                let prev_contacts = this.state.contacts;
                temp_contacts = temp_contacts.concat(prev_contacts);
                this.setState({contacts: temp_contacts});
            }
        });
    };

    getGroups = () => {
        fetch(hosturl+'chop/get_user_groups/')
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((responseJson) => {
                let temp_contacts = this.state.contacts;
                let temp_groups = responseJson["groups"];
                for (let i = 0; i < temp_groups.length; i++) {
                    temp_groups[i]["type"] = "group";
                }
                temp_contacts = temp_contacts.concat(temp_groups);
                this.setState({contacts: temp_contacts});
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    };

    makeRequestForPeople = () => {
        let receipt_id = this.props.parentProps.receipt_id;
        fetch(`${hosturl}chop/get_people_for_receipt/${receipt_id}`)
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((responseJson) => {
                let temp_people = responseJson["people"];
                let temp_ids = [];
                for (let i = 0; i < temp_people.length; ++i) {
                    temp_people[i]["isCollapsed"] = false;
                    temp_ids.push(temp_people[i]["id"]);
                }
                this.setState({people: temp_people, ids: temp_ids});
                this.getUserId();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    makeRequestForItems = () => {
        let items = this.props.parentProps.items;
        let last_page = this.props.parentProps.lastPage;
        let receipt_id = this.props.parentProps.receipt_id;
        if (last_page === "Home") {
            fetch(`${hosturl}chop/get_items_for_receipt/${receipt_id}`)
                .then((response) => {
                    if (!response.ok) throw Error(response.statusText);
                    return response.json();
                })
                .then((responseJson) => {
                    let prev_items = responseJson["items"];
                    let temp_total = 0;
                    for (let i = 0; i < prev_items.length; ++i) {
                        temp_total += (prev_items[i]["cost"] * 1).toFixed(2);
                    }
                    this.setState({
                        items: prev_items,
                        openPerson: -1,
                        receipt_id: receipt_id,
                        finalCost: temp_total,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            for (let i = 0; i < items.length; i++) {
                items[i]["payers"] = [];
            }
            this.setState({
                items: items,
                openPerson: -1,
                receipt_id: receipt_id,
            });
        }
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
                    people[j].total=((people[j].total*1)+(newTotal * 1)).toFixed(2);
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
                    people[j].total = new_people_total.toFixed(2);
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
            if (items[itemIndex].payers[i]===person) {
                items[itemIndex].payers.splice(i,1);
                break;
            }
        }
        this.setState({
            items: items
        });
    };
    evaluateClick = (item, index) => {
        for (let i=0; i<item.payers.length; i++) {
            if (item.payers[i]===this.state.openPerson) {
                this.removeItem(index);
                return;
            }
        }
        this.addItem(index);
    }
    renderEntry = ({item, index}) => {
        let icon = null;
        for (let i=0; i<item.payers.length; i++) {
            if (item.payers[i]===this.state.openPerson) {
                icon = (<Icon name='check' color='#32cd32' size={20} containerStyle={styles.icon}/>);
                break;
            }
        }
        return (
            <ListItem onPress={() =>{this.evaluateClick(item, index)}}
                title={<Text>{item.name}</Text>}
                rightTitle={`$${item.cost}`}
                hideChevron={true}
                leftIcon={icon}
            />
        );
    };
    charge = () => {
        // TODO: use apis to send twilio request
        let people = [];
        for (let i=0; i<this.state.people.length; i++) {
            if (this.state.people[i].friend!=="You") {
                people.push({phoneNumber: this.state.people[i].phoneNumber,
                    amount: ((this.state.people[i].total*1)+(((this.state.people[i].total*1)/(this.props.parentProps.preTaxCost*1))*(this.props.parentProps.tip*1))).toFixed(2)});
            }
        }
        let receipt_id = this.props.parentProps.receipt_id;
        fetch('http://ec2-54-164-72-146.compute-1.amazonaws.com:8000/chop/send_notifications/', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                people: people,
                receipt_id: this.props.parentProps.receipt_id
            })
        })
            .then((res) => {
                if(res.status !== 201) {
                    alert("Could not send texts at this time");
                }
            })
            .done();
        fetch(hosturl+'chop/save_receipt/'+receipt_id+'/', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                items: this.state.items,
                people: this.state.people,
                title: "Costco"
            })
        })
            .then((res) => {
                if(res.status !== 201) {
                    alert("Couldn't save receipt");
                }
                this.props.navigation.navigate('Home');
            })
            .done();
        // for now just change text and button to reflect that people have been charged
        // save state of receipt

        this.setState({charged: true});
    };

    _handleResults = (results) => {
        // loop through results and pull out unnecessary info
        let results_temp = []
        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            if (result["type"] === "contact") {
                let temp_result = {
                    "givenName": result["givenName"],
                    "familyName": result["familyName"],
                    "phoneNumber": "",
                    "type": result["type"]
                }
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
            else {
                results_temp.push(result);
            }
        }
        this.setState({results: results_temp});
    };

    hideSearch = () => {
        this.searchBar.hide();
        this.setState({searchShown: false, results: []});
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

    addPerson = (givenName, familyName, phoneNumber) => {
        fetch(hosturl+'chop/add_user_to_app/', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                receipt_id: this.state.receipt_id,
                firstname: givenName,
                lastname: familyName,
                phone_number: phoneNumber
            })
        })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((responseJson) => {
                let personID = responseJson["user_id"];
                let personExists = false;
                for (let i=0; i<this.state.ids.length; i++) {
                    if (this.state.ids[i] === personID) {
                        personExists = true;
                    }
                }
                if (personExists === false) {
                    let people_temp = this.state.people;
                    let temp_id_list = this.state.ids;
                    temp_id_list.push(personID);
                    let person_temp = {"friend": `${givenName} ${familyName}`, "id": personID, "total": 0.00, "isCollapsed": false, "phoneNumber": phoneNumber};
                    people_temp.push(person_temp);
                    this.setState({people: people_temp, ids: temp_id_list});
                }
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    };

    addGroup = (groupID) => {
        fetch(`${hosturl}chop/get_users_in_group/${groupID}`)
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((responseJson) => {
                let people_temp = this.state.people;
                let user_list = responseJson;
                let temp_id_list = this.state.ids;
                for (let i = 0; i < user_list.length; i++) {
                    let user = user_list[i];
                    if (this.state.ids.includes(user["user_id"]) === false) {
                        temp_id_list.push(user["user_id"]);
                        let person_temp = {"friend": user["name"], "id": user["user_id"], "phoneNumber": user["phoneNumber"], "total": 0.00, "isCollapsed": false};
                        people_temp.push(person_temp);
                    }
                }
                this.setState({people: people_temp, ids: temp_id_list});
            })
            .catch((error) => {
                console.log(error);
            });
        fetch(hosturl+'chop/add_group_to_receipt', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                group_id: groupID,
                receipt_id: this.state.receipt_id
            })
        })
            .then((res) => {
                if(res.status === 201) {
                    alert("success");
                }
                else{
                    alert("Couldn't add group to receipt.");
                }
            })
            .done();
    };

    removePerson = (index, id) => {
        let people_temp = this.state.people;
        let items=this.state.items;
        for (let i=0; i<items.length; i++) {
            for (let j=0; j<items[i].payers.length; j++) {
                if (items[i].payers[j]===id) {
                    this.calculateTotal(i,false);
                    items[i].payers.splice(j,1);
                    break;
                }
            }
        }
        people_temp.splice(index, 1);
        let id_list = this.state.ids;
        for (let k=0; k<id_list.length; k++) {
            if (id_list[k] === id) {
                id_list.splice(k, 1);
                break;
            }
        }
        this.setState({people: people_temp, ids: id_list});
    };

    render() {
        let getButtonStr = () => {
            if (this.state.charged) {
                return "Resend Notification";
            }
            return "Notify People of Amounts Owed";
        };
        let getResultStr = (item) => {
            if(item.type === "contact") {
                return `${item.givenName} ${item.familyName}`;
            }
            else {
                return `${item.group_name}`;
            }
        };
        let getResultTitle = (item) => {
            if(item.type === "contact") {
                return `${item.phoneNumber}`;
            }
            else {
                return " ";
            }
        };
        let getAddFunction = (item, index) => {
            if(item.type === "contact") {
                return () =>{this.addPerson(item.givenName, item.familyName, item.phoneNumber)};
            }
            else {
                return () =>{this.addGroup(item.group_id)}
            }
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
                                    title={getResultStr(item)}
                                    rightTitle={getResultTitle(item)}
                                    hideChevron={true}
                                    onPress={getAddFunction(item, index)}
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
                                    leftIcon={<Icon name='clear' color='#ff0000' size={20} containerStyle={styles.icon} onPress={() =>{this.removePerson(index, item.id)}}/> }
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
                    <Text style={styles.footer1}>
                        {`Tip: $${this.state.tip}`}
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
            <PeopleList parentProps={this.props.navigation.state.params} navigation={this.props.navigation}/>
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
        paddingTop: 40,
        marginTop: 100
    }
});
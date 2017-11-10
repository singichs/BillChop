import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    FlatList,
    TextInput,
    View, Button, TouchableHighlight, Image
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import { List, ListItem, Icon} from 'react-native-elements';
import Collapsible from 'react-native-collapsible';

class PeopleList extends Component {
    constructor (props) {
        super(props);

        this.state = {
            people: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
        };
        this.state.people.state = { friend: '', id: 0, payers: [{name: '', quantity: 0, cost: 0}], nonPayers: [{name: '', quantity: 0, cost: 0}] };
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        // here we need to request to get contacts... or store in phone? not sure how to do this.
        fake_people = [
        {"friend": "Ramana Keerthi", "id": 0},
        {"friend": "Mazen Oweiss", "id": 1},
        {"friend": "Katie Matton", "id": 2},
        {"friend": "Sagar Singichetti", "id": 3},
        {"friend": "Will Stager", "id": 4},
        {"friend": "Joe Kunnath", "id": 5},
        {"friend": "Peter Kaplan", "id": 6}];
        for (let i=0; i<fake_people.length; i++) {
            fake_people[i]["total"]=0.00;
            fake_people[i]["isCollapsed"]=false;
        }
        let items = this.props.parentProps.items;
        for (let i=0; i<items.length; i++) {
            items[i]["payers"]=[];
        }
        this.setState({
            people: fake_people,
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
            newTotal = items[itemIndex].cost/(items[itemIndex].payers.length+1);
            if (items[itemIndex].payers.length===0){
                oldTotal = 0;
            }
            else {
                oldTotal=items[itemIndex].cost/items[itemIndex].payers.length;
            }
            for (let j=0; j<people.length; j++) {
                if (people[j].id === this.state.openPerson) {
                    people[j].total+=(newTotal);
                }
            }
        }
        else {
            oldTotal=items[itemIndex].cost/items[itemIndex].payers.length;
            if (items[itemIndex].payers.length===1){
                newTotal = 0;
            }
            else {
                newTotal=items[itemIndex].cost/(items[itemIndex].payers.length-1);
            }
            for (let j=0; j<people.length; j++) {
                if (people[j].id === this.state.openPerson) {
                    people[j].total-=newTotal;
                }
            }
        }
        for (let i=0; i<items[itemIndex].payers.length; i++) {
            for (let j=0; j<people.length; j++) {
                if (people[j].id === items[itemIndex].payers[i]) {
                    people[j].total+=(newTotal-oldTotal);
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
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    {this.props.title}
                </Text>
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
                                    title={<View>
                                        <Text>{item.friend}</Text>
                                    </View>}
                                    rightTitle={`$${item.total}`}
                                    hideChevron={true}
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
                <Button title="Continue" onPress={() => this.props.navigation.navigate('PaymentSummary')}/>
            </View>
        );
    }
}

export default class ReceiptPeople extends Component<{}> {
    static navigationOptions = {
        title: 'Edit Items',
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
        backgroundColor: '#F5FCFF'
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20
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
        fontSize: 16
    },
    icon: {
        marginRight: 20
    }
});
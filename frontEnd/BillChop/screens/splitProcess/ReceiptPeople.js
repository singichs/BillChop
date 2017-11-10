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
            fake_people[i]["payingItems"] = [];
            fake_people[i]["nonPayingItems"]=this.props.parentProps.items;
            fake_people[i]["total"]=0.00;
            fake_people[i]["isCollapsed"]=false;
        }
        this.setState({
            people: fake_people,
            openPerson: -1
        });

    };

    addItem = (itemIndex) => {
        let people = this.state.people;
        let personIndex = this.state.openPerson;
        let value = people[personIndex].nonPayingItems[itemIndex];
        people[personIndex].payingItems.push(value);
        people[personIndex].nonPayingItems.splice(itemIndex,1);
        this.setState({
            people: people
        });
    };
    removeItem = (itemIndex) => {
        let people = this.state.people;
        let personIndex = this.state.openPerson;
        let value = people[personIndex].payingItems[itemIndex];
        people[personIndex].nonPayingItems.push(value);
        people[personIndex].payingItems.splice(itemIndex,1);
        this.setState({
            people: people
        });
    };

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
                                        if (index===this.state.openPerson) {
                                            index = -1;
                                        }
                                        this.setState({
                                            openPerson: index
                                        })
                                    }}
                                    title={<View>
                                        <Text>{item.friend}</Text>
                                    </View>}
                                    rightTitle={`$${item.total}`}
                                    hideChevron={true}
                                    />
                                    <Collapsible collapsed={index!==this.state.openPerson}>
                                        <FlatList
                                            data={item.payingItems}
                                            extraData={this.state}
                                            renderItem={({item, index})  => (
                                                <ListItem
                                                    title={<Text>{item.name}</Text>}
                                                    rightTitle={`$${item.cost}`}
                                                    hideChevron={true}
                                                    leftIcon={<Icon name='clear' color='#ff0000' size={20} containerStyle={styles.icon} onPress={() =>{this.removeItem(index)}} />}
                                                />
                                            )}
                                            keyExtractor={(item, index) => index}
                                        />
                                        <FlatList
                                            data={item.nonPayingItems}
                                            extraData={this.state}
                                            renderItem={({item, index})  => (
                                                <ListItem
                                                    title={<Text>{item.name}</Text>}
                                                    rightTitle={`$${item.cost}`}
                                                    hideChevron={true}
                                                    leftIcon={<Icon name='add' color='#32cd32' size={20} containerStyle={styles.icon} onPress={() =>{this.addItem(index)}}/>}
                                                />
                                            )}
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
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    FlatList,
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
                console.log(error);
            });
};

    render() {
        let getString = (item) => {
            if (item.item.is_owner) {
                return `You are owed $${item.item.cost}`;
            }
            return `You owe ${item.item.owner} $${item.item.total_cost}`;
        };
        let getDate = (item) => {
            curr_date = new Date(item.item.timestamp);
            date_str = curr_date.toLocaleString('en-US');
            return date_str;
        };
        return (
            <View>
                <Text style={styles.text}> {"Group History"} </Text>
                <List>
                    <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <ListItem
                            title={getString({item})}
                            subtitle={getDate({item})}
                            rightTitle={item.title}
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
        fetch(`${hosturl}chop/get_users_in_group/${gID}`)
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((responseJson) => {
                this.setState({data: responseJson});
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        return (
            <View>
                <Text style={styles.text}> {"Group Members"} </Text>
                <List>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => (
                            <ListItem
                                title={item.name}
                                hideChevron={true}
                            />
                        )}
                        keyExtractor={item => item.user_id}
                    />
                </List>
            </View>
        );
    }
}



export default class Home extends Component<{}> {
    static navigationOptions = {
        title: 'Group History',
    };
    render() {
        return (
            <View style={styles.container}>
                <TransactionHistory navigation={this.props.navigation}/>
                <GroupMembers navigation={this.props.navigation}/>
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
    titleText: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20
    },
    text: {
        paddingTop: 20,
        fontWeight: 'bold',
        paddingLeft: 5,
    },
});
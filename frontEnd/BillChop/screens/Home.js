import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    FlatList,
    Text,
    Image,
    tintColor,
    View, Button, TouchableHighlight
} from 'react-native';
import { List, ListItem} from 'react-native-elements';
import {hosturl} from './../constants.js';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class TransactionList extends Component {
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
        fetch(hosturl+'chop/get_user_payments/')
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((responseJson) => {
                console.log(responseJson["payments"]);
                this.setState({data: responseJson["payments"]});
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        let getString = (item) => {
            if (item.item.is_owner) {
                return (<Text>You are owed ${item.item.cost}</Text>);
            }
            return (<Text>You owe {item.item.owner} ${item.item.cost}</Text>);
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
        let getColor = (item) => {
            if (item.item.is_owner) {
                return "#e4fcd6";
            }
            return "#eafafc";
        }
        return (
            <View>
                {this.state.data.length < 1 && <Text style={styles.titleText}>No transaction history to show</Text>}
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => (
                            <ListItem
                                containerStyle={{borderColor: "#FFFFFF", borderWidth: 1, backgroundColor: getColor({item})}}
                                title={
                                    <View>
                                        {getString({item})}
                                    </View>}
                                subtitle={getDate({item})}
                                rightTitle={getTitle(item)}
                                rightTitleStyle = {{color: "#000000"}}
                                onPress={() => this.props.screenProps.rootNavigation.navigate('ReceiptPeople', {items: [],
                                    title: "",
                                    preTaxCost: 0.00,
                                    tax: 0.00,
                                    finalCost: 0.00,
                                    receipt_id: item.receipt_id,
                                    lastPage: "Home",
                                })}
                            />
                        )}
                        keyExtractor={item => item.receipt_id}
                    />
            </View>
        );
    }
}



export default class Home extends Component<{}> {
    static navigationOptions = {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintcolor }) => (
            <Image
                source={require('../images/home-icon.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };
    render() {
        return (
            <View style={styles.container}>
                <TransactionList screenProps={this.props.screenProps}/>
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
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20
    },
    icon: {
        height: 30,
        width: 30
    },
});
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    FlatList,
    Text,
    View, Button, TouchableHighlight
} from 'react-native';
import { List, ListItem} from 'react-native-elements';

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
        fetch('http://127.0.0.1:8000/chop/get_user_payments/1')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({data: responseJson["payments"]});
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render() {
        let getString = (item) => {
            if (item.item.is_owner) {
                return `You are owed $${item.item.cost}`;
            }
            return `You owe ${item.item.owner} $${item.item.cost}`;
        };
        let getDate = (item) => {
           curr_date = new Date(item.item.timestamp);
           date_str = curr_date.toLocaleString('en-US');
           return date_str;
        };
        return (
            <View>
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
                                onPress={() => this.props.screenProps.rootNavigation.navigate('TransactionView', {transactionid: item.id})}
                            />
                        )}
                        keyExtractor={item => item.receipt_id}
                    />
                </List>
            </View>
        );
    }
}



export default class Home extends Component<{}> {
    static navigationOptions = {
        title: 'Home',
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
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20
    },
});
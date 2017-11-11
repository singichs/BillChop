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
        // TODO hit api endpoints for 1) logged in user's unsaved receipts and 2) their transaction history

        const fake_data = [{"owner": "Ramana Keerthi", "cost": "40.00", "is_owner": true,"date":  "Fri Nov 10 2017 16:17:03 GMT-0500 (EST)", "title": "Costco", "id": 0},
            {"owner": "Mazen Oweiss", "cost": "123.00", "is_owner": false, "title": "Target","date":  "Fri Nov 10 2017 16:17:03 GMT-0500 (EST)", "id": 1},
            {"owner": "Katie Matton", "cost": "84.34", "is_owner": true, "title": "Meijer","date":  "Fri Nov 10 2017 16:17:03 GMT-0500 (EST)", "id": 2}];
        this.setState({data: fake_data});
    };

    render() {
        let getString = (item) => {
            if (item.item.is_owner) {
                return `You are owed $${item.item.cost}`;
            }
            return `You owe ${item.item.owner} $${item.item.cost}`;
        };
        let getDate = (item) => {
           curr_date = new Date(item.item.date);
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
                        keyExtractor={item => item.id}
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
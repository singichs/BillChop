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
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        // for now, just dummy data later will actually make api request
        // this link is useful: https://medium.com/react-native-development/
        // how-to-use-the-flatlist-component-react-native-basics-92c482816fe6

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
        getDate = (item) => {
           curr_date = new Date(item.item.date);
           date_str = curr_date.toLocaleString('en-US');
           return date_str;
        };
        return (
            <List>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <ListItem
                            title={getString({item})}
                            subtitle={getDate({item})}
                            rightTitle={item.title}
                            onPress={() => this.props.screenProps.rootNavigation.navigate('TransactionView', {transactionid: item.id})}
                        />
                    )}
                    keyExtractor={item => item.id}
                />
            </List>
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
});
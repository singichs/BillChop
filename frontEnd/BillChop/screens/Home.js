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

        const fake_data = [{"owner": "Ramana Keerthi", "cost": "40.00", "is_owner": true, "title": "Costco", "id": 0},
            {"owner": "Mazen Oweiss", "cost": "123.00", "is_owner": false, "title": "Target", "id": 1},
            {"owner": "Katie Matton", "cost": "84.34", "is_owner": true, "title": "Meijer", "id": 2}];
        this.setState({data: fake_data});
    };

    render() {
        getString = (item) => {
            if (item.item.is_owner) {
                return `You are owed $${item.item.cost}`;
            }
            return `${item.item.owner} owes you $${item.item.cost}`;
        }
        return (
            <List>
                <FlatList
                    data={this.state.data}
                    style={{flex: 1, flexDirection: 'row'}}
                    renderItem={({ item }) => (
                        <ListItem
                            title={getString({item})}
                            subtitle={item.title}
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
                <TransactionList/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
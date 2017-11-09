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

class PeopleList extends Component {
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

        const fake_data = [
            {"friend": "EECS 441", "group": true, "id": 7},
            {"friend": "Ramana Keerthi", "group": false, "id": 0},
            {"friend": "Mazen Oweiss", "group": false, "id": 1},
            {"friend": "Katie Matton", "group": false, "id": 2},
            {"friend": "Sagar Singichetti", "group": false, "id": 3},
            {"friend": "Will Stager", "group": false, "id": 4},
            {"friend": "Joe Kunnath", "group": false, "id": 5},
            {"friend": "Peter Kaplan", "group": false, "id": 6}];

        this.setState({data: fake_data});
    };

    render() {
        getString = (item) => {
            return item.item.friend;
        }
        return (
            <List>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <ListItem
                            title={getString({item})}
                            subtitle={item.title}
                            onPress={() => this.props.screenProps.rootNavigation.navigate('TransactionView', {transactionid: item.id})}
                        />
                    )}
                    keyExtractor={item => item.id}
                />
            </List>
        );
    }
}



export default class FriendList extends Component<{}> {
    static navigationOptions = {
        title: 'Friends and Groups',
    };
    render() {
        return (
            <View style={styles.container}>
                <PeopleList screenProps={this.props.screenProps}/>
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
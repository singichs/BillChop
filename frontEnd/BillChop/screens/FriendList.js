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
        fetch('http://127.0.0.1:8000/chop/get_user_groups/')
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((responseJson) => {
                this.setState({data: responseJson["groups"]});
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        let getName = (item) => {
            return item.group_name;
        }
        return (
            <View style={styles.container}>
                <Button style={styles.button} title={"Create New Group"} onPress={() =>{this.props.screenProps.rootNavigation.navigate('AddGroup')}}/>
                <List>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => (
                            <ListItem
                                title={getName(item)}
                                subtitle={item.title}
                                onPress={() => this.props.screenProps.rootNavigation.navigate('TransactionHistory', {transactionid: item.group_id})}
                            />
                        )}
                        keyExtractor={item => item.group_id}
                    />
                </List>
            </View>
        );
    }
}



export default class FriendList extends Component<{}> {
    static navigationOptions = {
        title: 'Groups',
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
    button: {
        paddingTop: 40
    }
});
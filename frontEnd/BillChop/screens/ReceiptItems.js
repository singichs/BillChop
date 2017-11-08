import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    FlatList,
    View, Button, TouchableHighlight, Image
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import { List, ListItem} from 'react-native-elements';

class ItemList extends Component {
    constructor (props) {
        super(props);

        this.state = {
            loading: false,
            data: {},
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
        // here we need to request OCR results from image - for now use fake data
        let image = this.props.image;

        const fake_data = {"title": "Aroma Cafe", "preTaxCost": 81.52, "tax": 9.00, "finalCost": 90.52,
                           "items": [{"name": "ginger carrot soup", "quantity": 1, "cost": 6.79},
                               {"name": "house salad", "quantity": 1, "cost": 7.69}, {"name": "surf and turf", "quantity": 1, "cost": 48.79},
                               {"name": "wine - glass", "quantity": 1, "cost": 11.50}, {"name": "chocolate cake", "quantity": 1, "cost": 6.75}]};

        this.setState({data: fake_data});
    };

    render() {
        let list_data = this.state.data["items"];
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    {this.state.data.title}
                </Text>
                <List>
                    <FlatList
                        data={list_data}
                        renderItem={({ item }) => (
                            <ListItem
                                title={item.name}
                                rightTitle={`$${item.cost}`}
                                hideChevron={true}
                            />
                        )}
                        keyExtractor={(item, index) => index}
                    />
                </List>
                <Text style={styles.footer1}>
                    {`Sub-Total: $${this.state.data.preTaxCost}`}
                </Text>
                <Text style={styles.footer1}>
                    {`Tax: $${this.state.data.tax}`}
                </Text>
                <Text style={styles.footer2}>
                    {`Total: $${this.state.data.finalCost}`}
                </Text>
            </View>
        );
    }
}

export default class ReviewCapture extends Component<{}> {
    static navigationOptions = {
        title: 'Edit Items',
    };

    render() {
        return (
            <ItemList image= {this.props.navigation.state.params.image} />
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
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
    }
});
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

class ItemList extends Component {
    constructor (props) {
        super(props);

        this.state = {
            loading: false,
            items: [],
            receipt_id: 0,
            title: "",
            preTaxCost: 0,
            tax: 0,
            finalCost: 0,
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            newItemName: "",
            newItemCost: "",
        };
    }

    componentDidMount() {
        this.updateState();
    }

    updateState = () => {
        // here we need to request OCR results from image - for now use fake data
        let data = this.props.navigation.state.params.data;
        let preTaxCost = 0.00;
        for (let i=0; i<data.items.length; i++) {
            preTaxCost+=(1*data.items[i].cost);
        }
        preTaxCost = preTaxCost.toFixed(2);
        this.setState({title: "Costco",
                        receipt_id: data.receipt_id,
                        preTaxCost: preTaxCost,
                        tax: 0,
                        finalCost: preTaxCost,
                        items: data.items});

    };


    deleteItem = (index) => {
        let items = this.state.items;
        let preTaxCost = (this.state.preTaxCost - this.state.items[index].cost).toFixed(2);
        let finalCost = (this.state.finalCost - this.state.items[index].cost).toFixed(2);
        items.splice(index,1);
        this.setState({items: items,
            preTaxCost: preTaxCost,
            finalCost: finalCost});
    };

    addItem = () => {
        let items=this.state.items;
        items.push({"name": this.state.newItemName, "quantity": 1, "cost": this.state.newItemCost});
        let preTaxCost=((this.state.preTaxCost * 1) + (this.state.newItemCost * 1)).toFixed(2);
        let finalCost = ((this.state.finalCost * 1) + (this.state.newItemCost * 1)).toFixed(2);
        this.setState({items: items,
            preTaxCost: preTaxCost,
            finalCost: finalCost,
            newItemCost: "",
            newItemName: ""});
    }


    renderFooter = () => {
        return <ListItem
                    title={<TextInput onChangeText={(text) => this.setState({newItemName: text})} placeholder="Add new item" value={this.state.newItemName}/>}
                    textInputPlaceholder="Cost: $0.00"
                    textInput = {true}
                    textInputValue = {this.state.newItemCost}
                    textInputOnChangeText = {(text) => this.setState({newItemCost: text})} //fix this to be new function
                    hideChevron={true}
                    leftIcon={<Icon name='add' color='#32cd32' size={20} containerStyle={styles.icon} onPress={() =>{this.addItem()}}/>}/>;
    };

    changeItemName = (index, text) => {
        let items = this.state.items;
        items[index]["name"] = text;
        this.setState({items: items});
    };

    continueToNextPage = () => {

        fetch(hosturl+'chop/create_group/', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                receipt_id: this.state.receipt_id,
                items: this.state.items,
                tax: this.state.tax,
                total_cost: this.state.finalCost
            })
        })
            .then((res) => {
                if(res.status === 201) {
                    this.props.navigation.navigate('ReceiptPeople', {items: this.state.items,
                        title: this.state.title,
                        preTaxCost: this.state.preTaxCost,
                        tax: this.state.tax,
                        finalCost: this.state.finalCost});
                }

                else{
                    alert("Invalid receipt item actions");
                }
            })
            .done();
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    {this.state.title}
                </Text>
                <List>
                    <FlatList
                        data={this.state.items}
                        extraData={this.state}
                        renderItem={({item, index})  => (
                            <ListItem
                                title={<TextInput onChangeText={(text) => this.changeItemName(index, text)} value={item.name}/>}
                                rightTitle={`$${item.cost}`}
                                hideChevron={true}
                                leftIcon={<Icon name='clear' color='#ff0000' size={20} containerStyle={styles.icon} onPress={() =>{this.deleteItem(index) }} />}
                            />
                        )}
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={this.renderFooter}
                    />
                </List>
                <View style={styles.summary}>
                <Text style={styles.footer1}>
                    {`Sub-Total: $${this.state.preTaxCost}`}
                </Text>
                <Text style={styles.footer1}>
                    {`Tax: $${this.state.tax}`}
                </Text>
                <Text style={styles.footer2}>
                    {`Total: $${this.state.finalCost}`}
                </Text>
                </View>
                <Button title="Continue to Item Assignment" onPress={() => {this.continueToNextPage()}}/>
            </View>
        );
    }
}

export default class ReceiptItems extends Component<{}> {
    static navigationOptions = {
        title: 'Edit Items',
    };

    render() {
        return (
            <ItemList image= {this.props.navigation.state.params.image} navigation={this.props.navigation} />
        );
    }

}

const styles = StyleSheet.create({
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
        fontSize: 16,
        paddingBottom: 20
    },
    icon: {
        marginRight: 20
    }
});
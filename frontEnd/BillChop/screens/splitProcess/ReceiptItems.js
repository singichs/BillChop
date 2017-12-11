import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    FlatList,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    View, Button, TouchableHighlight, Image
} from 'react-native';
import {hosturl} from "../../constants";
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
            tax: 0.00,
            tip: 0.00,
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
        this.setState({title: "",
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
                    containerStyle={{backgroundColor: "#FFFFFF"}}
                    title={<TextInput onChangeText={(text) => this.setState({newItemName: text})} placeholder="Add new item" value={this.state.newItemName}/>}
                    textInputPlaceholder="Cost: $0.00"
                    textInput = {true}
                    textInputValue = {this.state.newItemCost}
                    textInputOnChangeText = {(text) => this.setState({newItemCost: text})}
                    hideChevron={true}
                    leftIcon={<Icon name='add' color='#32cd32' size={20} containerStyle={styles.icon} onPress={() =>{this.addItem()}}/>}/>;
    };

    changeItemName = (index, text) => {
        let items = this.state.items;
        items[index]["name"] = text;
        this.setState({items: items});
    };
    changeTax = (text) => {
        if (isNaN(text)) {
            return;
        }
        let total = this.state.finalCost;
        let oldTax = this.state.tax;
        total=((total*1)-(oldTax*1)).toFixed(2);
        total=((total*1)+(text*1)).toFixed(2);
        this.setState({tax: text, finalCost: total});
    };
    changeTip = (text) => {
        if (isNaN(text)) {
            return;
        }
        let total = this.state.finalCost;
        let oldTip = this.state.tip;
        total=((total*1)-(oldTip*1)).toFixed(2);
        total=((total*1)+(text*1)).toFixed(2);
        this.setState({tip: text, finalCost: total});
    };
    changeItemCost = (index, cost)=> {
        if (isNaN(cost)) {
            return;
        }
        let items = this.state.items;
        let oldCost = items[index].cost;
        items[index]["cost"] = cost;
        let preTaxCost = ((this.state.preTaxCost*1)-(oldCost*1)+(cost*1)).toFixed(2);
        let finalCost = ((this.state.finalCost*1)-(oldCost*1)+(cost*1)).toFixed(2);
        this.setState({items: items, preTaxCost: preTaxCost, finalCost: finalCost});
    }

    continueToNextPage = () => {

        fetch(hosturl+'chop/add_receipt_information/', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                receipt_id: this.state.receipt_id,
                items: this.state.items,
                tax: this.state.tax,
                tip: this.state.tip,
                total_cost: this.state.finalCost
            })
        })
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then((responseJson) => {
                let item_list = responseJson["items"];
                this.props.navigation.navigate('ReceiptPeople', {items: item_list,
                    title: this.state.title,
                    preTaxCost: this.state.preTaxCost,
                    tax: this.state.tax,
                    tip: this.state.tip,
                    finalCost: this.state.finalCost,
                    receipt_id: this.state.receipt_id,
                    lastPage: "ReceiptItems",
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <KeyboardAvoidingView behavior="padding" style={styles.logoContainer}>
                <TextInput style={styles.header} onChangeText={(text) => this.setState({title: text})} placeholder={`Enter Receipt Name`} value={`${this.state.title}`}/>
                    <FlatList
                        style={{flex: 0.7}}
                        keyboardShouldPersistTaps="always"
                        data={this.state.items}
                        extraData={this.state}
                        renderItem={({item, index})  => (
                            <ListItem
                                title={<TextInput onChangeText={(text) => this.changeItemName(index, text)} value={item.name}/>}
                                textInputPlaceholder="Cost: $0.00"
                                textInput = {true}
                                textInputValue = {item.cost}
                                textInputOnChangeText = {(text) => this.changeItemCost(index,text)}
                                hideChevron={true}
                                containerStyle={{backgroundColor: "#FFFFFF"}}
                                leftIcon={<Icon name='clear' color='#ff0000' size={20} containerStyle={styles.icon} onPress={() =>{this.deleteItem(index) }} />}
                            />
                        )}
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={this.renderFooter}
                    />
                <View style={{flex: .3}}>
                    <Text style={styles.footer1}>
                        {`Sub-Total: $${this.state.preTaxCost}`}
                    </Text>
                    <View style={styles.container2}>
                        <Text style={styles.taxFooter}>{"Tax: $"}</Text>
                        <TextInput onChangeText={(text) => this.changeTax(text)} placeholder={`${this.state.tax}`} value={`${this.state.tax}`} style={styles.inputFooter}/>
                    </View>
                    <View style={styles.container2}>
                        <Text style={styles.taxFooter}>{"Tip: $"}</Text>
                        <TextInput onChangeText={(text) => this.changeTip(text)} placeholder={`${this.state.tip}`} value={`${this.state.tip}`} style={styles.inputFooter}/>
                    </View>
                    <Text style={styles.footer2}>
                        {`Total: $${this.state.finalCost}`}
                    </Text>
                </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => {this.continueToNextPage()}}>
                    <Text style={styles.buttonText}>Continue to Item Assignment</Text>
                </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
            </TouchableWithoutFeedback>
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
    container2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 6,
        paddingTop: 5
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
        height: 40,
        backgroundColor: "#FFFFFF"
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
    taxFooter: {
        fontSize: 16
    },
    inputFooter: {
        fontSize: 16,
        height: 20,
        width: 50,
        backgroundColor: '#D3D3D3',
        textAlign: 'center'
    },
    icon: {
        marginRight: 20
    },
    buttonContainer: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#00e68a',
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    logoContainer: {
        flexGrow: 1,
    },
});
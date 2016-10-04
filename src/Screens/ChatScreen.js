
import React, {Component} from 'react';
import {ScrollView,View, ListView, Text, TextInput, TouchableOpacity,StyleSheet} from 'react-native';
import * as firebase from 'firebase';
import _ from 'lodash';

const config = {
    apiKey: "AIzaSyAqAZZ3QDgkHOlSUUMAGQHkZ3pFu6RsivI",
    authDomain: "coolachat.firebaseapp.com",
    databaseURL: "https://coolachat.firebaseio.com",
    storageBucket: "coolachat.appspot.com",
    messagingSenderId: "126648806134"
};
const firebaseApp = firebase.initializeApp(config);
export default class ChatScreen extends Component{

    constructor(props) {
        super(props);
        this.state={
            ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            message: ''
        };
        this.db = firebaseApp.database().ref('/channels/' + props.channel);
    }

    render(){
        return <View style={styles.container}>
            <ListView
                ref='listView'
                style={styles.messagesContainer}
                dataSource={this.state.ds}
                renderHeader={this.renderHeader.bind(this)}
                renderRow={(row)=>this.renderRow(row)}
            />

            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    onChangeText={(message) => this.setState({message})}
                    value={this.state.message}
                />
                <TouchableOpacity onPress={() => this.send()}>
                    <Text style={styles.send}>
                        Send!
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    }
    renderHeader(){
        return <TouchableOpacity onPress={()=>this.props.navigator.pop()}><Text style={styles.changeChannel}>Change Channel</Text></TouchableOpacity>
    }
    componentDidMount() {
        this.db.on('value', (snap) => {
            const messages = [];
            snap.forEach((item) => {
                messages.push(item.val());
            });

            _.sortBy(messages, 'timestamp');

            this.setState({
                ds: this.state.ds.cloneWithRows(messages)
            });
        });
    }
    send() {
        this.db.push({
            sender: this.props.user,
            text: this.state.message,
            timestamp: Date.now()
        });
        this.setState({message:''})
    }
    renderRow(row) {
        const me = row.sender === this.props.user;
        return (
            <View style={styles.listRow}>
                <Text style={me? styles.listSenderMe : styles.listSender}>
                    {row.sender}
                </Text>


                <Text style={styles.listText}>
                    {row.text}
                </Text>
            </View>
        )
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputRow:{
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        flex:1,
        flexDirection: 'row',
        backgroundColor: '#F6F6F6',
        height:40

    },
    row:{
        flexDirection: 'row'
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: 'grey',
        alignSelf: 'center'
    },
    send:{
        color: 'blue',
        padding: 10
    },
    listRow:{
        padding:10
    },
    listSender:{
        fontSize: 16,
        color: 'green'
    },
    listSenderMe:{
        fontSize: 16,
        color: 'blue'
    },
    listText:{
        fontSize:20
    },
    messagesContainer:{
        flex:1,
        marginBottom:40
    },
    changeChannel:{
        textAlign:'center',
        color: 'black',
        height: 20
    }
});
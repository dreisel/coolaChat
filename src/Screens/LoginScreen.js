/**
 * Created by daniel on 10/4/16.
 */

import React, {Component} from 'react';
import {View,Image,StyleSheet,TextInput,TouchableOpacity,Text} from 'react-native';

export default class LoginScreen extends Component{

    constructor(props){
        super(props);
        this.state = {
            user: "",
            channel: "",
        }
    }

    render(){

        return <View style={styles.container}>
            <Image source={{uri:"http://2s7gjr373w3x22jf92z99mgm5w-wpengine.netdna-ssl.com/wp-content/uploads/2013/10/cooladata_logo.png"}}
                    style={styles.logo}/>
            <Text>Enter Name:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(user) => this.setState({user})}
                value={this.state.user}/>
            <Text>Enter Channel:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(channel) => this.setState({channel})}
                value={this.state.channel}/>
            <TouchableOpacity onPress={() => this.enterChat()}>
                <Text style={styles.go}>
                    Chat!
                </Text>
            </TouchableOpacity>

        </View>
    }

    enterChat(){
        this.props.navigator.push(
            {
                id: 'chatRoom',
                user:this.state.user,
                channel:this.state.channel
            }
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    logo: {
        height: 120,
        width:250,
        margin: 10,
    },
    input: {
        flexDirection:'row',
        width: 250,
        height: 40,
        borderWidth: 0,
        borderColor: 'grey',
        alignSelf: 'center'
    },
    go:{
        color:'green'
    }
});
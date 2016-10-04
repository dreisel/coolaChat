/**
 * Created by daniel on 10/4/16.
 */

import React, { Component } from 'react';
import {StyleSheet,Navigator} from 'react-native';
import LoginScreen from './Screens/LoginScreen';
import ChatScreen from './Screens/ChatScreen';

export default class App extends Component{
    render() {
        return (
            <Navigator
                style={styles.container}
                initialRoute={{id: 'logIn'}}
                renderScene={(route, navigator) => {
                    switch (route.id) {
                        case 'logIn':
                            return (<LoginScreen navigator={navigator}/>);
                        case 'chatRoom':
                            return (<ChatScreen navigator={navigator} user={route.user} channel={route.channel}/>);
                    }
                }}/>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});


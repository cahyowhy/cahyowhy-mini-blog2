/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Route from './src/router/router';

export default class miniblog extends Component {
    render() {
        return (
            <Route/>
        );
    }
}

AppRegistry.registerComponent('miniblog', () => miniblog);

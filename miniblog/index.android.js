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
import createReduxStore from './src/redux/createReduxStore';
import {Provider} from 'react-redux';
const store = createReduxStore();

export default class miniblog extends Component {
    render() {
        return (
            <Provider store={store}>
                <Route/>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('miniblog', () => miniblog);

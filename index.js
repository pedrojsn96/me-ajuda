/**
 * @format
 */

import React, {Component} from "react"
import App from './src/App';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import regionReducer from "./src/reducers/region/reducer";
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';
import promise from 'redux-promise';
import multi from 'redux-multi';

const reducers = combineReducers({
    regionState: regionReducer
});

const store = applyMiddleware(multi, promise, thunk)(createStore)(reducers);
export default class App_reducer extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}
AppRegistry.registerComponent(appName, () => App_reducer);

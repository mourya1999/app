/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);


import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { ProfileProvider } from './src/redux/ProfileContext';

const Root = () => (
  <Provider store={store}>
    <ProfileProvider>
         <App />
    </ProfileProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);

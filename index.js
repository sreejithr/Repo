/**
 * Liftoff Assignment
 * Sreejith R
 * @flow
 */

import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import { Provider } from 'react-redux';

import configureStore from './configureStore';
import Home from './src/Home';
import RepoDetail from './src/RepoDetail';

const store = configureStore();

export default class Repos extends Component {
  render() {
    return (
        <Provider store={store}>
          <Router>
            <Stack key="root">
              <Scene key="home" component={Home} title="Repos" />
              <Scene key="repoDetail" component={RepoDetail} />
            </Stack>
          </Router>
        </Provider>
    );
  }
}

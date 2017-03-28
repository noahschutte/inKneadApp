import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import codePush from 'react-native-code-push';
import reducers from './reducers';
import Router from './Router';

const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

class inknead extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

/* eslint no-class-assign: off */
inknead = codePush(codePushOptions)(inknead);

export default inknead;

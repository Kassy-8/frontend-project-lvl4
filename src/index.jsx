// @ts-check

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import store from './store.js';
import Router from './components/Router.jsx';
import WebSocketProvider from './components/WebsocketProvider.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render(
  <Provider store={store}>
    <WebSocketProvider>
      <Router />
    </WebSocketProvider>
  </Provider>, document.getElementById('chat'),
);

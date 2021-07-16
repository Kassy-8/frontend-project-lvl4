// @ts-check

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import store from './store.js';
import Router from './components/Router.jsx';
import WebSocketProvider from './components/WebsocketProvider.jsx';
import i18n from './i18n.js';

// if (process.env.NODE_ENV !== 'production') {
//   localStorage.debug = 'chat:*';
// }

export default () => {
  ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <WebSocketProvider>
          <Router />
        </WebSocketProvider>
      </Provider>
    </I18nextProvider>, document.getElementById('chat'),
  );
};

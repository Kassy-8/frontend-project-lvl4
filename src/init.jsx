// @ts-check

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import store from './store.js';
import Router from './components/Router.jsx';
import WebSocketProvider from './components/WebsocketProvider.jsx';
import i18n from './i18n.js';
// import rollbar from './Rollbar.js';

// if (process.env.NODE_ENV !== 'production') {
//   localStorage.debug = 'chat:*';
// }

const rollbarConfig = {
  accessToken: '90cd99e1620d4d088f9921fe33520b6e',
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

export default () => {
  ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <Provider store={store}>
            <WebSocketProvider>
              <Router />
            </WebSocketProvider>
          </Provider>
        </ErrorBoundary>
      </RollbarProvider>
    </I18nextProvider>, document.getElementById('chat'),
  );
};

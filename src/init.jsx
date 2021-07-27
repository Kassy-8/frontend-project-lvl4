// @ts-check

import React from 'react';
// import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary, LEVEL_WARN } from '@rollbar/react';
import { io } from 'socket.io-client';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';

import store from './store';
import Router from './components/Router.jsx';
import WebSocketProvider from './components/WebsocketProvider.jsx';
import ErrorBoundaryWindow from './components/ErrorBoundaryWindow.jsx';
import translation from './assets/locale/ruLocale.js';

const App = (socketClient = io()) => {
  const i18nInstance = i18n.createInstance();
  i18nInstance
    .use(initReactI18next)
    .init({
      lng: 'ru',
      debug: process.env.NODE_ENV === 'development',
      interpolation: {
        escapeValue: false,
      },
      resources: {
        ru: translation,
      },
    });

  const rollbarConfig = {
    accessToken: '90cd99e1620d4d088f9921fe33520b6e',
    environment: 'production',
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  return (
    <I18nextProvider i18n={i18nInstance}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary level={LEVEL_WARN} fallbackUI={ErrorBoundaryWindow}>
          <Provider store={store}>
            <WebSocketProvider socket={socketClient}>
              <Router />
            </WebSocketProvider>
          </Provider>
        </ErrorBoundary>
      </RollbarProvider>
    </I18nextProvider>
  );
};

export default App;

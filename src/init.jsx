// @ts-check

import React from 'react';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary, LEVEL_WARN } from '@rollbar/react';
import { io } from 'socket.io-client';
import 'dotenv/config';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';

import store from './store';
import App from './App.jsx';
import ErrorBoundaryPage from './pages/ErrorBoundaryPage.jsx';
import translation from './assets/locale/ruLocale.js';

const init = async (socketClient = io()) => {
  const i18nInstance = i18n.createInstance();
  await i18nInstance
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
    accessToken: 'process.env.ROLLBAR_ACCESS_TOKEN',
    environment: 'production',
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  return (
    <I18nextProvider i18n={i18nInstance}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary level={LEVEL_WARN} fallbackUI={ErrorBoundaryPage}>
          <Provider store={store}>
            <App socketClient={socketClient} />
          </Provider>
        </ErrorBoundary>
      </RollbarProvider>
    </I18nextProvider>
  );
};

export default init;

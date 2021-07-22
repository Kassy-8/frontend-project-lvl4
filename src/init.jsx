// @ts-check

import React from 'react';
import ReactDOM from 'react-dom';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary, LEVEL_WARN } from '@rollbar/react';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';

import App from './components/App.jsx';
import ErrorBoundaryWindow from './components/ErrorBoundaryWindow.jsx';
import translation from './assets/locale/ruLocale.js';

export default () => {
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

  document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      <I18nextProvider i18n={i18nInstance}>
        <RollbarProvider config={rollbarConfig}>
          <ErrorBoundary level={LEVEL_WARN} fallbackUI={ErrorBoundaryWindow}>
            <App />
          </ErrorBoundary>
        </RollbarProvider>
      </I18nextProvider>, document.getElementById('chat'),
    );
  });
};

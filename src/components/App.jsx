import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Router from './Router.jsx';
import WebSocketProvider from './WebsocketProvider.jsx';

const App = () => (
  <Provider store={store}>
    <WebSocketProvider>
      <Router />
    </WebSocketProvider>
  </Provider>
);

export default App;

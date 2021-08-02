import React from 'react';
import Router from './components/Router.jsx';
import AuthProvider from './components/AuthProvider.jsx';
import WebSocketProvider from './components/WebsocketProvider.jsx';

const App = ({ socketClient }) => (
  <WebSocketProvider socket={socketClient}>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </WebSocketProvider>
);

export default App;

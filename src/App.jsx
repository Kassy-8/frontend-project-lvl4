import React from 'react';
import Router from './components/Router.jsx';
import AuthProvider from './components/AuthProvider.jsx';

const App = () => (
  <AuthProvider>
    <Router />
  </AuthProvider>
);

export default App;

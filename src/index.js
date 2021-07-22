import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import app from './init.jsx';

const socketClient = io();

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    app(socketClient), document.getElementById('chat'),
  );
});

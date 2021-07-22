import { io } from 'socket.io-client';
import app from './init.jsx';

const socketClient = io();

app(socketClient);

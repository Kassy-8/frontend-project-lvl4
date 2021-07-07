// @ts-check

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import AppRouter from './Router.jsx';
import store from './store.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
export const socket = io();
socket.on('connect', () => {
  console.log('socket connect', socket.connected);
});

socket.on('disconnect', () => {
  console.log('socket connected on disconnected', socket.connected);
});

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>, document.getElementById('chat'),
);
/*
const p = document.createElement('p');
p.classList.add('card-text');
p.textContent = 'It works!';

const h5 = document.createElement('h5');
h5.classList.add('card-title');
h5.textContent = 'Project frontend l4 boilerplate';

const cardBody = document.createElement('div');
cardBody.classList.add('card-body');
cardBody.append(h5, p);

const card = document.createElement('div');
card.classList.add('card', 'text-center');
card.append(cardBody);

const container = document.querySelector('#chat');
container.append(card);

console.log('it works!');
*/

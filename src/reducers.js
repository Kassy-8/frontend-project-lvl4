/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from './routes.js';

const initStateUsers = { users: [] };

export const usersSlice = createSlice({
  name: 'users',
  initialState: initStateUsers,
  reducers: {
    addUsers: (state, action) => {
      const { payload: { user } } = action;
      state.users.push(user);
    },
  },
});

export const { addUsers } = usersSlice.actions;
export const selectUsers = (state) => state.users.users;

const initStateMessages = { byId: [], allIds: [] };

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: initStateMessages,
  reducers: {
  },
});

export const selectMessages = (state) => state.messages;

const initUIState = { currentChannel: null };

export const uiSlice = createSlice({
  name: 'uiState',
  initialState: initUIState,
  reducers: {
    toggleChannel: (state, action) => {
      const { payload: { id } } = action;
      state.currentChannel = id;
    },
  },
});

export const { toggleChannel } = uiSlice.actions;
export const selectCurrentChannel = (state) => state.uiState.currentChannel;

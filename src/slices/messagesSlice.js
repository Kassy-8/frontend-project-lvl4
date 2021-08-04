/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { fetchChannels, removeUsersChannel } from './channelsSlice.js';

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    recieveNewMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: {
    [fetchChannels]: (state, { payload }) => {
      const { messages } = payload;
      state.messages = messages;
    },
    [removeUsersChannel]: (state, { payload }) => {
      const { id } = payload;
      _.remove(state.messages, ({ channelId }) => channelId === id);
    },
  },
});

export const { fetchMessages, recieveNewMessage } = messagesSlice.actions;

export default messagesSlice.reducer;

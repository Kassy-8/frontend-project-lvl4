/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
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
      console.log('id from remove users from messages', id);
      state.messages = state.messages.filter(({ channelId }) => channelId !== id);
    },
  },
});

export const { fetchMessages, recieveNewMessage } = messagesSlice.actions;

export const selectAllMessages = (state) => state.messagesInfo.messages;

export default messagesSlice.reducer;

/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { fetchChannels, removeUserChannel } from './channelsSlice.js';

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    receiveNewMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: {
    [fetchChannels.fulfilled]: (state, { payload }) => {
      const { messages } = payload;
      state.messages = messages;
    },
    [removeUserChannel]: (state, { payload }) => {
      const { id } = payload;
      _.remove(state.messages, ({ channelId }) => channelId === id);
    },
  },
});

export const { fetchMessages, receiveNewMessage } = messagesSlice.actions;

export default messagesSlice.reducer;

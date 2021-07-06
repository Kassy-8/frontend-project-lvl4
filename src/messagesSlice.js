/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from './routes.js';
import getAuthHeader from './getAuthHeader.js';

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async () => {
  const response = await axios.get(routes.datasPath(), { headers: getAuthHeader() });
  return response.data;
});

const initStateMessages = {
  items: {
    byId: {}, allIds: [],
  },
  status: 'idle',
  error: null,
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: initStateMessages,
  reducers: {
  },
  extraReducers: {
    [fetchMessages.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchMessages.fulfilled]: (state, action) => {
      const { payload: { messages } } = action;
      state.status = 'succeeded';
      state.items.allIds = messages.map((message) => message.id);
      messages.forEach((message) => {
        state.items.byId[message.id] = message;
      });
    },
    [fetchMessages.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const selectMessages = (state) => state.messages.items;
export default messagesSlice.reducer;

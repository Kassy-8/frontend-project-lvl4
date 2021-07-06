/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from './routes.js';
import getAuthHeader from './getAuthHeader.js';

export const fetchChannels = createAsyncThunk('channels/fetchChannels', async () => {
  const response = await axios.get(routes.datasPath(), { headers: getAuthHeader() });
  return response.data;
});

const initStateChannels = {
  items: {
    byId: {}, allIds: [],
  },
  currentChannel: null,
  status: 'idle',
  error: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState: initStateChannels,
  reducers: {
    addChannels: (state, action) => {
      const { payload: { channel } } = action;
      state.items.byId[channel.id] = channel;
      state.items.allIds.push(channel.id);
    },
  },
  extraReducers: {
    [fetchChannels.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchChannels.fulfilled]: (state, action) => {
      const { payload: { channels, currentChannelId } } = action;
      state.status = 'succeeded';
      state.currentChannel = currentChannelId;
      state.items.allIds = channels.map((channel) => channel.id);
      channels.forEach((channel) => {
        state.items.byId[channel.id] = channel;
      });
    },
    [fetchChannels.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const { addChannel } = channelsSlice.actions;
export const selectChannels = (state) => state.channels.items;
export default channelsSlice.reducer;

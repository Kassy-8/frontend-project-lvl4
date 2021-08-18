/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import axios from 'axios';
import routes from '../routes.js';

export const fetchChannels = createAsyncThunk('channelsInfo/fetchChannels',
  async (headerForAuth) => {
    const { data } = await axios.get(routes.datasPath(), { headers: headerForAuth });
    return data;
  });

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
      state.currentChannelId = payload.id;
    },
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    removeUserChannel: (state, { payload }) => {
      const { id: removingId } = payload;
      _.remove(state.channels, ({ id }) => id === removingId);
      const mainChannel = state.channels.find(({ name }) => name === 'general');
      state.currentChannelId = mainChannel.id;
    },
    renameUserChannel: (state, { payload }) => {
      const { name: newName, id: renamingId } = payload;
      const renamedChannel = state.channels.find(({ id }) => id === renamingId);
      renamedChannel.name = newName;
    },
  },
  extraReducers: {
    [fetchChannels.fulfilled]: (state, { payload }) => {
      const { channels, currentChannelId } = payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
      state.status = 'succeeded';
    },
    [fetchChannels.pending]: (state) => {
      if (state.error) {
        state.error = null;
      }
      state.status = 'loading';
    },
    [fetchChannels.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const {
  addChannel,
  setCurrentChannel,
  removeUserChannel,
  renameUserChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;

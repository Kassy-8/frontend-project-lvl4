/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: {},
    currentChannelId: null,
  },
  reducers: {
    addChannel: (state, { payload }) => {
      state.channels[payload.id] = payload;
      state.currentChannelId = payload.id;
    },
    fetchChannels: (state, { payload }) => {
      const { channels, currentChannelId } = payload;
      channels.forEach((channel) => {
        state.channels[channel.id] = channel;
      });
      state.currentChannelId = currentChannelId;
    },
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    removeUsersChannel: (state, { payload }) => {
      const { id: removingId } = payload;
      state.channels = _.omit(state.channels, removingId);
      const mainChannelId = _.findKey(state.channels, { name: 'general' });
      state.currentChannelId = parseInt(mainChannelId, 10);
    },
    renameUsersChannel: (state, { payload }) => {
      const { name, id } = payload;
      state.channels[id].name = name;
    },
  },
});

export const {
  addChannel, fetchChannels, setCurrentChannel, removeUsersChannel, renameUsersChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;

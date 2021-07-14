/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import _ from 'lodash';
// import axios from 'axios';
// import routes from '../routes.js';

const channelsAdapter = createEntityAdapter({
  sortComparer: (channel1, channel2) => channel1.id - channel2.id,
});

const initState = channelsAdapter.getInitialState({
  currentChannelId: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState: initState,
  reducers: {
    addChannel: (state, { payload }) => {
      state.entities[payload.id] = payload;
      state.ids.push(payload.id);
      state.currentChannelId = payload.id;
    },
    fetchChannels: (state, { payload }) => {
      const { channels, currentChannelId } = payload;
      channelsAdapter.upsertMany(state, channels);
      state.currentChannelId = currentChannelId;
    },
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    removeUsersChannel: (state, { payload }) => {
      const { id: removingId } = payload;
      state.entities = _.omit(state.entities, removingId);
      state.ids = state.ids.filter((id) => id !== removingId);
      const mainChannelId = _.findKey(state.entities, { name: 'general' });
      state.currentChannelId = parseInt(mainChannelId, 10);
    },
    renameUsersChannel: (state, { payload }) => {
      const { name, id } = payload;
      state.entities[id].name = name;
    },
  },
});

export const {
  addChannel, fetchChannels, setCurrentChannel, removeUsersChannel, renameUsersChannel,
} = channelsSlice.actions;

export const {
  selectAll: selectAllChannels,
  selectEntities: selectAllChannelsAsObject,
  selectIds: selectChannelsIds,
  selectById: selectChannelById,
} = channelsAdapter.getSelectors((state) => state.channels);

export const selectCurrentChannelId = (state) => state.channels.currentChannelId;
export const selectCurrentChannel = (state) => selectChannelById(
  state, selectCurrentChannelId(state),
);

export default channelsSlice.reducer;

// channelsAdapter.addOne,
// fetchChannels: (state, { payload }) => {
//   const { channels, currentChannelId } = payload;
//   channelsAdapter.upsertMany(state, channels);
//   state.currentChannelId = currentChannelId;
// },
// setCurrentChannel: (state, { payload }) => {
//   state.currentChannelId = payload;
// },
// removeUsersChannel: (state, { payload }) => {
//   state
// }

// extraReducers: {
//   [fetchChannels.pending]: (state) => {
//     state.status = 'loading';
//   },
//   [fetchChannels.fulfilled]: (state, action) => {
//     const { payload: { channels, messages, currentChannelId } } = action;
//     state.status = 'succeeded';
//     state.currentChannel = currentChannelId;

//     state.channelsItems.allIds = channels.map((channel) => channel.id);
//     channels.forEach((channel) => {
//       state.channelsItems.byId[channel.id] = channel;
//     });

//     state.messages = messages;
//   },
//   [fetchChannels.rejected]: (state, action) => {
//     state.status = 'failed';
//     state.error = action.error.message;
//   },
// },

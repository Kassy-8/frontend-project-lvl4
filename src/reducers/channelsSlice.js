/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
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
    addChannels: channelsAdapter.addOne,
    fetchChannels: (state, { payload }) => {
      channelsAdapter.upsertMany(state, payload);
    },
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
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
});

// export const selectChannelsAll = (state) => state.channels.entities;
export const { fetchChannels, setCurrentChannel } = channelsSlice.actions;
export const {
  selectEntities: selectAllChannels,
  selectIds: selectChannelsIds,
  selectById: selectChannelById,
} = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;

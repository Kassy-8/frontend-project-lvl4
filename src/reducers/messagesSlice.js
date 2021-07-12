/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter({
  sortComparer: (message1, messages2) => message1.id - messages2.id,
});

const initState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: initState,
  reducers: {
    fetchMessages: (state, { payload }) => {
      messagesAdapter.upsertMany(state, payload);
    },
    recieveNewMessage: messagesAdapter.addOne,
  },
});

export const { fetchMessages, recieveNewMessage } = messagesSlice.actions;

export const {
  selectAll: selectAllMessages,
  selectIds: selectMessagesIds,
} = messagesAdapter.getSelectors((state) => state.messages);

export default messagesSlice.reducer;

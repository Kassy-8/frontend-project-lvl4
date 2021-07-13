import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from './reducers/channelsSlice.js';
import messagesSlice from './reducers/messagesSlice.js';
import modalSlice from './reducers/modalSlice.js';

export default configureStore({
  reducer: {
    channels: channelsSlice,
    messages: messagesSlice,
    modalInfo: modalSlice,
  },
});

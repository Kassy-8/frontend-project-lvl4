import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from './slices/channelsSlice.js';
import messagesSlice from './slices/messagesSlice.js';
import modalSlice from './slices/modalSlice.js';

export default configureStore({
  reducer: {
    channelsInfo: channelsSlice,
    messagesInfo: messagesSlice,
    modalInfo: modalSlice,
  },
});

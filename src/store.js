import { configureStore } from '@reduxjs/toolkit';
import { usersSlice, uiSlice } from './reducers.js';
import messagesSlice from './messagesSlice.js';
import channelsSlice from './channelsSlice.js';

export default configureStore({
  reducer: {
    messages: messagesSlice,
    users: usersSlice,
    channels: channelsSlice,
    uiState: uiSlice,
  },
});

// export default store;

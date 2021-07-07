import { configureStore } from '@reduxjs/toolkit';
import { usersSlice } from './reducers.js';
import channelsSlice from './channelsSlice.js';

export default configureStore({
  reducer: {
    users: usersSlice,
    channels: channelsSlice,
  },
});

// export default store;

/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalInitialState = {
  type: null,
  info: null,
};

const modalSlice = createSlice({
  name: 'modalInfo',
  initialState: modalInitialState,
  reducers: {
    showModal: (state, { payload }) => {
      const { modalType, channelInfo } = payload;
      state.type = modalType;
      state.info = channelInfo;
    },
    closeModal: (state) => {
      state.info = null;
      state.type = null;
    },
  },
});

export const { showModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;

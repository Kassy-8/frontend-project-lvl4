/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalInitialState = {
  type: null,
  info: null,
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'modalInfo',
  initialState: modalInitialState,
  reducers: {
    showModal: (state, { payload }) => {
      const { modalType, channelInfo } = payload;
      state.type = modalType;
      state.info = channelInfo;
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.info = null;
      state.type = null;
      state.isOpen = false;
    },
  },
});

export const { showModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;

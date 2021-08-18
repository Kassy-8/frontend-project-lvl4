/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalInitialState = {
  type: null,
  extra: null,
};

const modalSlice = createSlice({
  name: 'modalInfo',
  initialState: modalInitialState,
  reducers: {
    showModal: (state, { payload }) => {
      const { modalType, extra } = payload;
      state.type = modalType;
      state.extra = extra;
    },
    closeModal: (state) => {
      state.extra = null;
      state.type = null;
    },
  },
});

export const { showModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;

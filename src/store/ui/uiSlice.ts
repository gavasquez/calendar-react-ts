import { createSlice } from '@reduxjs/toolkit';

export interface UiState {
  isDateModalOpen: boolean,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDateModalOpen: false // is date modal open
  } as UiState,
  reducers: {
    // toggle date modal open
    onOpenDateModal: (state) => {
      state.isDateModalOpen = true;
    },
    onCloseDateModal: (state) => {
      state.isDateModalOpen = false;
    }
  }
});

export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;
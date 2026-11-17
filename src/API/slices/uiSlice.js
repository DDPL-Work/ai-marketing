import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toast: {
    message: '',
    type: 'success', // 'success' | 'error'
    isVisible: false,
  },
  tour: {
    isOpen: false,
    currentStep: 0,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.toast = {
        message: action.payload.message || '',
        type: action.payload.type || 'success',
        isVisible: true,
      };
    },
    hideToast: (state) => {
      state.toast.isVisible = false;
    },
    startTour: (state) => {
      state.tour.isOpen = true;
      state.tour.currentStep = 0;
    },
    nextTourStep: (state, action) => {
      const maxSteps = action.payload || 7;
      if (state.tour.currentStep < maxSteps - 1) {
        state.tour.currentStep += 1;
      } else {
        state.tour.isOpen = false;
      }
    },
    prevTourStep: (state) => {
      if (state.tour.currentStep > 0) {
        state.tour.currentStep -= 1;
      }
    },
    endTour: (state) => {
      state.tour.isOpen = false;
      state.tour.currentStep = 0;
    },
  },
});

export const {
  showToast,
  hideToast,
  startTour,
  nextTourStep,
  prevTourStep,
  endTour,
} = uiSlice.actions;

export default uiSlice.reducer;

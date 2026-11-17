import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isPlaying: false,
  statusMessage: 'Idle — ready to run a cycle',
  activeNodes: [],
  doneNodes: [],
  activeConns: [],
  selectedNodeKey: null,
  isPanelOpen: false,
};

const workflowSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {
    startPlayback: (state) => {
      state.isPlaying = true;
      state.activeNodes = [];
      state.doneNodes = [];
      state.activeConns = [];
      state.statusMessage = 'Starting workflow execution…';
    },
    setStepState: (state, action) => {
      const { nodes, conns, message } = action.payload;
      state.statusMessage = message;
      state.activeNodes = nodes || [];
      state.activeConns = conns || [];
    },
    markNodesDone: (state, action) => {
      const nodes = action.payload || [];
      state.activeNodes = [];
      state.doneNodes = Array.from(new Set([...state.doneNodes, ...nodes]));
    },
    finishPlayback: (state) => {
      state.isPlaying = false;
      state.activeNodes = [];
      state.activeConns = [];
      state.statusMessage = 'Cycle complete — runs again automatically every hour';
    },
    openNodePanel: (state, action) => {
      state.selectedNodeKey = action.payload;
      state.isPanelOpen = true;
    },
    closeNodePanel: (state) => {
      state.isPanelOpen = false;
    },
  },
});

export const {
  startPlayback,
  setStepState,
  markNodesDone,
  finishPlayback,
  openNodePanel,
  closeNodePanel,
} = workflowSlice.actions;

export default workflowSlice.reducer;

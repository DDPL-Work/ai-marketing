import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboardSlice.js';
import agentTasksReducer from './slices/agentTasksSlice.js';
import workflowReducer from './slices/workflowSlice.js';
import uiReducer from './slices/uiSlice.js';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    agentTasks: agentTasksReducer,
    workflow: workflowReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

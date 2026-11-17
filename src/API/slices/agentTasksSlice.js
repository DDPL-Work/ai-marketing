import { createSlice } from '@reduxjs/toolkit';
import * as mock from '../mockData.js';
import {
  fetchAgentTasks,
  fetchAgentTaskDetails,
  fetchAgentLogs,
  fetchAgentContent,
  fetchAgentContentDetails,
  fetchSocialDrafts,
  fetchCustomerReplies,
  fetchAdProposals,
  handleAdProposalAction,
  fetchBackgroundStatus,
  fetchIntegrationsStatus,
  fetchWordPressStatus,
  testWordPressConnection,
  fetchWordPressCategories,
  fetchWordPressTags,
  fetchWordPressPosts,
  runAgentCycle,
  runSingleAgent,
} from '../thunks/agentThunks.js';

const initialState = {
  activePane: 'pane-content',
  tasks: mock.INITIAL_AGENT_TASKS,
  tasksCount: mock.INITIAL_AGENT_TASKS.length,
  currentTask: null,
  agentLogs: mock.INITIAL_AGENT_LOGS,
  contents: mock.INITIAL_AGENT_CONTENT,
  contentsCount: mock.INITIAL_AGENT_CONTENT.length,
  currentContent: null,
  socialDrafts: mock.INITIAL_SOCIAL_DRAFTS,
  socialDraftsCount: mock.INITIAL_SOCIAL_DRAFTS.length,
  customerReplies: mock.INITIAL_CUSTOMER_REPLIES,
  customerRepliesCount: mock.INITIAL_CUSTOMER_REPLIES.length,
  adProposals: mock.INITIAL_AD_PROPOSALS,
  backgroundStatus: mock.INITIAL_BACKGROUND_STATUS,
  integrations: mock.INITIAL_INTEGRATIONS,
  wordpress: mock.INITIAL_WORDPRESS_STATUS,
  wordPress: mock.INITIAL_WORDPRESS_STATUS,
  wpCategories: mock.INITIAL_WORDPRESS_CATEGORIES,
  wpTags: mock.INITIAL_WORDPRESS_TAGS,
  wpPosts: mock.INITIAL_WORDPRESS_POSTS,
  isCycleRunning: false,
  runningSingleAgent: null, // 1 | 2 | 3 | 4 | null
  isTestingWp: false,
  isTestConnecting: false,
};

const agentTasksSlice = createSlice({
  name: 'agentTasks',
  initialState,
  reducers: {
    setActivePane: (state, action) => {
      state.activePane = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Run Agent Cycle
      .addCase(runAgentCycle.pending, (state) => {
        state.isCycleRunning = true;
      })
      .addCase(runAgentCycle.fulfilled, (state) => {
        state.isCycleRunning = false;
      })
      .addCase(runAgentCycle.rejected, (state) => {
        state.isCycleRunning = false;
      })
      // Run Single Agent
      .addCase(runSingleAgent.pending, (state, action) => {
        state.runningSingleAgent = action.meta.arg;
      })
      .addCase(runSingleAgent.fulfilled, (state) => {
        state.runningSingleAgent = null;
      })
      .addCase(runSingleAgent.rejected, (state) => {
        state.runningSingleAgent = null;
      })
      // Tasks
      .addCase(fetchAgentTasks.fulfilled, (state, action) => {
        state.tasks = action.payload.tasks || [];
        state.tasksCount = action.payload.total_count || state.tasks.length;
      })
      .addCase(fetchAgentTaskDetails.fulfilled, (state, action) => {
        state.currentTask = action.payload;
      })
      .addCase(fetchAgentLogs.fulfilled, (state, action) => {
        state.agentLogs = action.payload.logs || [];
      })
      // Content
      .addCase(fetchAgentContent.fulfilled, (state, action) => {
        state.contents = action.payload.contents || [];
        state.contentsCount = action.payload.total_count || state.contents.length;
      })
      .addCase(fetchAgentContentDetails.fulfilled, (state, action) => {
        state.currentContent = action.payload;
      })
      // Social Drafts
      .addCase(fetchSocialDrafts.fulfilled, (state, action) => {
        state.socialDrafts = action.payload.drafts || [];
        state.socialDraftsCount = action.payload.total_count || state.socialDrafts.length;
      })
      // Customer Replies
      .addCase(fetchCustomerReplies.fulfilled, (state, action) => {
        state.customerReplies = action.payload.replies || [];
        state.customerRepliesCount = action.payload.total_count || state.customerReplies.length;
      })
      // Ad Proposals
      .addCase(fetchAdProposals.fulfilled, (state, action) => {
        state.adProposals = action.payload.proposals || [];
      })
      .addCase(handleAdProposalAction.fulfilled, (state, action) => {
        const idx = state.adProposals.findIndex((p) => String(p.id) === String(action.meta.arg.id));
        if (idx !== -1) {
          state.adProposals[idx].status = action.meta.arg.decision === 'approve' ? 'approved' : 'rejected';
        }
      })
      // Background Status
      .addCase(fetchBackgroundStatus.fulfilled, (state, action) => {
        state.backgroundStatus = action.payload;
      })
      // Integrations
      .addCase(fetchIntegrationsStatus.fulfilled, (state, action) => {
        state.integrations = action.payload.integrations || {};
      })
      // WordPress Status
      .addCase(fetchWordPressStatus.fulfilled, (state, action) => {
        state.wordpress = { ...state.wordpress, ...action.payload };
        state.wordPress = { ...state.wordPress, ...action.payload };
      })
      // WordPress Test Connection
      .addCase(testWordPressConnection.pending, (state) => {
        state.isTestingWp = true;
        state.isTestConnecting = true;
      })
      .addCase(testWordPressConnection.fulfilled, (state) => {
        state.isTestingWp = false;
        state.isTestConnecting = false;
      })
      .addCase(testWordPressConnection.rejected, (state) => {
        state.isTestingWp = false;
        state.isTestConnecting = false;
      })
      // WordPress Taxonomies & Posts
      .addCase(fetchWordPressCategories.fulfilled, (state, action) => {
        state.wpCategories = action.payload;
      })
      .addCase(fetchWordPressTags.fulfilled, (state, action) => {
        state.wpTags = action.payload;
      })
      .addCase(fetchWordPressPosts.fulfilled, (state, action) => {
        state.wpPosts = action.payload;
      });
  },
});

export const { setActivePane } = agentTasksSlice.actions;

export default agentTasksSlice.reducer;

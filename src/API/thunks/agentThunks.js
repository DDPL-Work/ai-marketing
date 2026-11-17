import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../apiClient.js';
import { showToast } from '../slices/uiSlice.js';

export const runAgentCycle = createAsyncThunk(
  'agentTasks/runCycle',
  async (sync = true, { dispatch }) => {
    dispatch(showToast({ message: '🚀 Running 4-Agent LangGraph Workflow…', type: 'success' }));
    const res = await apiClient.runCycle(sync);
    if (res.status === 'success' || res.status === 'queued') {
      dispatch(showToast({
        message: sync ? '✨ 4-Agent cycle finished successfully!' : `⏳ Cycle queued in background (Task #${res.task_id})`,
        type: 'success',
      }));
    } else {
      dispatch(showToast({ message: '⚠️ ' + (res.message || 'Execution error'), type: 'error' }));
    }
    dispatch(fetchAllAgentData());
    return res;
  }
);

export const runSingleAgent = createAsyncThunk(
  'agentTasks/runSingleAgent',
  async (agentNum, { dispatch }) => {
    dispatch(showToast({ message: `🤖 Triggering Agent ${agentNum}…`, type: 'success' }));
    const res = await apiClient.runSingleAgent(agentNum);
    if (res.status === 'success') {
      dispatch(showToast({ message: `✅ Agent ${agentNum} completed successfully!`, type: 'success' }));
    } else {
      dispatch(showToast({ message: `⚠️ Agent ${agentNum}: ` + (res.message || 'Execution error'), type: 'error' }));
    }
    dispatch(fetchAllAgentData());
    return { agentNum, res };
  }
);

export const fetchAgentTasks = createAsyncThunk(
  'agentTasks/fetchTasks',
  async (params = {}) => {
    return await apiClient.getAgentTasks(params);
  }
);

export const fetchAgentTaskDetails = createAsyncThunk(
  'agentTasks/fetchTaskDetails',
  async (id) => {
    return await apiClient.getAgentTaskDetails(id);
  }
);

export const fetchAgentLogs = createAsyncThunk(
  'agentTasks/fetchLogs',
  async (params = {}) => {
    return await apiClient.getAgentLogs(params);
  }
);

export const fetchAgentContent = createAsyncThunk(
  'agentTasks/fetchContent',
  async () => {
    return await apiClient.getAgentContent();
  }
);

export const fetchAgentContentDetails = createAsyncThunk(
  'agentTasks/fetchContentDetails',
  async (id) => {
    return await apiClient.getAgentContentDetails(id);
  }
);

export const handleContentApproval = createAsyncThunk(
  'agentTasks/handleContentApproval',
  async ({ id, action }, { dispatch }) => {
    const res = await apiClient.handleContentAction(id, action);
    if (res.status === 'success') {
      dispatch(showToast({
        message: action === 'approve' ? '✅ Approved! Created WordPress post with post_status="draft"' : '❌ Content draft rejected',
        type: action === 'approve' ? 'success' : 'error',
      }));
      dispatch(fetchAgentContent());
    } else {
      dispatch(showToast({ message: '⚠️ ' + (res.message || 'Action failed'), type: 'error' }));
    }
    return res;
  }
);

export const fetchSocialDrafts = createAsyncThunk(
  'agentTasks/fetchSocialDrafts',
  async () => {
    return await apiClient.getSocialDrafts();
  }
);

export const handleSocialDraftAction = createAsyncThunk(
  'agentTasks/handleSocialDraftAction',
  async ({ id, status }, { dispatch }) => {
    const res = await apiClient.handleSocialDraftAction(id, status);
    dispatch(showToast({ message: `Social draft marked ${status}!`, type: 'success' }));
    dispatch(fetchSocialDrafts());
    return res;
  }
);

export const fetchCustomerReplies = createAsyncThunk(
  'agentTasks/fetchCustomerReplies',
  async () => {
    return await apiClient.getCustomerReplies();
  }
);

export const handleCustomerReplyAction = createAsyncThunk(
  'agentTasks/handleCustomerReplyAction',
  async ({ id, status }, { dispatch }) => {
    const res = await apiClient.handleCustomerReplyAction(id, status);
    dispatch(showToast({
      message: status === 'approved_to_send' ? '✅ Reply approved and recorded!' : 'Reply dismissed',
      type: 'success',
    }));
    dispatch(fetchCustomerReplies());
    return res;
  }
);

export const fetchAdProposals = createAsyncThunk(
  'agentTasks/fetchAdProposals',
  async () => {
    return await apiClient.getAdProposals();
  }
);

export const handleAdProposalAction = createAsyncThunk(
  'agentTasks/handleAdProposalAction',
  async ({ id, decision }, { dispatch }) => {
    const res = await apiClient.handleAdProposalAction(id, decision);
    dispatch(showToast({
      message: decision === 'approve' ? '✅ Ad proposal approved!' : '❌ Ad proposal rejected',
      type: decision === 'approve' ? 'success' : 'error',
    }));
    dispatch(fetchAdProposals());
    return res;
  }
);

export const processCustomerEnquiries = createAsyncThunk(
  'agentTasks/processCustomerEnquiries',
  async (enquiries, { dispatch }) => {
    const res = await apiClient.processCustomerEnquiries(enquiries);
    dispatch(showToast({
      message: '✨ Customer enquiries analyzed & reply suggestions drafted!',
      type: 'success',
    }));
    dispatch(fetchCustomerReplies());
    return res;
  }
);

export const fetchBackgroundStatus = createAsyncThunk(
  'agentTasks/fetchBackgroundStatus',
  async () => {
    return await apiClient.getBackgroundStatus();
  }
);

export const fetchIntegrationsStatus = createAsyncThunk(
  'agentTasks/fetchIntegrationsStatus',
  async () => {
    return await apiClient.getIntegrationsStatus();
  }
);

export const fetchWordPressStatus = createAsyncThunk(
  'agentTasks/fetchWordPressStatus',
  async () => {
    return await apiClient.getWordPressStatus();
  }
);

export const testWordPressConnection = createAsyncThunk(
  'agentTasks/testWordPressConnection',
  async (_, { dispatch }) => {
    const res = await apiClient.testWordPressConnection();
    if (res.success) {
      dispatch(showToast({
        message: `✅ WordPress Connected! User: ${res.data?.user?.name || res.data?.user?.username}`,
        type: 'success',
      }));
    } else {
      dispatch(showToast({ message: `⚠️ WordPress Check: ${res.error || 'Failed to connect'}`, type: 'error' }));
    }
    dispatch(fetchWordPressStatus());
    dispatch(fetchIntegrationsStatus());
    return res;
  }
);

export const fetchWordPressCategories = createAsyncThunk(
  'agentTasks/fetchWordPressCategories',
  async () => {
    return await apiClient.getWordPressCategories();
  }
);

export const fetchWordPressTags = createAsyncThunk(
  'agentTasks/fetchWordPressTags',
  async () => {
    return await apiClient.getWordPressTags();
  }
);

export const fetchWordPressPosts = createAsyncThunk(
  'agentTasks/fetchWordPressPosts',
  async () => {
    return await apiClient.getWordPressPosts();
  }
);

export const fetchAllAgentData = createAsyncThunk(
  'agentTasks/fetchAll',
  async (_, { dispatch }) => {
    dispatch(fetchAgentTasks());
    dispatch(fetchAgentLogs());
    dispatch(fetchAgentContent());
    dispatch(fetchSocialDrafts());
    dispatch(fetchCustomerReplies());
    dispatch(fetchAdProposals());
    dispatch(fetchBackgroundStatus());
    dispatch(fetchIntegrationsStatus());
    dispatch(fetchWordPressStatus());
    dispatch(fetchWordPressCategories());
    dispatch(fetchWordPressTags());
    dispatch(fetchWordPressPosts());
  }
);

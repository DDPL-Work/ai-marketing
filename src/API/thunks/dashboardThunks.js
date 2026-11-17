import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../apiClient.js';
import { showToast } from '../slices/uiSlice.js';

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async () => {
    return await apiClient.getDashboardStats();
  }
);

export const fetchActivityFeed = createAsyncThunk(
  'dashboard/fetchFeed',
  async (category = 'all') => {
    return await apiClient.getActivityFeed(category);
  }
);

export const fetchAttention = createAsyncThunk(
  'dashboard/fetchAttention',
  async () => {
    return await apiClient.getAttention();
  }
);

export const fetchApprovals = createAsyncThunk(
  'dashboard/fetchApprovals',
  async (status = 'pending') => {
    return await apiClient.getApprovals(status);
  }
);

export const fetchApprovalDetails = createAsyncThunk(
  'dashboard/fetchApprovalDetails',
  async (id) => {
    return await apiClient.getApprovalDetails(id);
  }
);

export const handleApprovalAction = createAsyncThunk(
  'dashboard/handleApprovalAction',
  async ({ id, action }, { dispatch }) => {
    const res = await apiClient.handleApprovalAction(id, action);
    dispatch(showToast({
      message: action === 'approve' ? '✅ Item approved successfully!' : '❌ Item rejected!',
      type: action === 'approve' ? 'success' : 'error',
    }));
    dispatch(fetchAttention());
    dispatch(fetchActivityFeed());
    dispatch(fetchDashboardStats());
    return res;
  }
);

export const approveAllContent = createAsyncThunk(
  'dashboard/approveAllContent',
  async (_, { dispatch }) => {
    const res = await apiClient.approveAllContent();
    dispatch(showToast({
      message: `✅ Bulk approved ${res.approved_count || 0} items!`,
      type: 'success',
    }));
    dispatch(fetchAttention());
    dispatch(fetchActivityFeed());
    dispatch(fetchDashboardStats());
    return res;
  }
);

export const markLeadCalled = createAsyncThunk(
  'dashboard/markLeadCalled',
  async (id, { dispatch }) => {
    const res = await apiClient.markLeadCalled(id);
    dispatch(showToast({ message: '📞 Lead marked called!', type: 'success' }));
    dispatch(fetchAttention());
    dispatch(fetchLeads());
    dispatch(fetchActivityFeed());
    return res;
  }
);

export const resolveEscalation = createAsyncThunk(
  'dashboard/resolveEscalation',
  async (id, { dispatch }) => {
    const res = await apiClient.resolveEscalation(id);
    dispatch(showToast({ message: '✅ Escalation marked handled!', type: 'success' }));
    dispatch(fetchAttention());
    dispatch(fetchActivityFeed());
    return res;
  }
);

export const fetchLeads = createAsyncThunk(
  'dashboard/fetchLeads',
  async () => {
    return await apiClient.getLeads();
  }
);

export const fetchLeadDetails = createAsyncThunk(
  'dashboard/fetchLeadDetails',
  async (id) => {
    return await apiClient.getLeadDetails(id);
  }
);

export const updateLeadStage = createAsyncThunk(
  'dashboard/updateLeadStage',
  async ({ id, stage }, { dispatch }) => {
    const res = await apiClient.updateLeadStage(id, stage);
    dispatch(showToast({ message: `Lead updated to '${stage}'!`, type: 'success' }));
    dispatch(fetchLeads());
    dispatch(fetchAttention());
    dispatch(fetchActivityFeed());
    return { id, stage, res };
  }
);

export const submitLeadEnquiry = createAsyncThunk(
  'dashboard/submitLeadEnquiry',
  async (enquiryData, { dispatch }) => {
    const res = await apiClient.submitEnquiry(enquiryData);
    if (res.status === 'success') {
      dispatch(showToast({ message: '🎉 Lead captured, scored, and saved to CRM!', type: 'success' }));
      setTimeout(() => {
        dispatch(fetchDashboardStats());
        dispatch(fetchLeads());
        dispatch(fetchAttention());
        dispatch(fetchActivityFeed());
        dispatch(fetchGoalsAndBudget());
        dispatch(fetchRules());
      }, 800);
    } else {
      dispatch(showToast({ message: '⚠️ ' + (res.message || 'Submission failed'), type: 'error' }));
    }
    return res;
  }
);

export const fetchGoalsAndBudget = createAsyncThunk(
  'dashboard/fetchGoalsAndBudget',
  async () => {
    return await apiClient.getGoalsAndBudget();
  }
);

export const fetchHourlyAnalytics = createAsyncThunk(
  'dashboard/fetchHourlyAnalytics',
  async () => {
    return await apiClient.getHourlyAnalytics();
  }
);

export const fetchRules = createAsyncThunk(
  'dashboard/fetchRules',
  async () => {
    return await apiClient.getRules();
  }
);

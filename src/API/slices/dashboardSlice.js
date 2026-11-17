import { createSlice } from '@reduxjs/toolkit';
import * as mock from '../mockData.js';
import {
  fetchDashboardStats,
  fetchActivityFeed,
  fetchAttention,
  fetchApprovals,
  fetchApprovalDetails,
  fetchLeads,
  fetchLeadDetails,
  updateLeadStage,
  fetchGoalsAndBudget,
  fetchHourlyAnalytics,
  fetchRules,
  submitLeadEnquiry,
} from '../thunks/dashboardThunks.js';

const initialCycleJobs = [
  { text: 'Check goals & budgets, plan the hour', agent: 'orch', ids: ['goals', 'orch'], status: 'idle' },
  { text: 'Research: find keyword opportunities', agent: 'research', ids: ['research', 'data'], status: 'idle' },
  { text: 'SEO: check website pages & titles', agent: 'seo', ids: ['seo'], status: 'idle' },
  { text: 'Content: write SEO blog article', agent: 'content', ids: ['content', 'publish'], status: 'idle' },
  { text: 'Social: schedule platform posts', agent: 'social', ids: ['social'], status: 'idle' },
  { text: 'Ads: check Google & Meta spend', agent: 'ads', ids: ['ads', 'campaigns'], status: 'idle' },
  { text: 'Assistant: monitor live chats & WhatsApp', agent: 'assistant', ids: ['assistant', 'crm'], status: 'idle' },
  { text: 'Learn from results & generate recommendations', agent: 'report', ids: ['report', 'orch'], status: 'idle' },
];

const initialState = {
  stats: mock.INITIAL_STATS,
  feed: mock.INITIAL_FEED,
  feedFilter: 'all',
  totalFeedCount: mock.INITIAL_FEED.length,
  now: {
    agent: 'orch',
    what: 'Orchestrator planned hourly marketing sprint and scheduled 4 agent tasks',
    why: 'Hourly cron triggered. Checked goals: Website visits +12%, leads on track.',
    workflow_path: ['CRM', 'Marketing Automation', 'Lead Pipeline'],
  },
  hitStripIds: [],
  bumpKpiId: null,
  attention: mock.INITIAL_ATTENTION,
  attentionTab: 'ap', // 'ap' | 'hot' | 'esc'
  approvalsList: mock.INITIAL_ATTENTION.approvals || [],
  currentApproval: null,
  leads: mock.INITIAL_LEADS,
  currentLead: null,
  activePipelineValue: 460000,
  budget: mock.INITIAL_GOALS_BUDGET.budget,
  goals: mock.INITIAL_GOALS_BUDGET.goals,
  recommendation: mock.INITIAL_GOALS_BUDGET.recommendation,
  hourly: mock.INITIAL_HOURLY_ANALYTICS,
  rules: mock.INITIAL_RULES,
  firingRuleKey: null,

  // Simulation & Controls
  isPaused: false,
  speed: 1, // 1 | 2 | 5
  autoApprove: false,
  isCycleRunning: false,
  cycleInfo: '',
  cycleJobs: initialCycleJobs,

  // Enquiry test form trace
  enquiryTrace: [
    { step: 'Send the form to see the full chain here.', status: 'info' }
  ],
  isSubmittingEnquiry: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setFeedFilter: (state, action) => {
      state.feedFilter = action.payload;
    },
    setAttentionTab: (state, action) => {
      state.attentionTab = action.payload;
    },
    togglePause: (state) => {
      state.isPaused = !state.isPaused;
    },
    setSpeed: (state, action) => {
      state.speed = action.payload;
    },
    toggleAutoApprove: (state) => {
      state.autoApprove = !state.autoApprove;
    },
    setHitStripIds: (state, action) => {
      state.hitStripIds = action.payload;
    },
    clearHitStripIds: (state) => {
      state.hitStripIds = [];
    },
    setBumpKpiId: (state, action) => {
      state.bumpKpiId = action.payload;
    },
    clearBumpKpiId: (state) => {
      state.bumpKpiId = null;
    },
    setFiringRuleKey: (state, action) => {
      state.firingRuleKey = action.payload;
    },
    clearFiringRuleKey: (state) => {
      state.firingRuleKey = null;
    },
    setCycleRunning: (state, action) => {
      state.isCycleRunning = action.payload;
    },
    setCycleInfo: (state, action) => {
      state.cycleInfo = action.payload;
    },
    updateCycleJobStatus: (state, action) => {
      const { index, status } = action.payload;
      if (state.cycleJobs[index]) {
        state.cycleJobs[index].status = status;
      }
    },
    resetCycleJobs: (state) => {
      state.cycleJobs = initialCycleJobs.map(j => ({ ...j, status: 'idle' }));
      state.cycleInfo = '';
      state.isCycleRunning = false;
    },
    setEnquiryTrace: (state, action) => {
      state.enquiryTrace = action.payload;
    },
    updateEnquiryTraceStep: (state, action) => {
      const { index, status } = action.payload;
      if (state.enquiryTrace[index]) {
        state.enquiryTrace[index].status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Dashboard Stats
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.stats = { ...state.stats, ...action.payload };
      })
      // Activity Feed
      .addCase(fetchActivityFeed.fulfilled, (state, action) => {
        state.feed = action.payload.logs || [];
        state.totalFeedCount = action.payload.total_count || (action.payload.logs ? action.payload.logs.length : 0);
        if (action.payload.logs && action.payload.logs.length > 0) {
          const top = action.payload.logs[0];
          state.now = {
            agent: top.agent || 'orch',
            what: top.what,
            why: top.why,
            workflow_path: (top.workflow_path && top.workflow_path.length > 0)
              ? top.workflow_path
              : ['CRM', 'Marketing Automation', 'Lead Pipeline'],
          };
        }
      })
      // Attention & Approvals
      .addCase(fetchAttention.fulfilled, (state, action) => {
        state.attention = action.payload;
      })
      .addCase(fetchApprovals.fulfilled, (state, action) => {
        state.approvalsList = action.payload.approvals || [];
      })
      .addCase(fetchApprovalDetails.fulfilled, (state, action) => {
        state.currentApproval = action.payload;
      })
      // Leads
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.leads = action.payload.leads || [];
        state.activePipelineValue = action.payload.active_pipeline_value || 0;
      })
      .addCase(fetchLeadDetails.fulfilled, (state, action) => {
        state.currentLead = action.payload;
      })
      .addCase(updateLeadStage.fulfilled, (state, action) => {
        const { id, stage } = action.payload;
        const idx = state.leads.findIndex((l) => String(l.id) === String(id));
        if (idx !== -1) {
          state.leads[idx].stage = stage;
        }
      })
      // Goals & Budget
      .addCase(fetchGoalsAndBudget.fulfilled, (state, action) => {
        if (action.payload.budget) state.budget = action.payload.budget;
        if (action.payload.goals) state.goals = action.payload.goals;
        if (action.payload.recommendation) state.recommendation = action.payload.recommendation;
      })
      // Hourly Analytics
      .addCase(fetchHourlyAnalytics.fulfilled, (state, action) => {
        state.hourly = action.payload;
      })
      // Rules
      .addCase(fetchRules.fulfilled, (state, action) => {
        state.rules = action.payload.rules || [];
      })
      // Submit Enquiry
      .addCase(submitLeadEnquiry.pending, (state) => {
        state.isSubmittingEnquiry = true;
      })
      .addCase(submitLeadEnquiry.fulfilled, (state, action) => {
        state.isSubmittingEnquiry = false;
        if (action.payload.lead) {
          state.leads.unshift(action.payload.lead);
          state.stats.leads = (state.stats.leads || 0) + 1;
          if (action.payload.lead.score_category === 'hot') {
            state.stats.hot_leads = (state.stats.hot_leads || 0) + 1;
          }
        }
      })
      .addCase(submitLeadEnquiry.rejected, (state) => {
        state.isSubmittingEnquiry = false;
      });
  },
});

export const {
  setFeedFilter,
  setAttentionTab,
  togglePause,
  setSpeed,
  toggleAutoApprove,
  setHitStripIds,
  clearHitStripIds,
  setBumpKpiId,
  clearBumpKpiId,
  setFiringRuleKey,
  clearFiringRuleKey,
  setCycleRunning,
  setCycleInfo,
  updateCycleJobStatus,
  resetCycleJobs,
  setEnquiryTrace,
  updateEnquiryTraceStep,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;

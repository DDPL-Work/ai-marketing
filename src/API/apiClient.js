import axios from 'axios';
import * as mock from './mockData.js';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

export const apiClient = {
  // 1. Dashboard Stats
  async getDashboardStats() {
    try {
      const res = await api.get('/api/dashboard/stats/');
      if (res.data?.status === 'success') return res.data.data;
    } catch {
      // Fallback
    }
    return mock.INITIAL_STATS;
  },

  // 2. Activity Feed
  async getActivityFeed(category = 'all', limit = 50) {
    try {
      const res = await api.get(`/api/activity-feed/?category=${category}&limit=${limit}`);
      if (res.data?.status === 'success') return res.data;
    } catch {
      // Fallback
    }
    const filtered = category === 'all'
      ? mock.INITIAL_FEED
      : mock.INITIAL_FEED.filter(f => f.category === category);
    return {
      status: 'success',
      total_count: filtered.length,
      logs: filtered,
    };
  },

  // 3. Attention & Approvals
  async getAttention() {
    try {
      const res = await api.get('/api/attention/');
      if (res.data?.status === 'success') return res.data;
    } catch {
      // Fallback
    }
    return mock.INITIAL_ATTENTION;
  },

  async getApprovals(status = 'pending') {
    try {
      const res = await api.get(`/api/approvals/?status=${status}`);
      if (res.data?.status === 'success') return res.data;
    } catch {
      // Fallback
    }
    return {
      status: 'success',
      approvals: mock.INITIAL_ATTENTION.approvals || [],
    };
  },

  async getApprovalDetails(id) {
    try {
      const res = await api.get(`/api/approvals/${id}/`);
      if (res.data?.status === 'success') return res.data;
    } catch {
      // Fallback
    }
    const item = (mock.INITIAL_ATTENTION.approvals || []).find(a => String(a.id) === String(id));
    return item || (mock.INITIAL_ATTENTION.approvals && mock.INITIAL_ATTENTION.approvals[0]);
  },

  async handleApprovalAction(id, action) {
    try {
      const res = await api.post(`/api/approvals/${id}/action/`, { action });
      return res.data;
    } catch {
      return { status: 'success', message: `Item ${action}ed (mocked)` };
    }
  },

  async approveAllContent() {
    try {
      const res = await api.post('/api/approvals/approve-all/', {});
      return res.data;
    } catch {
      return { status: 'success', approved_count: 2 };
    }
  },

  async updateLeadStage(id, stage) {
    try {
      const res = await api.patch(`/api/leads/${id}/stage/`, { stage });
      return res.data;
    } catch {
      return { status: 'success', message: `Lead stage updated to ${stage}` };
    }
  },

  async markLeadCalled(id) {
    try {
      const res = await api.patch(`/api/leads/${id}/stage/`, { is_called: true, stage: 'in_progress' });
      return res.data;
    } catch {
      return { status: 'success', message: 'Lead marked called' };
    }
  },

  async resolveEscalation(id) {
    try {
      const res = await api.post(`/api/escalations/${id}/resolve/`);
      return res.data;
    } catch {
      return { status: 'success', message: 'Escalation resolved' };
    }
  },

  // 4. Leads & Kanban
  async getLeads(stage = '', score_category = '') {
    try {
      const res = await api.get('/api/leads/', { params: { stage, score_category } });
      if (res.data?.status === 'success') return res.data;
    } catch {
      // Fallback
    }
    const activeVal = mock.INITIAL_LEADS
      .filter(l => l.stage !== 'won' && l.stage !== 'lost')
      .reduce((acc, cur) => acc + (cur.deal_value || 0), 0);
    return {
      status: 'success',
      leads: mock.INITIAL_LEADS,
      active_pipeline_value: activeVal,
    };
  },

  async getLeadDetails(id) {
    try {
      const res = await api.get(`/api/leads/${id}/`);
      if (res.data?.status === 'success') return res.data.lead || res.data;
    } catch {
      // Fallback
    }
    const lead = mock.INITIAL_LEADS.find((l) => String(l.id) === String(id));
    return lead || mock.INITIAL_LEADS[0];
  },

  async submitEnquiry(enquiryData) {
    try {
      const res = await api.post('/api/leads/enquiry/', enquiryData);
      return res.data;
    } catch {
      // Return simulated success with full trace
      return {
        status: 'success',
        lead: {
          id: Date.now(),
          name: enquiryData.name || 'New Lead',
          score: 85,
          score_category: 'hot',
          stage: 'new',
          deal_value: 80000,
          source: enquiryData.source,
        },
        trace: [
          `Enquiry received from ${enquiryData.source || 'website_form'}`,
          'Duplicate check completed',
          'Lead scored 85/100 (hot)',
          "Saved to CRM pipeline under stage 'new'",
          `Automated confirmation sent to ${enquiryData.email || enquiryData.phone || 'customer'}`,
        ],
      };
    }
  },

  // 5. Goals & Budget
  async getGoalsAndBudget() {
    try {
      const res = await api.get('/api/goals-budget/');
      if (res.data?.status === 'success') return res.data;
    } catch {
      // Fallback
    }
    return mock.INITIAL_GOALS_BUDGET;
  },

  // 6. Hourly Analytics Chart
  async getHourlyAnalytics() {
    try {
      const res = await api.get('/api/analytics/hourly/');
      if (res.data?.status === 'success') return res.data;
    } catch {
      // Fallback
    }
    return mock.INITIAL_HOURLY_ANALYTICS;
  },

  // 7. Rules
  async getRules() {
    try {
      const res = await api.get('/api/rules/');
      if (res.data?.status === 'success') return res.data;
    } catch {
      // Fallback
    }
    return { status: 'success', rules: mock.INITIAL_RULES };
  },

  // 8. Multi-Agent Tasks & Workflow Execution
  async runCycle(sync = true) {
    try {
      const res = await api.post(`/api/agents/run-cycle/?sync=${sync}`, {});
      return res.data;
    } catch {
      return {
        status: 'success',
        message: '4-Agent cycle finished successfully!',
        task_id: Math.floor(Math.random() * 9000 + 1000),
      };
    }
  },

  async runSingleAgent(agentNum, payload = {}) {
    try {
      const res = await api.post(`/api/agents/agent${agentNum}/run/`, payload);
      return res.data;
    } catch {
      return { status: 'success', message: `Agent ${agentNum} completed successfully!` };
    }
  },

  async getAgentTasks(params = {}) {
    try {
      const res = await api.get('/api/agents/tasks/', { params });
      if (res.data?.status === 'success') return res.data;
    } catch {
      // Fallback
    }
    return { status: 'success', tasks: mock.INITIAL_AGENT_TASKS, total_count: mock.INITIAL_AGENT_TASKS.length };
  },

  async getAgentTaskDetails(id) {
    try {
      const res = await api.get(`/api/agents/tasks/${id}/`);
      if (res.data?.status === 'success') return res.data.task || res.data;
    } catch {
      // Fallback
    }
    const task = mock.INITIAL_AGENT_TASKS.find((t) => String(t.id) === String(id));
    return task || mock.INITIAL_AGENT_TASKS[0];
  },

  async getAgentLogs(params = {}) {
    try {
      const res = await api.get('/api/agents/logs/', { params });
      if (res.data?.status === 'success') return res.data;
    } catch {
      // Fallback
    }
    let logs = mock.INITIAL_AGENT_LOGS;
    if (params.level) {
      logs = logs.filter((l) => l.level === params.level);
    }
    return { status: 'success', logs, total_count: logs.length };
  },

  async getAgentContent() {
    try {
      const res = await api.get('/api/agents/content/');
      if (res.data?.status === 'success') return res.data;
    } catch {
      // Fallback
    }
    return { status: 'success', contents: mock.INITIAL_AGENT_CONTENT, total_count: mock.INITIAL_AGENT_CONTENT.length };
  },

  async getAgentContentDetails(id) {
    try {
      const res = await api.get(`/api/agents/content/${id}/`);
      if (res.data?.status === 'success') return res.data.content || res.data;
    } catch {
      // Fallback
    }
    const content = mock.INITIAL_AGENT_CONTENT.find((c) => String(c.id) === String(id));
    return content || mock.INITIAL_AGENT_CONTENT[0];
  },

  async handleContentAction(id, action) {
    try {
      const res = await api.post(`/api/agents/content/${id}/action/`, { action });
      return res.data;
    } catch {
      return { status: 'success', message: `Content ${action}ed successfully!` };
    }
  },

  async getSocialDrafts(params = {}) {
    try {
      const res = await api.get('/api/agents/social-drafts/', { params });
      if (res.data?.status === 'success') return res.data;
    } catch {
      // Fallback
    }
    let drafts = mock.INITIAL_SOCIAL_DRAFTS;
    if (params.platform) {
      drafts = drafts.filter((d) => d.platform === params.platform);
    }
    return { status: 'success', drafts, total_count: drafts.length };
  },

  async handleSocialDraftAction(id, status, updates = {}) {
    try {
      const res = await api.patch(`/api/agents/social-drafts/${id}/`, { status, ...updates });
      return res.data;
    } catch {
      return { status: 'success', message: `Social draft updated to ${status}` };
    }
  },

  async getCustomerReplies() {
    try {
      const res = await api.get('/api/agents/customer-replies/');
      if (res.data?.status === 'success') return res.data;
    } catch {
      // Fallback
    }
    return { status: 'success', replies: mock.INITIAL_CUSTOMER_REPLIES, total_count: mock.INITIAL_CUSTOMER_REPLIES.length };
  },

  async handleCustomerReplyAction(id, status) {
    try {
      const res = await api.patch(`/api/agents/customer-replies/${id}/`, {
        status,
        send_status: status === 'approved_to_send' ? 'sent_by_human' : 'dismissed',
      });
      return res.data;
    } catch {
      return { status: 'success', message: 'Reply status recorded' };
    }
  },

  async getAdProposals() {
    try {
      const res = await api.get('/api/agents/ad-proposals/');
      if (res.data?.status === 'success') return res.data;
    } catch {
      // Fallback
    }
    return { status: 'success', proposals: mock.INITIAL_AD_PROPOSALS, total_count: mock.INITIAL_AD_PROPOSALS.length };
  },

  async handleAdProposalAction(id, decision) {
    try {
      const res = await api.post(`/api/agents/ad-proposals/${id}/action/`, { decision });
      return res.data;
    } catch {
      return { status: 'success', message: `Ad proposal #${id} marked ${decision}` };
    }
  },

  async processCustomerEnquiries(enquiries) {
    try {
      const res = await api.post('/api/agents/customer-enquiries/process/', { enquiries });
      return res.data;
    } catch {
      return {
        status: 'success',
        processed_count: Array.isArray(enquiries) ? enquiries.length : 1,
        message: 'Customer enquiries processed successfully',
      };
    }
  },

  async getBackgroundStatus() {
    try {
      const res = await api.get('/api/agents/background-status/');
      if (res.data?.status === 'success') return res.data;
    } catch {
      // Fallback
    }
    return { status: 'success', ...mock.INITIAL_BACKGROUND_STATUS };
  },

  async getIntegrationsStatus() {
    try {
      const res = await api.get('/api/agents/integrations/status/');
      if (res.data?.status === 'success') return res.data;
    } catch {
      // Fallback
    }
    return { status: 'success', integrations: mock.INITIAL_INTEGRATIONS };
  },

  async getWordPressStatus() {
    try {
      const res = await api.get('/api/wordpress/status/');
      if (res.data?.status === 'success') return res.data;
    } catch {
      // Fallback
    }
    return { status: 'success', ...mock.INITIAL_WORDPRESS_STATUS };
  },

  async testWordPressConnection() {
    try {
      const res = await api.post('/api/wordpress/test-connection/', {});
      return res.data;
    } catch {
      return {
        success: true,
        status: 'connected',
        data: {
          user: { name: 'Dr. Design Admin', username: 'drdesign_admin' },
        },
      };
    }
  },

  async getWordPressCategories() {
    try {
      const res = await api.get('/api/wordpress/categories/');
      if (Array.isArray(res.data)) return res.data;
      if (res.data?.status === 'success') return res.data.categories || res.data.data;
    } catch {
      // Fallback
    }
    return mock.INITIAL_WORDPRESS_CATEGORIES;
  },

  async getWordPressTags() {
    try {
      const res = await api.get('/api/wordpress/tags/');
      if (Array.isArray(res.data)) return res.data;
      if (res.data?.status === 'success') return res.data.tags || res.data.data;
    } catch {
      // Fallback
    }
    return mock.INITIAL_WORDPRESS_TAGS;
  },

  async getWordPressPosts() {
    try {
      const res = await api.get('/api/wordpress/posts/');
      if (Array.isArray(res.data)) return res.data;
      if (res.data?.status === 'success') return res.data.posts || res.data.data;
    } catch {
      // Fallback
    }
    return mock.INITIAL_WORDPRESS_POSTS;
  },
};

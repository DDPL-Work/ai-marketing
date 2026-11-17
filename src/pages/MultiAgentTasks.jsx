import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllAgentData,
  runAgentCycle,
} from '../API/thunks/agentThunks.js';
import { setActivePane } from '../API/slices/agentTasksSlice.js';
import AgentRosterGrid from '../components/agents/AgentRosterGrid.jsx';
import ContentPackagesPane from '../components/agents/ContentPackagesPane.jsx';
import SocialDraftsPane from '../components/agents/SocialDraftsPane.jsx';
import CustomerRepliesPane from '../components/agents/CustomerRepliesPane.jsx';
import AgentTasksPane from '../components/agents/AgentTasksPane.jsx';
import IntegrationsStatusPane from '../components/agents/IntegrationsStatusPane.jsx';

export default function MultiAgentTasks() {
  const dispatch = useDispatch();
  const {
    activePane,
    contentsCount,
    socialDraftsCount,
    customerRepliesCount,
    tasksCount,
    isCycleRunning,
  } = useSelector((state) => state.agentTasks);

  useEffect(() => {
    dispatch(fetchAllAgentData());
  }, [dispatch]);

  const workspaceTabs = [
    { id: 'pane-content', label: `📝 Generated Content & SEO (${contentsCount})` },
    { id: 'pane-social', label: `📱 Social Media Drafts (${socialDraftsCount})` },
    { id: 'pane-replies', label: `💬 Customer Reply Suggestions (${customerRepliesCount})` },
    { id: 'pane-tasks', label: `⚙️ Agent Tasks & Logs (${tasksCount})` },
    { id: 'pane-integrations', label: '🔌 API Integrations (Status)' },
  ];

  return (
    <div>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '18px' }}>
        <div>
          <h1 style={{ margin: '0 0 4px' }}>AI Multi-Agent Tasks &amp; Orchestration</h1>
          <p className="lead" style={{ margin: 0 }}>
            Real-time status, LangGraph pipeline execution, and human approval safety controls across all 4 specialist agents.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn2"
            id="refresh-agents-btn"
            onClick={() => dispatch(fetchAllAgentData())}
          >
            ↻ Refresh Agent Data
          </button>
          <button
            type="button"
            className="btn2 pri"
            id="run-agents-cycle-btn"
            disabled={isCycleRunning}
            onClick={() => dispatch(runAgentCycle(true))}
          >
            {isCycleRunning ? 'Executing 4-Agent Workflow…' : '⚡ Run 4-Agent Cycle (Instant)'}
          </button>
          <button
            type="button"
            className="btn2 ok"
            id="run-agents-async-btn"
            disabled={isCycleRunning}
            onClick={() => dispatch(runAgentCycle(false))}
          >
            ▶ Run in Background (Async)
          </button>
        </div>
      </div>

      {/* 4 Agent Roster Grid */}
      <AgentRosterGrid />

      {/* Agent Workspace Card */}
      <div className="card" style={{ marginBottom: '20px' }}>
        {/* Workspace Navigation Tabs */}
        <div className="att-tabs" id="agent-workspace-tabs">
          {workspaceTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={activePane === tab.id ? 'on' : ''}
              onClick={() => dispatch(setActivePane(tab.id))}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Panes */}
        {activePane === 'pane-content' && <ContentPackagesPane />}
        {activePane === 'pane-social' && <SocialDraftsPane />}
        {activePane === 'pane-replies' && <CustomerRepliesPane />}
        {activePane === 'pane-tasks' && <AgentTasksPane />}
        {activePane === 'pane-integrations' && <IntegrationsStatusPane />}
      </div>
    </div>
  );
}

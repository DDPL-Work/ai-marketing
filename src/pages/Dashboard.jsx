import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  fetchDashboardStats,
  fetchAttention,
  fetchActivityFeed,
  fetchLeads,
  fetchGoalsAndBudget,
  fetchHourlyAnalytics,
  fetchRules,
} from '../API/thunks/dashboardThunks.js';
import { setActiveTab } from '../API/slices/dashboardSlice.js';
import HelpBar from '../components/dashboard/HelpBar.jsx';
import ControlsBar from '../components/dashboard/ControlsBar.jsx';
import RightNowBanner from '../components/dashboard/RightNowBanner.jsx';
import KpiGrid from '../components/dashboard/KpiGrid.jsx';
import AttentionSection from '../components/dashboard/AttentionSection.jsx';
import StepByStepSection from '../components/dashboard/StepByStepSection.jsx';
import LeadsKanban from '../components/dashboard/LeadsKanban.jsx';
import BudgetAndGoals from '../components/dashboard/BudgetAndGoals.jsx';
import EnquiryTestForm from '../components/dashboard/EnquiryTestForm.jsx';

const VALID_TABS = ['overview', 'attention', 'activity', 'leads', 'budget', 'simulator', 'all'];

export default function Dashboard() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    activeTab,
    isPaused,
    feedFilter,
  } = useSelector((state) => state.dashboard);
  const { tour } = useSelector((state) => state.ui);

  // Sync route param :tab with Redux and auto-redirect /dashboard to /dashboard/overview
  useEffect(() => {
    if (!tab) {
      navigate('/dashboard/overview', { replace: true });
    } else if (tab && !VALID_TABS.includes(tab)) {
      navigate('/dashboard/overview', { replace: true });
    } else if (tab && VALID_TABS.includes(tab) && tab !== activeTab) {
      dispatch(setActiveTab(tab));
    }
  }, [tab, activeTab, dispatch, navigate]);

  // Initial fetch of all dashboard data
  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchAttention());
    dispatch(fetchActivityFeed());
    dispatch(fetchLeads());
    dispatch(fetchGoalsAndBudget());
    dispatch(fetchHourlyAnalytics());
    dispatch(fetchRules());
  }, [dispatch]);

  // Periodic polling every 12 seconds to keep live dashboard in sync
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        dispatch(fetchDashboardStats());
        dispatch(fetchAttention());
        dispatch(fetchActivityFeed(feedFilter));
      }
    }, 12000);

    return () => clearInterval(interval);
  }, [isPaused, feedFilter, dispatch]);

  // Active view: derived directly from route param :tab (with fallback to activeTab or 'overview')
  const resolvedTab = tab && VALID_TABS.includes(tab) ? tab : (activeTab || 'overview');
  const effectiveTab = tour?.isOpen ? 'all' : resolvedTab;

  return (
    <div className="w-full">
      {/* Overview & KPIs Tab */}
      {(effectiveTab === 'overview' || effectiveTab === 'all') && (
        <div className="space-y-4">
          <HelpBar />
          <ControlsBar />
          <RightNowBanner />
          <KpiGrid />
        </div>
      )}

      {/* Needs Attention Tab */}
      {(effectiveTab === 'attention' || effectiveTab === 'all') && (
        <div>
          <AttentionSection />
        </div>
      )}

      {/* AI Activity Feed Tab */}
      {(effectiveTab === 'activity' || effectiveTab === 'all') && (
        <div>
          <StepByStepSection />
        </div>
      )}

      {/* CRM Leads Pipeline Tab */}
      {(effectiveTab === 'leads' || effectiveTab === 'all') && (
        <div>
          <LeadsKanban />
        </div>
      )}

      {/* Budget & Goals Tab */}
      {(effectiveTab === 'budget' || effectiveTab === 'all') && (
        <div>
          <BudgetAndGoals />
        </div>
      )}

      {/* Lead Ingestion Simulator Tab */}
      {(effectiveTab === 'simulator' || effectiveTab === 'all') && (
        <div>
          <EnquiryTestForm />
        </div>
      )}
    </div>
  );
}

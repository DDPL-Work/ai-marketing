import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDashboardStats,
  fetchAttention,
  fetchActivityFeed,
  fetchLeads,
  fetchGoalsAndBudget,
  fetchHourlyAnalytics,
  fetchRules,
} from '../API/thunks/dashboardThunks.js';
import HelpBar from '../components/dashboard/HelpBar.jsx';
import ControlsBar from '../components/dashboard/ControlsBar.jsx';
import RightNowBanner from '../components/dashboard/RightNowBanner.jsx';
import KpiGrid from '../components/dashboard/KpiGrid.jsx';
import AttentionSection from '../components/dashboard/AttentionSection.jsx';
import StepByStepSection from '../components/dashboard/StepByStepSection.jsx';
import LeadsKanban from '../components/dashboard/LeadsKanban.jsx';
import BudgetAndGoals from '../components/dashboard/BudgetAndGoals.jsx';
import EnquiryTestForm from '../components/dashboard/EnquiryTestForm.jsx';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { isPaused, feedFilter } = useSelector((state) => state.dashboard);

  useEffect(() => {
    // Initial fetch of all dashboard data
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

  return (
    <div className="w-full">
      <HelpBar />
      <ControlsBar />
      <RightNowBanner />
      <KpiGrid />
      <AttentionSection />
      <StepByStepSection />
      <LeadsKanban />
      <BudgetAndGoals />
      <EnquiryTestForm />
    </div>
  );
}

import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../layout/Layout.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import WorkflowMap from '../pages/WorkflowMap.jsx';
import AutomationRules from '../pages/AutomationRules.jsx';
import MultiAgentTasks from '../pages/MultiAgentTasks.jsx';
import Login from '../pages/Login.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard/overview" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard/:tab" element={<Dashboard />} />
        <Route path="workflow" element={<WorkflowMap />} />
        <Route path="rules" element={<AutomationRules />} />
        <Route path="agents" element={<MultiAgentTasks />} />
        <Route path="*" element={<Navigate to="/dashboard/overview" replace />} />
      </Route>
    </Routes>
  );
}

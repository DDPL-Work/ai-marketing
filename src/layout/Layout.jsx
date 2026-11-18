import { Outlet } from 'react-router-dom';
import Header from './Header/Header.jsx';
import Sidebar from './sidebar/Sidebar.jsx';
import GuidedTour from '../components/GuidedTour.jsx';
import NodeDetailsPanel from '../components/NodeDetailsPanel.jsx';
import Toast from '../components/Toast.jsx';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      <Header />
      <div className="flex-1 flex w-full relative">
        <Sidebar />
        <main className="flex-1 min-w-0 wrapd">
          <Outlet />
        </main>
      </div>
      <GuidedTour />
      <NodeDetailsPanel />
      <Toast />
    </div>
  );
}

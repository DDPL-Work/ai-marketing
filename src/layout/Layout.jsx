import { Outlet } from 'react-router-dom';
import Header from './Header/Header.jsx';
import GuidedTour from '../components/GuidedTour.jsx';
import NodeDetailsPanel from '../components/NodeDetailsPanel.jsx';
import Toast from '../components/Toast.jsx';

export default function Layout() {
  return (
    <>
      <Header />
      <main className="wrapd">
        <Outlet />
      </main>
      <GuidedTour />
      <NodeDetailsPanel />
      <Toast />
    </>
  );
}

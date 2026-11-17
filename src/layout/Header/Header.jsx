import { useNavigate, useLocation } from 'react-router-dom';
import AppIcon from '../../components/AppIcon.jsx';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const navTabs = [
    { to: '/dashboard', label: 'Live dashboard' },
    { to: '/workflow', label: 'Workflow map' },
    { to: '/rules', label: 'Automation rules' },
    { to: '/agents', label: 'AI Multi-Agent Tasks' },
  ];

  return (
    <header>
      <div
        className="logo"
        style={{ cursor: 'pointer' }}
        onClick={() => navigate('/dashboard')}
      >
        <AppIcon name="logo" />
      </div>

      <div
        style={{ cursor: 'pointer' }}
        onClick={() => navigate('/dashboard')}
      >
        <b>AI Marketing Manager</b>
        <div className="sub">Live dashboard &amp; automation</div>
      </div>

      <div className="grow" />

      <div className="tabs">
        {navTabs.map((tab) => {
          const isActive =
            location.pathname === tab.to ||
            location.pathname.startsWith(`${tab.to}/`) ||
            (tab.to === '/dashboard' && (location.pathname === '/' || location.pathname === ''));

          return (
            <button
              key={tab.to}
              type="button"
              className={isActive ? 'on' : ''}
              onClick={() => navigate(tab.to)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="btn ghost"
        onClick={() => window.print()}
      >
        Print / PDF
      </button>
    </header>
  );
}

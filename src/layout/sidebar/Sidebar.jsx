import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  setActiveTab,
  setSidebarOpen,
  logoutUser,
} from '../../API/slices/dashboardSlice.js';
import { showToast } from '../../API/slices/uiSlice.js';

const DASHBOARD_TABS = [
  {
    id: 'overview',
    path: '/dashboard/overview',
    label: 'Overview & KPIs',
    badgeKey: null,
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18" />
        <rect x="7" y="12" width="3" height="6" rx="1" />
        <rect x="12" y="8" width="3" height="10" rx="1" />
        <rect x="17" y="5" width="3" height="13" rx="1" />
      </svg>
    ),
  },
  {
    id: 'attention',
    path: '/dashboard/attention',
    label: 'Needs Attention',
    badgeKey: 'attention',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    id: 'activity',
    path: '/dashboard/activity',
    label: 'AI Activity Feed',
    badgeKey: 'activity',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    id: 'leads',
    path: '/dashboard/leads',
    label: 'CRM Leads Pipeline',
    badgeKey: 'leads',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
    ),
  },
  {
    id: 'budget',
    path: '/dashboard/budget',
    label: 'Budget & Goals',
    badgeKey: null,
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    id: 'simulator',
    path: '/dashboard/simulator',
    label: 'Enquiry Simulator',
    badgeKey: null,
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
  },
  {
    id: 'all',
    path: '/dashboard/all',
    label: 'All Sections (Full View)',
    badgeKey: null,
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    activeTab,
    isSidebarOpen,
    currentUser,
    attention,
    leads,
    feed,
  } = useSelector((state) => state.dashboard);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Dynamic badge counts
  const pendingAttentionCount =
    (attention?.counts?.approvals || 0) +
    (attention?.counts?.hot_leads || 0) +
    (attention?.counts?.escalations || 0);
  const leadsCount = leads?.length || 0;
  const feedCount = feed?.length || 0;

  // Derive current tab directly from route: /dashboard/:tab
  const pathParts = location.pathname.split('/');
  const routeTab = pathParts[1] === 'dashboard' ? (pathParts[2] || 'overview') : null;
  const currentTab = routeTab || activeTab || 'overview';

  const handleTabClick = (tab) => {
    dispatch(setActiveTab(tab.id));
    navigate(tab.path);
    // On mobile screens, close sidebar drawer
    if (window.innerWidth < 1024) {
      dispatch(setSidebarOpen(false));
    }
  };

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    dispatch(logoutUser());
    dispatch(
      showToast({
        message: '👋 You have signed out.',
        type: 'success',
      })
    );
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  if (!isSidebarOpen && window.innerWidth >= 1024) {
    return null;
  }

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden transition-opacity"
          onClick={() => dispatch(setSidebarOpen(false))}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`flex flex-col justify-between shrink-0 transition-all duration-200 ${
          /* Mobile: fixed drawer */
          'fixed inset-y-0 left-0 z-50 w-64 shadow-2xl lg:shadow-none ' +
          /* Desktop: in-flow sticky sidebar */
          'lg:static lg:z-auto lg:h-[calc(100vh-56px)] lg:sticky lg:top-[56px]'
        } ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ background: 'var(--sidebar-bg)', borderRight: '1px solid var(--sidebar-border)' }}
      >
        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-3">
          <div className="px-2 pt-1">
            <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--sidebar-muted)' }}>
              Dashboard Views
            </span>
          </div>

          <nav className="space-y-1">
            {DASHBOARD_TABS.map((tab) => {
              const isActive = currentTab === tab.id;

              // Compute Badge
              let badge = null;
              if (tab.badgeKey === 'attention' && pendingAttentionCount > 0) {
                badge = (
                  <span className="text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.2 rounded-full animate-pulse">
                    {pendingAttentionCount}
                  </span>
                );
              } else if (tab.badgeKey === 'leads' && leadsCount > 0) {
                badge = (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full" style={{ background: 'rgba(37,99,235,0.18)', color: '#93c5fd' }}>
                    {leadsCount}
                  </span>
                );
              } else if (tab.badgeKey === 'activity' && feedCount > 0) {
                badge = (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full" style={{ background: 'rgba(22,163,74,0.18)', color: '#86efac' }}>
                    {feedCount}
                  </span>
                );
              }

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabClick(tab)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between text-[12.5px] cursor-pointer transition-all duration-150 ${
                    isActive
                      ? 'font-bold shadow-sm'
                      : 'font-semibold'
                  }`}
                  style={
                    isActive
                      ? { background: 'var(--sidebar-active-bg)', color: 'var(--sidebar-active-text)' }
                      : { color: 'var(--sidebar-text)', '--tw-hover-bg': 'var(--sidebar-hover-bg)' }
                  }
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--sidebar-hover-bg)'; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = ''; }}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span style={{ color: isActive ? 'var(--sidebar-active-text)' : 'rgba(203,213,225,0.55)' }}>
                      {tab.icon}
                    </span>
                    <span className="truncate">{tab.label}</span>
                  </div>
                  {badge}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sticky Profile & Logout Footer */}
        <div className="p-3 shrink-0" style={{ background: 'var(--sidebar-footer-bg)', borderTop: '1px solid var(--sidebar-border)' }}>
          {currentUser?.isLoggedIn ? (
            <div className="space-y-2">
              {/* Profile Card */}
              <div className="flex items-center gap-2 p-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="relative shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 font-extrabold text-[11px] flex items-center justify-center" style={{ color: 'var(--slate)' }}>
                    {currentUser.initials || 'DD'}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 rounded-full" style={{ borderColor: 'var(--sidebar-footer-bg)' }} />
                </div>
                <div className="min-w-0 flex-1 leading-tight">
                  <div className="text-[12px] font-bold truncate" style={{ color: '#f1f5f9' }}>
                    {currentUser.name}
                  </div>
                  <div className="text-[10.5px] truncate" style={{ color: 'var(--sidebar-muted)' }}>
                    {currentUser.role}
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[11.5px] font-semibold rounded-lg cursor-pointer transition-all"
                style={{ color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)', background: 'transparent' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(220,38,38,0.12)'; e.currentTarget.style.color = '#fca5a5'; e.currentTarget.style.borderColor = 'rgba(220,38,38,0.3)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          ) : (
            /* Guest Mode */
            <div className="p-2 rounded-xl text-center space-y-1.5" style={{ background: 'rgba(245,197,24,0.1)', border: '1px solid rgba(245,197,24,0.2)' }}>
              <div className="text-[11px] font-medium" style={{ color: '#94a3b8' }}>Guest Mode</div>
              <button
                type="button"
                onClick={handleLogin}
                className="w-full py-1.5 text-[11.5px] font-bold rounded-lg cursor-pointer transition-colors"
                style={{ background: 'var(--yellow)', color: 'var(--slate)' }}
              >
                Sign In as Admin
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-5 border border-slate-200 space-y-3">
            <h3 className="text-[14px] font-bold m-0" style={{ color: 'var(--ink)' }}>Confirm Logout</h3>
            <p className="text-[12px] text-slate-600 m-0 leading-normal">
              Sign out of <b>{currentUser?.name}</b>? This is a frontend demo session.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="px-3 py-1.5 text-[12px] font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-1.5 text-[12px] font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

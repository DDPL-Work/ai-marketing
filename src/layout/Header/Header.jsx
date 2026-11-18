import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppIcon from '../../components/AppIcon.jsx';
import {
  toggleSidebar,
  setActiveTab,
} from '../../API/slices/dashboardSlice.js';
import {
  fetchDashboardStats,
  fetchAttention,
  fetchActivityFeed,
} from '../../API/thunks/dashboardThunks.js';
import { startTour, showToast } from '../../API/slices/uiSlice.js';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { attention, isPaused } = useSelector(
    (state) => state.dashboard
  );

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notifRef = useRef(null);

  // Tabs kept strictly commented as requested
  // const navTabs = [
  //   { to: '/dashboard', label: 'Dashboard' },
  //   { to: '/workflow', label: 'Workflow map' },
  //   { to: '/rules', label: 'Automation rules' },
  //   { to: '/agents', label: 'AI Multi-Agent Tasks' },
  // ];

  // Count pending attention items for notification badge
  const approvalsCount = attention?.counts?.approvals || (attention?.approvals?.length || 0);
  const hotLeadsCount = attention?.counts?.hot_leads || (attention?.hot_leads?.length || 0);
  const escalationsCount = attention?.counts?.escalations || (attention?.escalations?.length || 0);
  const totalPending = approvalsCount + hotLeadsCount + escalationsCount;

  // Listen to browser fullscreen change event
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Close notifications on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Frontend logic: Manual Sync
  const handleManualSync = () => {
    setIsRefreshing(true);
    dispatch(fetchDashboardStats());
    dispatch(fetchAttention());
    dispatch(fetchActivityFeed());
    dispatch(
      showToast({
        message: '⚡ Dashboard synced with latest agent events!',
        type: 'success',
      })
    );
    setTimeout(() => setIsRefreshing(false), 700);
  };

  // Frontend logic: Fullscreen toggle
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  // Frontend logic: Tour Trigger
  const handleStartTour = () => {
    dispatch(startTour());
  };

  // Frontend logic: Jump to Attention Tab
  const handleJumpToAttention = () => {
    setIsNotificationOpen(false);
    dispatch(setActiveTab('attention'));
    navigate('/dashboard/attention');
  };

  return (
    <header className="sticky top-0 z-40 px-3 sm:px-5 py-2 flex items-center gap-2 sm:gap-3" style={{ background: 'var(--slate)', borderBottom: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
      {/* Sidebar Toggle Button */}
      <button
        type="button"
        onClick={() => dispatch(toggleSidebar())}
        className="p-1.5 rounded-lg cursor-pointer transition-colors"
        style={{ color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#94a3b8'; }}
        title="Toggle sidebar"
        aria-label="Toggle navigation sidebar"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Brand Logo & Title */}
      <div
        className="logo cursor-pointer hover:scale-105 transition-transform shrink-0"
        style={{ width: '32px', height: '32px' }}
        onClick={() => navigate('/dashboard/overview')}
        title="Go to Dashboard"
      >
        <AppIcon name="logo" />
      </div>

      <div
        className="cursor-pointer select-none shrink-0"
        onClick={() => navigate('/dashboard/overview')}
      >
        <b className="tracking-wide font-extrabold block leading-tight" style={{ color: '#fff', fontSize: '13.5px' }}>
          AI Marketing
        </b>
        <div className="sub leading-none hidden sm:block" style={{ fontSize: '10.5px', color: '#64748b' }}>
          Autonomous CRM
        </div>
      </div>

      <div className="grow" />

      {/* Action 1: Sync Button (Icon-only, hover title) */}
      <button
        type="button"
        onClick={handleManualSync}
        className="btn ghost p-2 flex items-center justify-center cursor-pointer rounded-lg relative"
        style={{ border: '1px solid rgba(255,255,255,0.1)' }}
        title="Sync dashboard now"
        aria-label="Sync dashboard now"
      >
        <span
          className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${
            isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'
          }`}
        />
        <svg
          className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
          style={{ color: '#cbd5e1' }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="23 4 23 10 17 10" />
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
        </svg>
      </button>

      {/* Action 2: Tour Button (Icon-only, hover title) */}
      <button
        type="button"
        onClick={handleStartTour}
        className="btn ghost p-2 flex items-center justify-center cursor-pointer rounded-lg"
        style={{ border: '1px solid rgba(255,255,255,0.1)' }}
        title="Start interactive tour"
        aria-label="Start interactive tour"
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ color: 'var(--yellow)' }}
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" />
        </svg>
      </button>

      {/* Action 3: Notifications Popover (Icon-only, hover title) */}
      <div className="relative" ref={notifRef}>
        <button
          type="button"
          onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          className="btn ghost p-2 flex items-center justify-center cursor-pointer rounded-lg relative transition-all"
          style={
            totalPending > 0
              ? { border: '1px solid rgba(245,197,24,0.4)', color: '#fcd34d', background: 'rgba(245,197,24,0.1)' }
              : { border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1' }
          }
          title={totalPending > 0 ? `${totalPending} items require attention` : 'Attention & Approvals'}
          aria-label={totalPending > 0 ? `${totalPending} items require attention` : 'Attention & Approvals'}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {totalPending > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white font-extrabold text-[9px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center animate-pulse">
              {totalPending}
            </span>
          )}
        </button>

        {/* Notifications Popover Dropdown */}
        {isNotificationOpen && (
          <div className="absolute right-0 mt-2 w-72 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden">
            <div className="p-2.5 border-b border-slate-100 flex items-center justify-between text-xs font-bold" style={{ background: '#f8fafc', color: '#0f172a' }}>
              <span>Attention Items ({totalPending})</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md border" style={{ color: '#92400e', background: '#fef3c7', borderColor: '#fde68a' }}>
                Action Required
              </span>
            </div>

            <div className="max-h-56 overflow-y-auto divide-y divide-slate-100 p-1 text-[11.5px]">
              {totalPending === 0 ? (
                <div className="py-4 text-center text-slate-400">
                  ✓ Everything is clear!
                </div>
              ) : (
                <>
                  {approvalsCount > 0 && (
                    <div className="p-2 hover:bg-slate-50 rounded flex items-start gap-2">
                      <span className="shrink-0">📝</span>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-slate-900">
                          {approvalsCount} Content Drafts Pending
                        </div>
                        <div className="text-[10.5px] text-slate-500">
                          Awaiting staging to WordPress.
                        </div>
                      </div>
                    </div>
                  )}

                  {hotLeadsCount > 0 && (
                    <div className="p-2 hover:bg-slate-50 rounded flex items-start gap-2">
                      <span className="shrink-0">🔥</span>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-slate-900">
                          {hotLeadsCount} Hot Lead Waiting
                        </div>
                        <div className="text-[10.5px] text-slate-500">
                          Scored 70+ requiring phone call.
                        </div>
                      </div>
                    </div>
                  )}

                  {escalationsCount > 0 && (
                    <div className="p-2 hover:bg-slate-50 rounded flex items-start gap-2">
                      <span className="shrink-0">⚠️</span>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-slate-900">
                          {escalationsCount} Escalated Query
                        </div>
                        <div className="text-[10.5px] text-slate-500">
                          Human response needed.
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="p-2 border-t border-slate-100" style={{ background: '#f8fafc' }}>
              <button
                type="button"
                onClick={handleJumpToAttention}
                className="w-full text-center py-1.5 px-2.5 font-bold text-[11px] rounded-lg cursor-pointer transition-colors"
                style={{ background: 'var(--slate)', color: '#fff' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--slate-2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--slate)'; }}
              >
                Go to Approvals &amp; Hot Leads →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Action 4: Fullscreen Toggle (Icon-only, hover title) */}
      <button
        type="button"
        onClick={handleToggleFullscreen}
        className="btn ghost p-2 hidden sm:inline-flex items-center justify-center cursor-pointer rounded-lg"
        style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1' }}
        title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {isFullscreen ? (
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
          ) : (
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          )}
        </svg>
      </button>

      {/* Action 5: Print Button (Icon-only, hover title) */}
      <button
        type="button"
        className="btn ghost p-2 flex items-center justify-center rounded-lg cursor-pointer"
        style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1' }}
        onClick={() => window.print()}
        title="Print / Save PDF"
        aria-label="Print / Save PDF"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
      </button>
    </header>
  );
}

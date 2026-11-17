import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeNodePanel } from '../API/slices/workflowSlice.js';
import { WORKFLOW_DETAILS } from '../API/mockData.js';
import AppIcon from './AppIcon.jsx';

const NODE_COLORS = {
  inputs: { bg: '#e8f0fe', fg: '#2563eb', icon: 'chart' },
  orch: { bg: '#273444', fg: '#f5c518', icon: 'bot' },
  goals: { bg: '#e7f7ed', fg: '#16a34a', icon: 'user' },
  research: { bg: '#e8f0fe', fg: '#2563eb', icon: 'search' },
  content: { bg: '#fdeaea', fg: '#dc2626', icon: 'file' },
  seo: { bg: '#e7f7ed', fg: '#16a34a', icon: 'trend' },
  ads: { bg: '#fef3e2', fg: '#d97706', icon: 'mega' },
  social: { bg: '#f1eafe', fg: '#7c3aed', icon: 'users' },
  assistant: { bg: '#e2f6f4', fg: '#0d9488', icon: 'chat' },
  s_content: { bg: '#fdeaea', fg: '#dc2626', icon: 'file' },
  s_publish: { bg: '#e8f0fe', fg: '#2563eb', icon: 'send' },
  s_ads: { bg: '#fef3e2', fg: '#d97706', icon: 'target' },
  s_crm: { bg: '#e7f7ed', fg: '#16a34a', icon: 'funnel' },
  s_follow: { bg: '#f1eafe', fg: '#7c3aed', icon: 'mail' },
  r_sources: { bg: '#e8f0fe', fg: '#2563eb', icon: 'chart' },
  r_reports: { bg: '#e8f0fe', fg: '#2563eb', icon: 'chart' },
  r_ai: { bg: '#273444', fg: '#f5c518', icon: 'bot' },
  r_results: { bg: '#e7f7ed', fg: '#16a34a', icon: 'check' },
};

export default function NodeDetailsPanel() {
  const dispatch = useDispatch();
  const { isPanelOpen, selectedNodeKey } = useSelector((state) => state.workflow);

  const nodeInfo = selectedNodeKey ? WORKFLOW_DETAILS[selectedNodeKey] : null;
  const colorConfig = (selectedNodeKey && NODE_COLORS[selectedNodeKey])
    ? NODE_COLORS[selectedNodeKey]
    : { bg: '#e8f0fe', fg: '#2563eb', icon: 'chart' };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isPanelOpen) {
        dispatch(closeNodePanel());
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPanelOpen, dispatch]);

  return (
    <>
      {/* Overlay Backdrop */}
      <div
        className={`ov ${isPanelOpen ? 'open' : ''}`}
        id="ov"
        onClick={() => dispatch(closeNodePanel())}
      />

      {/* Slide-out Panel */}
      <aside className={`panel ${isPanelOpen ? 'open' : ''}`} id="panel">
        {nodeInfo && (
          <>
            <div className="ph">
              <div
                className="ic"
                id="pic"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '11px',
                  display: 'grid',
                  placeItems: 'center',
                  background: colorConfig.bg,
                  color: colorConfig.fg,
                }}
              >
                <AppIcon name={colorConfig.icon} />
              </div>
              <h2 id="pt">{nodeInfo.t}</h2>
              <button
                type="button"
                className="x"
                id="px"
                onClick={() => dispatch(closeNodePanel())}
              >
                ×
              </button>
            </div>

            <div className="pb" id="pb">
              <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--text)', lineHeight: 1.5 }}>
                {nodeInfo.does}
              </p>

              {nodeInfo.in && nodeInfo.in.length > 0 && (
                <>
                  <h4>Inputs</h4>
                  <ul>
                    {nodeInfo.in.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {nodeInfo.out && nodeInfo.out.length > 0 && (
                <>
                  <h4>Outputs</h4>
                  <ul>
                    {nodeInfo.out.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {nodeInfo.ctl && nodeInfo.ctl.length > 0 && (
                <>
                  <h4>Your control</h4>
                  <ul>
                    {nodeInfo.ctl.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </>
        )}
      </aside>
    </>
  );
}

import { useDispatch, useSelector } from 'react-redux';
import { setFeedFilter } from '../../API/slices/dashboardSlice.js';
import { fetchActivityFeed } from '../../API/thunks/dashboardThunks.js';
import AppIcon from '../AppIcon.jsx';

const AGENT_CONFIG = {
  research: { icon: 'search', bg: '#e8f0fe', fg: '#2563eb', name: 'Research agent' },
  content: { icon: 'file', bg: '#fdeaea', fg: '#dc2626', name: 'Content agent' },
  seo: { icon: 'trend', bg: '#e7f7ed', fg: '#16a34a', name: 'SEO agent' },
  ads: { icon: 'mega', bg: '#fef3e2', fg: '#d97706', name: 'Ads agent' },
  social: { icon: 'users', bg: '#f1eafe', fg: '#7c3aed', name: 'Social agent' },
  assistant: { icon: 'chat', bg: '#e2f6f4', fg: '#0d9488', name: 'Customer assistant' },
  orch: { icon: 'bot', bg: '#273444', fg: '#f5c518', name: 'AI Marketing Manager' },
  crm: { icon: 'funnel', bg: '#e7f7ed', fg: '#16a34a', name: 'CRM' },
  follow: { icon: 'mail', bg: '#f1eafe', fg: '#7c3aed', name: 'Follow-up engine' },
  publish: { icon: 'send', bg: '#e8f0fe', fg: '#2563eb', name: 'Publisher' },
  report: { icon: 'chart', bg: '#e8f0fe', fg: '#2563eb', name: 'Reporting' },
};

const CATCOL = {
  lead: '#16a34a',
  follow: '#7c3aed',
  content: '#dc2626',
  ads: '#d97706',
  social: '#db2777',
  ai: '#1f2a37',
  you: '#f5c518',
};

const FILTER_BUTTONS = [
  { label: 'All', cat: 'all' },
  { label: 'Leads', cat: 'lead' },
  { label: 'Follow-ups', cat: 'follow' },
  { label: 'Content', cat: 'content' },
  { label: 'Ads', cat: 'ads' },
  { label: 'Social', cat: 'social' },
  { label: 'AI cycle', cat: 'ai' },
];

export default function StepByStepSection() {
  const dispatch = useDispatch();
  const {
    cycleJobs,
    cycleInfo,
    feed,
    feedFilter,
    totalFeedCount,
  } = useSelector((state) => state.dashboard);

  const handleFilterClick = (cat) => {
    dispatch(setFeedFilter(cat));
    dispatch(fetchActivityFeed(cat));
  };

  return (
    <div className="sec" id="s4">
      <div className="sech">
        <div>
          <h2>
            <span className="num">4</span>What the AI is doing, step by step
          </h2>
          <p>
            Left: the hourly AI cycle, where the manager gives each agent a job. Right: every automatic action, newest first, each with the reason why.
          </p>
        </div>
      </div>

      <div className="g g2" style={{ gridTemplateColumns: '1fr 1.6fr' }}>
        {/* Left card: Hourly AI cycle */}
        <div className="card cyc">
          <div className="hd">
            <h2>🤖 Hourly AI cycle</h2>
            <span style={{ fontSize: '12px', color: 'var(--muted)' }} id="cycinfo">
              {cycleInfo}
            </span>
          </div>
          <div className="bd">
            <ul id="cyc">
              {cycleJobs.map((job, idx) => {
                const statusClass = job.status === 'run' ? 'run' : job.status === 'ok' ? 'ok' : '';
                return (
                  <li key={idx} className={statusClass}>
                    <span className="st" />
                    <span>{job.name}</span>
                    <span style={{ fontSize: '11px', color: 'var(--muted)', marginLeft: 'auto' }}>
                      {job.sub}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '10px 0 0' }}>
              The cycle runs every hour by itself. It reads your goals first, so if a goal is behind, that area gets extra work.
            </p>
          </div>
        </div>

        {/* Right card: Activity log */}
        <div className="card">
          <div className="hd">
            <h2>⚡ Activity log</h2>
            <div className="flt" id="flt">
              {FILTER_BUTTONS.map((btn) => (
                <button
                  key={btn.cat}
                  type="button"
                  className={feedFilter === btn.cat ? 'on' : ''}
                  onClick={() => handleFilterClick(btn.cat)}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
          <div className="feed" id="feed" style={{ height: '460px' }}>
            {feed.map((log) => {
              const cfg = AGENT_CONFIG[log.agent] || AGENT_CONFIG.assistant;
              return (
                <div
                  key={log.id}
                  className="fi"
                  style={{ borderLeftColor: CATCOL[log.category] || '#cbd5e1' }}
                >
                  <div className="ag" style={{ background: cfg.bg, color: cfg.fg }}>
                    <AppIcon name={cfg.icon} />
                  </div>
                  <div>
                    <div className="tx">{log.what}</div>
                    {log.why && (
                      <div className="wy">
                        <b>Why:</b> {log.why}
                      </div>
                    )}
                    <div>
                      {(log.chips || []).map((c, i) => (
                        <span key={i} className={`chip ${c[1] || ''}`}>
                          {c[0]}
                        </span>
                      ))}
                    </div>
                    <div className="tm">
                      {log.created_at_formatted} · {cfg.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            style={{
              padding: '8px 16px',
              borderTop: '1px solid #eef1f5',
              fontSize: '12px',
              color: 'var(--muted)',
            }}
            id="fcount"
          >
            {totalFeedCount || feed.length} automatic actions recorded
          </div>
        </div>
      </div>
    </div>
  );
}

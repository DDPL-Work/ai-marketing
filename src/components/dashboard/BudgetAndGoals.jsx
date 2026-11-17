import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { inr, num } from '../../utils/formatters.js';

export default function BudgetAndGoals() {
  const { budget, goals, recommendation, hourly } = useSelector(
    (state) => state.dashboard
  );

  const b = budget || {
    spend_so_far: 24350,
    monthly_budget: 40000,
    projected_month_end: 37400,
    daily_budget: 1330,
    pace_percentage: 93.5,
    is_over_budget: false,
  };

  const pace = b.pace_percentage || 0;
  const spendPercent = Math.min(100, (b.spend_so_far / b.monthly_budget) * 100);

  // SVG Chart calculation
  const s = hourly?.sessions || [];
  const l = hourly?.leads || [];
  const W = 900;
  const H = 170;
  const max = Math.max(10, ...s, ...l.map((x) => x * 20)) * 1.1;
  const getX = (i) => 30 + (i * (W - 40)) / 23;
  const getY = (v) => H - 20 - (v / max) * (H - 30);

  const sessionsPoints = s.map((v, i) => `${getX(i)},${getY(v)}`).join(' ');
  const leadsPoints = l.map((v, i) => `${getX(i)},${getY(v * 20)}`).join(' ');

  return (
    <div className="sec" id="s6">
      <div className="sech">
        <div>
          <h2>
            <span className="num">6</span>Budget &amp; goals
          </h2>
          <p>You set these in Settings. The AI plans around them and protects the budget automatically.</p>
        </div>
      </div>

      <div className="g g3" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        {/* Ad Budget Card */}
        <div className="card">
          <div className="hd">
            <h2>🛡 Ad budget</h2>
          </div>
          <div className="bd" id="budget">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <b>Spent so far</b>
              <span>
                {inr(b.spend_so_far)} of {inr(b.monthly_budget)}
              </span>
            </div>
            <div className={`bar ${pace > 105 ? 'r' : pace > 95 ? 'a' : ''}`}>
              <i style={{ width: `${spendPercent}%` }} />
            </div>
            <div style={{ fontSize: '13px', marginTop: '10px' }}>
              Expected by month-end: <b>{inr(b.projected_month_end)}</b>{' '}
              <span className={`chip ${b.is_over_budget ? 'red' : 'green'}`}>
                {b.is_over_budget ? 'over limit → AI will cut' : 'within limit'}
              </span>
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--muted)', marginTop: '8px' }}>
              Today&apos;s daily ad budget: <b style={{ color: 'var(--ink)' }}>{inr(b.daily_budget)}</b>. The AI can always lower it to protect your limit; raising it needs your approval.
            </div>
          </div>
        </div>

        {/* Monthly Goals Card */}
        <div className="card">
          <div className="hd">
            <h2>🎯 Monthly goals</h2>
          </div>
          <div className="bd" id="goals">
            {(goals || []).map((g, idx) => {
              const label = g.metric_label || g.name || `Goal ${idx + 1}`;
              const goalKey = g.metric_key || label || `goal-${idx}`;
              const currentVal = g.current ?? 0;
              const targetVal = g.target ?? 1;
              const pct = Math.min(100, Math.round((currentVal / targetVal) * 100));
              const isCurr = g.is_currency || label.includes('₹') || label.toLowerCase().includes('cost');

              return (
                <div key={goalKey} style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <b>{label}</b>
                    <span>
                      {isCurr ? inr(currentVal) : num(currentVal)} of{' '}
                      {isCurr ? inr(targetVal) : num(targetVal)}
                    </span>
                  </div>
                  <div className={`bar ${pct < 60 ? 'r' : pct < 85 ? 'a' : ''}`}>
                    <i style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Latest AI recommendation Card */}
        <div className="card">
          <div className="hd">
            <h2>💡 Latest AI recommendation</h2>
          </div>
          <div className="bd" id="rec" style={{ fontSize: '13px', color: 'var(--muted)' }}>
            {recommendation ? (
              typeof recommendation === 'object' && recommendation !== null ? (
                <div>
                  <b style={{ color: 'var(--ink)', fontSize: '14px', display: 'block' }}>
                    {recommendation.title || 'AI Recommendation'}
                  </b>
                  <div style={{ marginTop: '5px' }}>{recommendation.desc}</div>
                </div>
              ) : (
                <div style={{ color: 'var(--ink)', lineHeight: 1.5 }}>
                  {String(recommendation)}
                </div>
              )
            ) : (
              'Appears after the first AI cycle.'
            )}
          </div>
        </div>
      </div>

      {/* Hourly chart card */}
      <div className="card" style={{ marginTop: '14px' }}>
        <div className="hd">
          <h2>Today, hour by hour</h2>
          <div className="legend2">
            <span>
              <i style={{ background: '#2563eb' }} />
              Website visitors
            </span>
            <span>
              <i style={{ background: '#dc2626' }} />
              New leads (×20 so it&apos;s visible)
            </span>
          </div>
        </div>
        <div className="bd" id="chart">
          {s.length > 0 && (
            <svg className="chart" viewBox={`0 0 ${W} ${H}`} style={{ height: `${H}px` }}>
              {[0, 0.5, 1].map((t) => (
                <Fragment key={t}>
                  <line
                    x1="30"
                    x2={W - 10}
                    y1={getY(max * t)}
                    y2={getY(max * t)}
                    stroke="#eef1f5"
                  />
                  <text
                    x="24"
                    y={getY(max * t) + 3}
                    textAnchor="end"
                    fontSize="10"
                    fill="#94a3b8"
                  >
                    {Math.round(max * t)}
                  </text>
                </Fragment>
              ))}
              <polyline fill="none" stroke="#2563eb" strokeWidth="2.2" points={sessionsPoints} />
              <polyline fill="none" stroke="#dc2626" strokeWidth="2.2" points={leadsPoints} />
              {s.map((v, i) => (
                <circle key={i} cx={getX(i)} cy={getY(v)} r="2.5" fill="#2563eb" />
              ))}
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

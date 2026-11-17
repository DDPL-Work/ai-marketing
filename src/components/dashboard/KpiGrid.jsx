import { useSelector } from 'react-redux';
import { inr, num } from '../../utils/formatters.js';

export default function KpiGrid() {
  const { stats, bumpKpiId } = useSelector((state) => state.dashboard);

  const sessionsText = stats.sessions !== null && stats.sessions !== undefined
    ? num(stats.sessions)
    : 'Not Connected';
  const sessionsWhy = stats.sessions !== null && stats.sessions !== undefined
    ? 'People who visited your website this month.'
    : (stats.sessions_status || 'Google Analytics not connected.');
  const budgetWhy = stats.monthly_budget > 0
    ? `Google + Meta this month, out of your ${inr(stats.monthly_budget)} limit.`
    : 'Ad spend tracked from MySQL. Budget limit not configured.';

  const kpis = [
    {
      id: 'sessions',
      label: 'Website visitors',
      value: sessionsText,
      why: sessionsWhy,
    },
    {
      id: 'leads',
      label: 'Enquiries (leads)',
      value: num(stats.leads),
      why: `People who contacted you from any channel. ${stats.hot_leads || 0} were hot.`,
    },
    {
      id: 'bookings',
      label: 'Consultations booked',
      value: num(stats.bookings),
      why: 'Calls booked automatically by the AI assistant.',
    },
    {
      id: 'cpl',
      label: 'Cost per lead',
      value: inr(stats.cpl),
      why: 'Ad spend ÷ leads from ads. Lower is better.',
    },
    {
      id: 'spend',
      label: 'Ad spend',
      value: inr(stats.ad_spend),
      why: budgetWhy,
    },
    {
      id: 'published',
      label: 'Content published',
      value: num(stats.published_content),
      why: 'Blogs, posts and website updates that went live.',
    },
    {
      id: 'msgs',
      label: 'Follow-ups sent',
      value: num(stats.follow_up_messages),
      why: 'Automatic emails and WhatsApps, so no lead is forgotten.',
    },
    {
      id: 'won',
      label: 'Deals won (live)',
      value: stats.deals_won ? `${stats.deals_won} · ${inr(stats.deals_won_value)}` : '0',
      why: 'Leads that became customers while this page was open.',
    },
  ];

  return (
    <div className="sec" id="s2">
      <div className="sech">
        <div>
          <h2>
            <span className="num">2</span>Your results this month
          </h2>
          <p>
            Numbers update live. <span className="trend">Green</span> = just went up. The line under each number explains what it means.
          </p>
        </div>
      </div>

      <div className="g g4" id="kpis">
        {kpis.map((kpi) => {
          const isBumped = bumpKpiId === kpi.id;
          return (
            <div key={kpi.id} className="card kpi">
              <div className="l">{kpi.label}</div>
              <div className={`v ${isBumped ? 'bump' : ''}`} id={`kv-${kpi.id}`}>
                {kpi.value}
              </div>
              <div className="why">{kpi.why}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

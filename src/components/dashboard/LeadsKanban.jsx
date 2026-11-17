import { useSelector } from 'react-redux';
import { inr } from '../../utils/formatters.js';

const STAGES = [
  ['new', 'New', 'Just arrived. Being scored.'],
  ['in_progress', 'In progress', 'AI replied instantly. Consultation & proposals running.'],
  ['won', 'Won', 'Customer! Review request sent.'],
  ['lost', 'Lost', 'Not now. Re-engaged in 14 days.'],
];

const SOURCE_LABELS = {
  website_form: 'Website form',
  google_ads: 'Google Ads',
  meta_ads: 'Meta lead ad',
  live_chat: 'Live chat',
  instagram: 'Instagram',
  whatsapp: 'WhatsApp',
  phone: 'Phone (AI voice agent)',
  facebook: 'Facebook',
  organic: 'Google search',
};

const getScoreClass = (score) => {
  const num = Number(score) || 0;
  if (num >= 70) return 'hot';
  if (num >= 45) return 'warm';
  return 'cold';
};

export default function LeadsKanban() {
  const { leads, activePipelineValue } = useSelector((state) => state.dashboard);

  return (
    <div className="sec" id="s5">
      <div className="sech">
        <div>
          <h2>
            <span className="num">5</span>Where every lead is
          </h2>
          <p>
            Every enquiry is scored automatically (
            <span className="sc hot">70+</span> hot,{' '}
            <span className="sc warm">45+</span> warm,{' '}
            <span className="sc cold">&lt;45</span> cold) and moves through these stages without manual work.
          </p>
        </div>
        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)' }} id="pipeval">
          Open pipeline: {inr(activePipelineValue)}
        </span>
      </div>

      <div className="card">
        <div className="bd">
          <div className="kb" id="kb">
            {STAGES.map(([stageKey, label, desc]) => {
              const columnLeads = leads.filter(
                (l) =>
                  l.stage === stageKey ||
                  (stageKey === 'in_progress' &&
                    ['contacted', 'qualified', 'proposal'].includes(l.stage))
              );

              return (
                <div key={stageKey} className="kc">
                  <h4>
                    <span>{label}</span>
                    <span style={{ color: 'var(--muted)' }}>{columnLeads.length}</span>
                  </h4>
                  <p>{desc}</p>
                  {columnLeads.slice(0, 5).map((l) => (
                    <div key={l.id} className="lc">
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <b>{l.name}</b> <span className={`sc ${getScoreClass(l.score)}`}>{l.score}</span>
                      </div>
                      <div className="m">
                        {SOURCE_LABELS[l.source] || l.source} · {inr(l.deal_value)}
                      </div>
                    </div>
                  ))}
                  {columnLeads.length > 5 && (
                    <div className="m" style={{ textAlign: 'center', fontSize: '11px', color: 'var(--muted)' }}>
                      +{columnLeads.length - 5} more
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

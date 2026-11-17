import { useDispatch, useSelector } from 'react-redux';
import { setAttentionTab } from '../../API/slices/dashboardSlice.js';
import {
  handleApprovalAction,
  approveAllContent,
  markLeadCalled,
  resolveEscalation,
} from '../../API/thunks/dashboardThunks.js';
import { inr } from '../../utils/formatters.js';

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

const AGENT_NAMES = {
  research: 'Research agent',
  content: 'Content agent',
  seo: 'SEO agent',
  ads: 'Ads agent',
  social: 'Social agent',
  assistant: 'Customer assistant',
  orch: 'AI Marketing Manager',
};

export default function AttentionSection() {
  const dispatch = useDispatch();
  const { attention, attentionTab } = useSelector((state) => state.dashboard);

  const approvals = attention.approvals || [];
  const hotLeads = attention.hot_leads || [];
  const escalations = attention.escalations || [];

  const counts = attention.counts || {
    approvals: approvals.length,
    hot_leads: hotLeads.length,
    escalations: escalations.length,
  };

  const empty = (text) => (
    <div style={{ color: 'var(--muted)', fontSize: '13px', textAlign: 'center', padding: '18px' }}>
      {text}
    </div>
  );

  return (
    <div className="sec" id="s3">
      <div className="sech">
        <div>
          <h2>
            <span className="num">3</span>Needs your attention
          </h2>
          <p>
            The only things the AI won&apos;t do without you: approving content and budget increases, calling hot leads, and handling complaints.
          </p>
        </div>
      </div>

      <div className="card">
        <div className="att-tabs">
          <button
            type="button"
            className={attentionTab === 'ap' ? 'on' : ''}
            onClick={() => dispatch(setAttentionTab('ap'))}
          >
            To approve<span className="c" id="c-ap">{counts.approvals || 0}</span>
          </button>
          <button
            type="button"
            className={attentionTab === 'hot' ? 'on' : ''}
            onClick={() => dispatch(setAttentionTab('hot'))}
          >
            Hot leads to call<span className="c" id="c-hot">{counts.hot_leads || 0}</span>
          </button>
          <button
            type="button"
            className={attentionTab === 'esc' ? 'on' : ''}
            onClick={() => dispatch(setAttentionTab('esc'))}
          >
            Escalated to you<span className="c" id="c-esc">{counts.escalations || 0}</span>
          </button>
          <div className="grow" />
          <button
            type="button"
            className="btn2 sm ok"
            id="apall"
            onClick={() => dispatch(approveAllContent())}
          >
            Approve all content
          </button>
        </div>

        <div className="bd" id="att" style={{ maxHeight: '330px', overflowY: 'auto' }}>
          {attentionTab === 'ap' && (
            approvals.length ? (
              approvals.map((a) => (
                <div key={a.id} className="ap" id={`ap-${a.id}`}>
                  <span className={`chip ${String(a.item_type).startsWith('Budget') ? 'amber' : 'blue'}`}>
                    {a.item_type} · {a.channel}
                  </span>
                  <div><b>{a.title}</b></div>
                  <div className="r">
                    <span style={{ fontSize: '11.5px', color: 'var(--muted)' }}>
                      Written by the {AGENT_NAMES[a.agent] || a.agent} ·{' '}
                      {String(a.item_type).startsWith('Budget')
                        ? 'applied as soon as you approve'
                        : 'publishes automatically after you approve'}
                    </span>
                    <span>
                      <button
                        type="button"
                        className="btn2 sm"
                        onClick={() => dispatch(handleApprovalAction({ id: a.id, action: 'reject' }))}
                      >
                        Reject
                      </button>{' '}
                      <button
                        type="button"
                        className="btn2 sm ok"
                        onClick={() => dispatch(handleApprovalAction({ id: a.id, action: 'approve' }))}
                      >
                        Approve
                      </button>
                    </span>
                  </div>
                </div>
              ))
            ) : (
              empty('Nothing to approve. New drafts appear here during each AI cycle. Turn on “Auto-approve” to skip this step.')
            )
          )}

          {attentionTab === 'hot' && (
            hotLeads.length ? (
              hotLeads.map((l) => (
                <div key={l.id} className="ap">
                  <div className="r" style={{ margin: 0 }}>
                    <div>
                      <b>{l.name}</b> <span className="sc hot">{l.score}</span>
                      <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                        {l.message || 'Enquiry received'}
                      </div>
                      <div style={{ fontSize: '11.5px', color: 'var(--muted)' }}>
                        {SOURCE_LABELS[l.source] || l.source} · {l.phone || 'No phone'} · worth about {inr(l.deal_value)}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn2 sm ok"
                      onClick={() => dispatch(markLeadCalled(l.id))}
                    >
                      📞 Mark called
                    </button>
                  </div>
                </div>
              ))
            ) : (
              empty("No hot leads waiting. Hot leads that haven't booked a call yet show here so you can phone them.")
            )
          )}

          {attentionTab === 'esc' && (
            escalations.length ? (
              escalations.map((e) => (
                <div key={e.id} className="ap">
                  <span className="chip red">{e.channel} comment</span>
                  <div><b>{e.sender}:</b> “{e.message}”</div>
                  <div className="r">
                    <span style={{ fontSize: '11.5px', color: 'var(--muted)' }}>
                      Reason: {e.reason} · The AI doesn&apos;t answer complaints. Reply personally.
                    </span>
                    <button
                      type="button"
                      className="btn2 sm ok"
                      onClick={() => dispatch(resolveEscalation(e.id))}
                    >
                      Mark handled
                    </button>
                  </div>
                </div>
              ))
            ) : (
              empty("Nothing escalated. Complaints and questions the AI can't answer will show here.")
            )
          )}
        </div>
      </div>
    </div>
  );
}

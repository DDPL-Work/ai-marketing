import { useDispatch, useSelector } from 'react-redux';
import { handleCustomerReplyAction } from '../../API/thunks/agentThunks.js';

export default function CustomerRepliesPane() {
  const dispatch = useDispatch();
  const { customerReplies } = useSelector((state) => state.agentTasks);

  return (
    <div id="pane-replies" className="agent-pane" style={{ padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '15px', color: 'var(--ink)' }}>
            Customer Reply Suggestions (Agent 4)
          </h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--muted)' }}>
            Strict Safety Rule: Suggestions only. Human approval is required before sending to customers.
          </p>
        </div>
      </div>

      <div id="agent-replies-list">
        {customerReplies.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '24px' }}>
            No customer reply suggestions pending.
          </div>
        ) : (
          customerReplies.map((r) => {
            const isPending =
              r.status === 'pending_review' ||
              r.send_status === 'not_sent_human_review_required';

            return (
              <div key={r.id} className="content-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <div>
                    <b>{r.customer_name || 'Anonymous Customer'}</b>{' '}
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                      via {r.enquiry_source || 'Enquiry'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span className={`sc ${r.priority === 'high' ? 'hot' : 'warm'}`}>
                      {r.priority || 'normal'}
                    </span>
                    <span className="chip">{r.sentiment || 'neutral'}</span>
                    <span className="chip amber">Strict Human Review Required</span>
                  </div>
                </div>

                <div
                  style={{
                    fontSize: '12.5px',
                    color: 'var(--muted)',
                    background: '#f8fafc',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    margin: '6px 0',
                  }}
                >
                  <b>Incoming Enquiry:</b> “{r.customer_message}”
                </div>

                <div
                  style={{
                    background: '#f0fdf4',
                    borderLeft: '3px solid var(--green)',
                    borderRadius: '4px',
                    padding: '10px 12px',
                    margin: '8px 0',
                    fontSize: '13px',
                  }}
                >
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--green)', marginBottom: '4px' }}>
                    🤖 Agent 4 Suggested Reply:
                  </div>
                  <div style={{ color: 'var(--ink)' }}>{r.suggested_reply}</div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '10px',
                    borderTop: '1px solid #eef1f5',
                    paddingTop: '8px',
                  }}
                >
                  <span style={{ fontSize: '11.5px', color: 'var(--muted)' }}>
                    Status: <code>{r.send_status}</code> · Cannot auto-send without human consent.
                  </span>
                  <div>
                    {isPending ? (
                      <>
                        <button
                          type="button"
                          className="btn2 sm"
                          onClick={() => dispatch(handleCustomerReplyAction({ id: r.id, status: 'dismissed' }))}
                        >
                          Dismiss
                        </button>{' '}
                        <button
                          type="button"
                          className="btn2 sm ok"
                          onClick={() => dispatch(handleCustomerReplyAction({ id: r.id, status: 'approved_to_send' }))}
                        >
                          Approve &amp; Mark Sent
                        </button>
                      </>
                    ) : (
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--green)' }}>
                        ✓ {r.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

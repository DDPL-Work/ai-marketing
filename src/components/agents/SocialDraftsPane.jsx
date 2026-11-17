import { useDispatch, useSelector } from 'react-redux';
import { handleSocialDraftAction } from '../../API/thunks/agentThunks.js';

const P_ICONS = {
  Facebook: 'blue',
  Instagram: 'pink',
  LinkedIn: 'blue',
  YouTube: 'red',
};

export default function SocialDraftsPane() {
  const dispatch = useDispatch();
  const { socialDrafts } = useSelector((state) => state.agentTasks);

  return (
    <div id="pane-social" className="agent-pane" style={{ padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '15px', color: 'var(--ink)' }}>
            Social Media Drafts (Agent 4)
          </h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--muted)' }}>
            Platform-specific drafts for Facebook, Instagram, LinkedIn, and YouTube. Stays in draft status until manually verified.
          </p>
        </div>
      </div>

      <div id="agent-social-list" className="g g2">
        {socialDrafts.length === 0 ? (
          <div style={{ gridColumn: 'span 2', textAlign: 'center', color: 'var(--muted)', padding: '24px' }}>
            No social drafts generated yet.
          </div>
        ) : (
          socialDrafts.map((d) => {
            const col = P_ICONS[d.platform] || 'blue';
            const isPending = d.status === 'draft';

            return (
              <div key={d.id} className="card" style={{ padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className={`chip ${col}`}>
                    <b>{d.platform}</b>
                  </span>
                  <span
                    className={`chip ${
                      d.status === 'approved'
                        ? 'green'
                        : d.status === 'dismissed'
                        ? 'red'
                        : 'amber'
                    }`}
                  >
                    {d.status}
                  </span>
                </div>

                <p style={{ margin: '8px 0', fontSize: '13px', lineHeight: 1.45, color: 'var(--ink)' }}>
                  {d.post_text}
                </p>

                {d.hashtags && (
                  <div style={{ fontSize: '11.5px', color: 'var(--blue)', marginBottom: '8px' }}>
                    {d.hashtags}
                  </div>
                )}

                {d.image_prompt && (
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'var(--muted)',
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      padding: '6px',
                      marginBottom: '8px',
                    }}
                  >
                    <b>AI Image Prompt:</b> {d.image_prompt}
                  </div>
                )}

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid #eef1f5',
                    paddingTop: '8px',
                    marginTop: '6px',
                  }}
                >
                  <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Agent 4 Staged Draft</span>
                  <div>
                    {isPending ? (
                      <>
                        <button
                          type="button"
                          className="btn2 sm"
                          onClick={() => dispatch(handleSocialDraftAction({ id: d.id, status: 'dismissed' }))}
                        >
                          Dismiss
                        </button>{' '}
                        <button
                          type="button"
                          className="btn2 sm ok"
                          onClick={() => dispatch(handleSocialDraftAction({ id: d.id, status: 'approved' }))}
                        >
                          Approve Post
                        </button>
                      </>
                    ) : (
                      <span style={{ fontSize: '11.5px', color: 'var(--muted)' }}>{d.status}</span>
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

import { useDispatch, useSelector } from 'react-redux';
import { handleContentApproval } from '../../API/thunks/agentThunks.js';

export default function ContentPackagesPane() {
  const dispatch = useDispatch();
  const { contents } = useSelector((state) => state.agentTasks);

  const getStatusChip = (status) => {
    if (status === 'approved' || status === 'wp_draft_created') return 'green';
    if (status === 'rejected') return 'red';
    return 'amber';
  };

  return (
    <div id="pane-content" className="agent-pane" style={{ padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '15px', color: 'var(--ink)' }}>
            Blog Content Packages (Agent 2 Draft + Agent 3 SEO + Agent 1 Approval)
          </h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--muted)' }}>
            Safety Gate: Approving creates a WordPress draft only (post_status=&apos;draft&apos;). Never published automatically.
          </p>
        </div>
      </div>

      <div id="agent-content-list">
        {contents.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '24px' }}>
            No content packages generated yet. Run the 4-agent workflow to create SEO blog content!
          </div>
        ) : (
          contents.map((c) => {
            const brief = c.content_brief || {};
            const seo = c.seo_review || {};
            const ad = c.ad_strategy || {};
            const isPending =
              c.status === 'seo_reviewed' ||
              c.status === 'draft' ||
              c.status === 'pending';
            const isWpDraft = c.status === 'wp_draft_created' || c.wp_post_id;
            const stCls = getStatusChip(c.status);

            return (
              <div key={c.id} className="content-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '16px', color: 'var(--ink)' }}>
                      {c.topic || 'Untitled Article'}
                    </h4>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                      Target Audience: <b>{c.audience || 'Target Demographic'}</b> · Created: {c.created_at_formatted || c.created_at}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <span className={`chip ${stCls}`}>{c.status}</span>
                    {isWpDraft && (
                      <span className="chip teal" style={{ fontWeight: 700 }}>
                        ✓ WordPress Draft #{c.wp_post_id}
                      </span>
                    )}
                    {c.wp_post_url && (
                      <a
                        href={c.wp_post_url}
                        target="_blank"
                        rel="noreferrer"
                        className="chip blue"
                        style={{ textDecoration: 'none' }}
                      >
                        🔗 Open Draft
                      </a>
                    )}
                  </div>
                </div>

                {/* SEO Meta & Highlights */}
                <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '10px 12px', margin: '10px 0', fontSize: '12.5px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <b>Agent 3 SEO Audit:</b> <span className="chip green">SEO Score: {seo.seo_score || 85}/100</span>
                  </div>
                  <div><b>Meta Title:</b> {seo.meta_title || 'N/A'}</div>
                  <div style={{ marginTop: '2px' }}><b>Meta Description:</b> {seo.meta_description || 'N/A'}</div>
                  <div style={{ marginTop: '4px' }}>
                    <b>Keywords:</b> <span className="chip blue">{seo.primary_keyword || 'primary'}</span>{' '}
                    {(seo.secondary_keywords || []).map((k, i) => (
                      <span key={i} className="chip">{k}</span>
                    ))}
                  </div>
                </div>

                {/* Collapsible Content Brief & Full Draft */}
                <details style={{ margin: '10px 0' }}>
                  <summary style={{ cursor: 'pointer', color: 'var(--blue)', fontWeight: 700, fontSize: '12.5px' }}>
                    📖 View Agent 2 Blog Draft &amp; AI Image Prompt
                  </summary>
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px' }}>
                      <b>AI Image Prompt:</b> <i>{brief.image_prompt || 'N/A'}</i>
                    </div>
                    <div className="code-box">{c.draft_post || 'No draft body content'}</div>
                  </div>
                </details>

                {/* Ad Strategy Proposal if available */}
                {ad.ad_campaign_name && (
                  <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '8px', padding: '8px 12px', margin: '8px 0', fontSize: '12px' }}>
                    <b>Agent 3 Ad Proposal:</b> {ad.ad_campaign_name} · Suggested Budget: <b>₹{ad.recommended_daily_budget || 500}/day</b> (Requires Owner Approval)
                  </div>
                )}

                {/* Human Approval Action Gate */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', borderTop: '1px solid #eef1f5', paddingTop: '10px', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ fontSize: '11.5px', color: 'var(--muted)' }}>
                    WordPress Rule: Approving creates a post with <code>post_status=&apos;draft&apos;</code> for final human publishing.
                  </span>
                  <div>
                    {isPending ? (
                      <>
                        <button
                          type="button"
                          className="btn2 sm"
                          onClick={() => dispatch(handleContentApproval({ id: c.id, action: 'reject' }))}
                        >
                          ❌ Reject
                        </button>{' '}
                        <button
                          type="button"
                          className="btn2 sm ok"
                          onClick={() => dispatch(handleContentApproval({ id: c.id, action: 'approve' }))}
                        >
                          ✅ Approve to WordPress Draft
                        </button>
                      </>
                    ) : isWpDraft ? (
                      <span style={{ fontWeight: 700, color: 'var(--green)', fontSize: '12px' }}>
                        ✓ Staged in WordPress Database as Draft
                      </span>
                    ) : (
                      <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                        Decision Recorded
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

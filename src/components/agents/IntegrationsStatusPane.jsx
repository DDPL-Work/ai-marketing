import { useDispatch, useSelector } from 'react-redux';
import {
  fetchIntegrationsStatus,
  fetchWordPressStatus,
  testWordPressConnection,
} from '../../API/thunks/agentThunks.js';

const AGENT_TITLES = {
  agent_1: ['Agent 1 · Marketing Manager', 'blue', 'Data Inputs & Analytics'],
  agent_2: ['Agent 2 · Research & Content', 'red', 'Research & Media APIs'],
  agent_3: ['Agent 3 · SEO & Advertising', 'green', 'Audit & Publishing APIs'],
  agent_4: ['Agent 4 · Social & Support', 'violet', 'Channels & Inbound CRM'],
};

export default function IntegrationsStatusPane() {
  const dispatch = useDispatch();
  const { integrations, wordpress, isTestingWp } = useSelector(
    (state) => state.agentTasks
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'connected':
        return <span className="chip green">🟢 Connected</span>;
      case 'configured':
        return <span className="chip amber">🟡 Configured</span>;
      case 'error':
        return <span className="chip red">🔴 Error</span>;
      case 'permission_required':
        return <span className="chip violet">🔒 Auth Required</span>;
      case 'disabled':
        return <span className="chip">⛔ Disabled</span>;
      case 'not_configured':
      default:
        return (
          <span className="chip" style={{ background: '#f1f5f9', color: '#64748b' }}>
            ⚪ Not Configured
          </span>
        );
    }
  };

  const cleanName = (str) =>
    str.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div id="pane-integrations" className="agent-pane" style={{ padding: '16px' }}>
      {/* Pane Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '15px', color: 'var(--ink)' }}>
            Agent Direct API Integrations Status
          </h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--muted)' }}>
            Directly embedded inside agent files (no central folder). Real-time credential and connection status.
          </p>
        </div>
        <button
          type="button"
          className="btn2 sm"
          onClick={() => {
            dispatch(fetchIntegrationsStatus());
            dispatch(fetchWordPressStatus());
          }}
        >
          ↻ Refresh Integrations
        </button>
      </div>

      {/* Dedicated WordPress Status & Test Card */}
      <div
        className="card"
        style={{
          padding: '16px',
          marginBottom: '16px',
          background: 'linear-gradient(135deg,#f8fafc,#ffffff)',
          border: '1px solid #e2e8f0',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '18px' }}>🌐</span>
              <h4 style={{ margin: 0, fontSize: '14px', color: 'var(--ink)', fontWeight: 700 }}>
                WordPress Business Website Integration
              </h4>
              {wordpress?.connected ? (
                <span className="chip green">🟢 Connected</span>
              ) : wordpress?.connection_details?.status === 'not_configured' ? (
                <span className="chip" style={{ background: '#f1f5f9', color: '#64748b' }}>
                  ⚪ Not Configured
                </span>
              ) : (
                <span className="chip red">🔴 Disconnected</span>
              )}
              <span className="chip green" style={{ fontSize: '10.5px' }}>
                🛡️ Draft-Only Enforced
              </span>
            </div>
            <p id="wp-site-url-display" style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--muted)' }}>
              Target: {wordpress?.site_url || 'Not configured in .env'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn2 sm"
              id="btn-wp-test"
              disabled={isTestingWp}
              onClick={() => dispatch(testWordPressConnection())}
            >
              {isTestingWp ? 'Testing…' : '⚡ Test Connection'}
            </button>
            <button
              type="button"
              className="btn2 sm"
              onClick={() => dispatch(fetchWordPressStatus())}
            >
              ↻ Refresh WP Status
            </button>
          </div>
        </div>

        <div
          id="wp-details-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
            gap: '12px',
            marginTop: '14px',
            paddingTop: '12px',
            borderTop: '1px solid #f1f5f9',
          }}
        >
          <div style={{ background: '#fff', padding: '10px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Connected Account</span>
            <div id="wp-user-display" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', marginTop: '2px' }}>
              {wordpress.account?.data?.name || wordpress.account?.data?.username
                ? `${wordpress.account.data.name || wordpress.account.data.username} (${wordpress.account.data.roles?.join(', ') || 'User'})`
                : '—'}
            </div>
          </div>
          <div style={{ background: '#fff', padding: '10px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>SEO Plugin</span>
            <div id="wp-seo-display" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', marginTop: '2px' }}>
              {wordpress.seo_plugin?.data?.detected_seo_plugin === 'rank_math' ? (
                <>
                  Rank Math SEO <span className="chip green">Active</span>
                </>
              ) : wordpress.seo_plugin?.data?.detected_seo_plugin === 'yoast' ? (
                <>
                  Yoast SEO <span className="chip green">Active</span>
                </>
              ) : (
                'Standard WordPress SEO'
              )}
            </div>
          </div>
          <div style={{ background: '#fff', padding: '10px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Published Posts</span>
            <div id="wp-posts-count" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', marginTop: '2px' }}>
              {wordpress.posts_summary?.data?.total_posts ?? '0'}
            </div>
          </div>
          <div style={{ background: '#fff', padding: '10px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Drafts Staged</span>
            <div id="wp-drafts-count" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', marginTop: '2px' }}>
              {wordpress.drafts_summary?.data?.draft_count ?? '0'}
            </div>
          </div>
        </div>

        <div
          id="wp-status-note"
          style={{
            marginTop: '10px',
            fontSize: '11.5px',
            color: 'var(--muted)',
            background: '#f8fafc',
            padding: '8px 12px',
            borderRadius: '6px',
          }}
        >
          💡 <b>WordPress Safety Guardrail:</b> All blog posts created by Agent 3 are saved strictly as <code>draft</code> in WordPress. Automatic publishing is blocked. Manual review in WordPress Admin is required before articles go live.
        </div>
      </div>

      {/* 4 Agent Integrations Grid */}
      <div id="agent-integrations-container" className="g g4">
        {Object.entries(integrations).map(([agentKey, providers]) => {
          const [title, col, sub] = AGENT_TITLES[agentKey] || [agentKey, 'blue', ''];

          return (
            <div key={agentKey} className="card" style={{ padding: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className={`chip ${col}`}>
                  <b>{title}</b>
                </span>
              </div>
              <p style={{ fontSize: '11.5px', color: 'var(--muted)', margin: '0 0 10px' }}>
                {sub}
              </p>
              <div>
                {Object.entries(providers).map(([pName, pData]) => {
                  const st = pData.status || 'not_configured';
                  return (
                    <div
                      key={pName}
                      style={{ padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink)' }}>
                          {cleanName(pName)}
                        </span>
                        {getStatusBadge(st)}
                      </div>
                      {pData.error && (
                        <div
                          style={{
                            fontSize: '10.5px',
                            color: 'var(--red)',
                            marginTop: '2px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                          title={pData.error}
                        >
                          {pData.error}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

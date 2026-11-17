import { useSelector } from 'react-redux';
import AppIcon from '../AppIcon.jsx';

const AGENT_STYLES = {
  research: { icon: 'search', bg: '#e8f0fe', fg: '#2563eb' },
  content: { icon: 'file', bg: '#fdeaea', fg: '#dc2626' },
  seo: { icon: 'trend', bg: '#e7f7ed', fg: '#16a34a' },
  ads: { icon: 'mega', bg: '#fef3e2', fg: '#d97706' },
  social: { icon: 'users', bg: '#f1eafe', fg: '#7c3aed' },
  assistant: { icon: 'chat', bg: '#e2f6f4', fg: '#0d9488' },
  orch: { icon: 'bot', bg: '#273444', fg: '#f5c518' },
  crm: { icon: 'funnel', bg: '#e7f7ed', fg: '#16a34a' },
  follow: { icon: 'mail', bg: '#f1eafe', fg: '#7c3aed' },
  publish: { icon: 'send', bg: '#e8f0fe', fg: '#2563eb' },
  report: { icon: 'chart', bg: '#e8f0fe', fg: '#2563eb' },
};

export default function RightNowBanner() {
  const { now, hitStripIds } = useSelector((state) => state.dashboard);

  const styleConfig = AGENT_STYLES[now.agent] || AGENT_STYLES.orch;
  const isHit = (id) => hitStripIds.includes(id);

  const pathList = now.workflow_path && now.workflow_path.length
    ? now.workflow_path
    : ['CRM', 'Marketing Automation', 'Lead Pipeline'];

  return (
    <div className="sec" id="s1">
      <div className="sech">
        <div>
          <h2>
            <span className="num">1</span>Right now
          </h2>
          <p>The latest thing the system did automatically, why it did it, and which part of the workflow it went through.</p>
        </div>
      </div>

      <div className="now" id="now">
        <div
          className="big"
          id="nowic"
          style={{
            background: now.agent === 'orch' ? '#273444' : styleConfig.bg,
            color: now.agent === 'orch' ? 'var(--yellow)' : styleConfig.fg,
          }}
        >
          <AppIcon name={styleConfig.icon} />
        </div>
        <div>
          <div className="what" id="nowwhat">
            {now.what || 'Starting up…'}
          </div>
          {now.why && (
            <div className="why" id="nowwhy">
              Why: {now.why}
            </div>
          )}
          <div className="path" id="nowpath">
            {pathList.map((step, idx) => (
              <span key={idx}>{step}</span>
            )).reduce((acc, x, i) => (i === 0 ? [x] : [...acc, <i key={`arrow-${i}`}>→</i>, x]), [])}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '10px' }}>
        <div className="bd" style={{ padding: '10px 14px' }}>
          <div className="strip">
            <div className="sgrp">
              <div className={`sn ${isHit('data') ? 'hit' : ''}`} id="f-data">📊 Data inputs</div>
              <div className={`sn ${isHit('goals') ? 'hit' : ''}`} id="f-goals">🎯 Your goals &amp; budgets</div>
            </div>
            <div className="arrow">→</div>

            <div className="sgrp">
              <div className={`sn big orch ${isHit('orch') ? 'hit' : ''}`} id="f-orch">
                <AppIcon name="bot" />
                AI Marketing Manager
              </div>
            </div>
            <div className="arrow">→</div>

            <div className="sgrp agents">
              <div className={`sn ${isHit('research') ? 'hit' : ''}`} id="f-research">
                <AppIcon name="search" />
                Research
              </div>
              <div className={`sn ${isHit('content') ? 'hit' : ''}`} id="f-content">
                <AppIcon name="file" />
                Content
              </div>
              <div className={`sn ${isHit('seo') ? 'hit' : ''}`} id="f-seo">
                <AppIcon name="trend" />
                SEO
              </div>
              <div className={`sn ${isHit('ads') ? 'hit' : ''}`} id="f-ads">
                <AppIcon name="mega" />
                Ads
              </div>
              <div className={`sn ${isHit('social') ? 'hit' : ''}`} id="f-social">
                <AppIcon name="users" />
                Social
              </div>
              <div className={`sn ${isHit('assistant') ? 'hit' : ''}`} id="f-assistant">
                <AppIcon name="chat" />
                Assistant
              </div>
            </div>
            <div className="arrow">→</div>

            <div className="sgrp">
              <div className={`sn ${isHit('approve') ? 'hit' : ''}`} id="f-approve">
                <AppIcon name="check" />
                Your approval
              </div>
              <div className={`sn ${isHit('publish') ? 'hit' : ''}`} id="f-publish">
                <AppIcon name="send" />
                Publish
              </div>
            </div>
            <div className="arrow">→</div>

            <div className="sgrp">
              <div className={`sn ${isHit('campaigns') ? 'hit' : ''}`} id="f-campaigns">
                <AppIcon name="target" />
                Ad campaigns
              </div>
              <div className={`sn ${isHit('crm') ? 'hit' : ''}`} id="f-crm">
                <AppIcon name="funnel" />
                Leads &amp; CRM
              </div>
            </div>
            <div className="arrow">→</div>

            <div className="sgrp">
              <div className={`sn ${isHit('follow') ? 'hit' : ''}`} id="f-follow">
                <AppIcon name="mail" />
                Auto follow-up
              </div>
              <div className={`sn ${isHit('report') ? 'hit' : ''}`} id="f-report">
                <AppIcon name="chart" />
                Reports &amp; insights
              </div>
            </div>
            <div className="arrow">↻</div>
          </div>
        </div>
      </div>
    </div>
  );
}

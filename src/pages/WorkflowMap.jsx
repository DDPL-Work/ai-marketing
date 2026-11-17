import { useDispatch, useSelector } from 'react-redux';
import {
  startPlayback,
  setStepState,
  markNodesDone,
  finishPlayback,
  openNodePanel,
} from '../API/slices/workflowSlice.js';
import AppIcon from '../components/AppIcon.jsx';

const STEPS = [
  [['inputs', 'goals'], [], 'Collecting research data, goals & budgets'],
  [['orch'], [], 'Orchestrator analysing performance and planning the cycle'],
  [['research'], ['c1'], 'Research agent finding keyword & content opportunities'],
  [['seo'], ['c1'], 'SEO agent auditing pages and proposing meta fixes'],
  [['content'], ['c1'], 'Content agent writing an SEO blog article'],
  [['social'], ['c1'], 'Social agent creating & scheduling posts, replying to comments'],
  [['ads'], ['c1'], 'Ads agent optimising campaigns within budget'],
  [['assistant'], ['c1'], 'Customer assistant answering enquiries'],
  [['s_content'], ['c2'], 'Drafts waiting for your approval'],
  [['s_publish'], ['c2'], 'Publishing approved content to every channel'],
  [['s_ads'], ['c2'], 'Testing ad variations, enforcing budget limits'],
  [['s_crm'], ['c2'], 'Scoring and tagging new leads · alerting you to hot ones'],
  [['s_follow'], ['c2'], 'Sending instant responses and follow-up sequences'],
  [['r_sources', 'r_reports'], ['c3'], 'Collecting results and updating reports'],
  [['r_ai'], ['c3'], 'AI analysing results and creating recommendations'],
  [['r_results'], ['c3'], 'Results measured against your goals'],
  [['orch'], ['loop'], 'Learning fed back to the orchestrator — cycle complete ✓'],
];

export default function WorkflowMap() {
  const dispatch = useDispatch();
  const { isPlaying, statusMessage, activeNodes, doneNodes, activeConns } = useSelector(
    (state) => state.workflow
  );

  const handlePlayWorkflow = async () => {
    if (isPlaying) return;
    dispatch(startPlayback());

    for (const [nodes, conns, msg] of STEPS) {
      dispatch(setStepState({ nodes, conns, message: msg }));
      await new Promise((resolve) => setTimeout(resolve, 1150));
      dispatch(markNodesDone(nodes));
    }

    dispatch(finishPlayback());
  };

  const isNodeActive = (key) => activeNodes.includes(key);
  const isNodeDone = (key) => doneNodes.includes(key);
  const isConnActive = (key) => activeConns.includes(key);

  const nodeClass = (key, baseTheme = '') => {
    const active = isNodeActive(key) ? 'active' : '';
    const done = isNodeDone(key) ? 'done' : '';
    return `node ${baseTheme} ${active} ${done}`.trim();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
        <h1 style={{ margin: '0 0 4px' }}>AI Marketing Manager — complete workflow</h1>
        <button
          type="button"
          className="btn ai"
          id="play"
          disabled={isPlaying}
          onClick={handlePlayWorkflow}
        >
          <svg className="i" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 4l14 8-14 8z" />
          </svg>{' '}
          Play the workflow
        </button>
      </div>

      <p className="lead">
        One orchestrator coordinates six specialist AI agents across content, publishing, ads, lead capture and follow-up, then learns from the results. Click any box for details, or press <b>Play the workflow</b> to watch a full cycle.
      </p>

      <div className="status">
        <span className={`dot ${isPlaying ? 'run' : ''}`} id="dot" />
        <span id="stat">{statusMessage}</span>
      </div>

      {/* Tier 1 */}
      <div className="tier t1">
        <div
          className={nodeClass('inputs', 'c-blue')}
          data-k="inputs"
          onClick={() => dispatch(openNodePanel('inputs'))}
        >
          <div className="nt">
            <div className="ic" data-ic="chart">
              <AppIcon name="chart" />
            </div>
            <h3>Data inputs &amp; research</h3>
          </div>
          <ul>
            <li>Website analytics (Google Analytics)</li>
            <li>Search data (Search Console)</li>
            <li>Competitor analysis</li>
            <li>Industry trends</li>
            <li>Customer enquiries</li>
            <li>Reviews &amp; feedback</li>
            <li>Keyword research</li>
            <li>Local market data</li>
          </ul>
        </div>

        <div
          className={nodeClass('orch', 'orch')}
          data-k="orch"
          onClick={() => dispatch(openNodePanel('orch'))}
        >
          <div className="nt">
            <div className="ic" data-ic="bot">
              <AppIcon name="bot" />
            </div>
            <div>
              <h3>
                AI Marketing Manager{' '}
                <span style={{ fontWeight: 500, opacity: 0.7 }}>(Orchestrator)</span>
              </h3>
            </div>
          </div>
          <ul>
            <li>Plans and coordinates all workflows</li>
            <li>Analyses performance and identifies opportunities</li>
            <li>Assigns tasks to specialist AI agents</li>
            <li>Monitors results and recommends improvements</li>
            <li>Handles approvals and budget controls</li>
          </ul>
        </div>

        <div
          className={nodeClass('goals', 'c-green')}
          data-k="goals"
          onClick={() => dispatch(openNodePanel('goals'))}
        >
          <div className="nt">
            <div className="ic" data-ic="user">
              <AppIcon name="user" />
            </div>
            <h3>
              Business goals &amp; settings{' '}
              <span style={{ fontWeight: 500, color: 'var(--muted)' }}>(you control)</span>
            </h3>
          </div>
          <ul>
            <li>Set business goals</li>
            <li>Set monthly budgets</li>
            <li>Approve content (optional)</li>
            <li>Set target audience and locations</li>
            <li>View reports and results</li>
            <li>Adjust priorities</li>
            <li>Receive notifications</li>
          </ul>
        </div>
      </div>

      {/* Connector 1 */}
      <div className="conn">
        <svg viewBox="0 0 100 30" preserveAspectRatio="none">
          <path
            className={`fl ${isConnActive('c1') ? 'on' : ''}`}
            id="c1"
            vectorEffect="non-scaling-stroke"
            d="M50 0 V12 H8.3 V30 M50 12 H25 V30 M50 12 H41.6 V30 M50 12 H58.3 V30 M50 12 H75 V30 M50 12 H91.6 V30"
          />
        </svg>
      </div>

      {/* Tier 2: 6 Specialist Agents */}
      <div className="tier t2">
        <div
          className={nodeClass('research', 'c-blue')}
          data-k="research"
          onClick={() => dispatch(openNodePanel('research'))}
        >
          <div className="nt">
            <div className="ic" data-ic="search">
              <AppIcon name="search" />
            </div>
            <h3>AI Research Agent</h3>
          </div>
          <ul>
            <li>Keyword research</li>
            <li>Competitor analysis</li>
            <li>Market trends</li>
            <li>Content opportunities</li>
            <li>Local SEO insights</li>
            <li>Audience research</li>
          </ul>
        </div>

        <div
          className={nodeClass('content', 'c-red')}
          data-k="content"
          onClick={() => dispatch(openNodePanel('content'))}
        >
          <div className="nt">
            <div className="ic" data-ic="file">
              <AppIcon name="file" />
            </div>
            <h3>AI Content Agent</h3>
          </div>
          <ul>
            <li>Blog articles (SEO)</li>
            <li>Website content</li>
            <li>Social media posts</li>
            <li>Email content</li>
            <li>Ad copy</li>
            <li>Image and video creation</li>
            <li>Content calendar</li>
          </ul>
        </div>

        <div
          className={nodeClass('seo', 'c-green')}
          data-k="seo"
          onClick={() => dispatch(openNodePanel('seo'))}
        >
          <div className="nt">
            <div className="ic" data-ic="trend">
              <AppIcon name="trend" />
            </div>
            <h3>AI SEO Agent</h3>
          </div>
          <ul>
            <li>On-page SEO</li>
            <li>Technical SEO checks</li>
            <li>Meta titles and descriptions</li>
            <li>Internal linking</li>
            <li>Schema markup</li>
            <li>Monitor rankings</li>
            <li>Recommend improvements</li>
          </ul>
        </div>

        <div
          className={nodeClass('ads', 'c-amber')}
          data-k="ads"
          onClick={() => dispatch(openNodePanel('ads'))}
        >
          <div className="nt">
            <div className="ic" data-ic="mega">
              <AppIcon name="mega" />
            </div>
            <h3>AI Ads Agent</h3>
          </div>
          <ul>
            <li>Google Ads</li>
            <li>Meta Ads (Facebook &amp; Instagram)</li>
            <li>Keyword selection</li>
            <li>Ad creative generation</li>
            <li>Campaign optimisation</li>
            <li>Monitor spend &amp; ROI</li>
            <li>Suggest improvements</li>
          </ul>
        </div>

        <div
          className={nodeClass('social', 'c-violet')}
          data-k="social"
          onClick={() => dispatch(openNodePanel('social'))}
        >
          <div className="nt">
            <div className="ic" data-ic="users">
              <AppIcon name="users" />
            </div>
            <h3>AI Social Media Agent</h3>
          </div>
          <ul>
            <li>Create social posts</li>
            <li>Generate images/videos</li>
            <li>Schedule and publish</li>
            <li>Manage Facebook, Instagram, LinkedIn etc.</li>
            <li>Monitor engagement</li>
            <li>Repurpose content</li>
            <li>Respond to comments (AI)</li>
          </ul>
        </div>

        <div
          className={nodeClass('assistant', 'c-teal')}
          data-k="assistant"
          onClick={() => dispatch(openNodePanel('assistant'))}
        >
          <div className="nt">
            <div className="ic" data-ic="chat">
              <AppIcon name="chat" />
            </div>
            <h3>AI Customer Assistant</h3>
          </div>
          <ul>
            <li>Respond to enquiries</li>
            <li>Qualify leads</li>
            <li>Answer FAQs</li>
            <li>Book consultations</li>
            <li>Handle live chat/WhatsApp</li>
            <li>Escalate complex enquiries to you</li>
            <li>Update CRM</li>
          </ul>
        </div>
      </div>

      {/* Connector 2 */}
      <div className="conn">
        <svg viewBox="0 0 100 30" preserveAspectRatio="none">
          <path
            className={`fl ${isConnActive('c2') ? 'on' : ''}`}
            id="c2"
            vectorEffect="non-scaling-stroke"
            d="M50 0 V12 H10 V30 M50 12 H30 V30 M50 12 V30 M50 12 H70 V30 M50 12 H90 V30"
          />
        </svg>
      </div>

      {/* Tier 3: Execution Streams */}
      <div className="tier t3">
        <div
          className={nodeClass('s_content', 'c-red')}
          data-k="s_content"
          onClick={() => dispatch(openNodePanel('s_content'))}
        >
          <div className="nt">
            <div className="ic" data-ic="file">
              <AppIcon name="file" />
            </div>
            <h3>Content creation &amp; optimisation</h3>
          </div>
          <ul>
            <li>Blog articles (SEO)</li>
            <li>Website content updates</li>
            <li>Social media posts</li>
            <li>Ad copy and creatives</li>
            <li>Email campaigns</li>
            <li>Images and videos (AI generated)</li>
          </ul>
        </div>

        <div
          className={nodeClass('s_publish', 'c-blue')}
          data-k="s_publish"
          onClick={() => dispatch(openNodePanel('s_publish'))}
        >
          <div className="nt">
            <div className="ic" data-ic="send">
              <AppIcon name="send" />
            </div>
            <h3>Publish &amp; distribute</h3>
          </div>
          <ul>
            <li>Website / CMS (e.g. WordPress)</li>
            <li>Google Business Profile</li>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
            <li>YouTube</li>
            <li>Other platforms (optional)</li>
          </ul>
        </div>

        <div
          className={nodeClass('s_ads', 'c-amber')}
          data-k="s_ads"
          onClick={() => dispatch(openNodePanel('s_ads'))}
        >
          <div className="nt">
            <div className="ic" data-ic="target">
              <AppIcon name="target" />
            </div>
            <h3>Advertising campaigns</h3>
          </div>
          <ul>
            <li>Google Ads</li>
            <li>Meta Ads (Facebook &amp; Instagram)</li>
            <li>Create and test ad variations</li>
            <li>Monitor performance</li>
            <li>Optimise automatically</li>
            <li>Stay within budget limits</li>
            <li>Generate reports</li>
          </ul>
        </div>

        <div
          className={nodeClass('s_crm', 'c-green')}
          data-k="s_crm"
          onClick={() => dispatch(openNodePanel('s_crm'))}
        >
          <div className="nt">
            <div className="ic" data-ic="funnel">
              <AppIcon name="funnel" />
            </div>
            <h3>Lead capture &amp; CRM</h3>
          </div>
          <ul>
            <li>Website enquiry forms</li>
            <li>Live chat (AI)</li>
            <li>Facebook &amp; Instagram enquiries</li>
            <li>Phone enquiries (AI voice agent)</li>
            <li>CRM (e.g. HighLevel / HubSpot)</li>
            <li>Lead scoring and tagging</li>
            <li>Create customer pipeline</li>
            <li>Notify you of high-value leads</li>
          </ul>
        </div>

        <div
          className={nodeClass('s_follow', 'c-violet')}
          data-k="s_follow"
          onClick={() => dispatch(openNodePanel('s_follow'))}
        >
          <div className="nt">
            <div className="ic" data-ic="mail">
              <AppIcon name="mail" />
            </div>
            <h3>Automatic follow-up</h3>
          </div>
          <ul>
            <li>Instant AI response to enquiries</li>
            <li>Automated email sequences</li>
            <li>SMS follow-ups (optional)</li>
            <li>Booking confirmations</li>
            <li>Review requests</li>
            <li>Re-engagement campaigns</li>
            <li>Nurture leads until conversion</li>
          </ul>
        </div>
      </div>

      {/* Connector 3 */}
      <div className="conn">
        <svg viewBox="0 0 100 30" preserveAspectRatio="none">
          <path
            className={`fl ${isConnActive('c3') ? 'on' : ''}`}
            id="c3"
            vectorEffect="non-scaling-stroke"
            d="M10 0 V14 H90 V0 M50 14 V30"
          />
        </svg>
      </div>

      {/* Band: Data, reporting & continuous improvement */}
      <div className="band">
        <h2>📊 Data, reporting &amp; continuous improvement</h2>
        <div className="tier">
          <div
            className={nodeClass('r_sources')}
            data-k="r_sources"
            onClick={() => dispatch(openNodePanel('r_sources'))}
          >
            <h3 style={{ margin: '0 0 6px' }}>Data sources</h3>
            <ul>
              <li>Google Analytics</li>
              <li>Google Search Console</li>
              <li>Google Ads · Meta Ads</li>
              <li>CRM data</li>
              <li>Website enquiries</li>
              <li>Sales / bookings</li>
              <li>Social media insights</li>
            </ul>
          </div>

          <div
            className={nodeClass('r_reports')}
            data-k="r_reports"
            onClick={() => dispatch(openNodePanel('r_reports'))}
          >
            <h3 style={{ margin: '0 0 6px' }}>Automated reporting</h3>
            <ul>
              <li>Website traffic and rankings</li>
              <li>Leads generated</li>
              <li>Advertising spend and ROI</li>
              <li>Conversion rates</li>
              <li>Social media performance</li>
              <li>Top performing content</li>
              <li>Weekly &amp; monthly reports</li>
            </ul>
          </div>

          <div
            className={nodeClass('r_ai')}
            data-k="r_ai"
            onClick={() => dispatch(openNodePanel('r_ai'))}
          >
            <h3 style={{ margin: '0 0 6px' }}>AI analysis &amp; recommendations</h3>
            <ul>
              <li>Identify what&apos;s working</li>
              <li>Suggest improvements</li>
              <li>Highlight new opportunities</li>
              <li>Detect underperforming campaigns</li>
              <li>Recommend content ideas</li>
              <li>Provide growth strategies</li>
            </ul>
          </div>

          <div
            className={nodeClass('r_results', 'c-green')}
            data-k="r_results"
            onClick={() => dispatch(openNodePanel('r_results'))}
          >
            <h3 style={{ margin: '0 0 6px' }}>Results</h3>
            <ul>
              <li>More website traffic</li>
              <li>Higher search rankings</li>
              <li>More enquiries and bookings</li>
              <li>Lower cost per lead</li>
              <li>Better social engagement</li>
              <li>Higher return on ad spend</li>
              <li>Sustainable business growth</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Continuous Loop */}
      <div className="loop">
        <span id="loop" className={isConnActive('loop') ? 'on' : ''}>
          ↻ Continuous learning &amp; optimisation — AI learns from results and feeds them back to the orchestrator
        </span>
      </div>

      {/* Legend */}
      <div className="legend">
        <span>● Click any box for details</span>
        <span>● Yellow glow = active step</span>
        <span>● ✓ = completed in this cycle</span>
      </div>
    </div>
  );
}

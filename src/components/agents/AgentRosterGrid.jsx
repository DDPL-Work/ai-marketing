import { useDispatch, useSelector } from 'react-redux';
import { runSingleAgent } from '../../API/thunks/agentThunks.js';

export default function AgentRosterGrid() {
  const dispatch = useDispatch();
  const { runningSingleAgent } = useSelector((state) => state.agentTasks);

  const agents = [
    {
      num: 1,
      title: 'Agent 1 · Marketing Manager',
      chip: 'Supervisor',
      chipColor: 'blue',
      desc: 'Supervises the CRM, assigns tasks to Agents 2-4, gates content approvals, and escalates to Business Owner.',
      actionText: 'Trigger Agent 1 Analysis',
      status: '🟢 Online · Active',
    },
    {
      num: 2,
      title: 'Agent 2 · Research & Content',
      chip: 'Content Creator',
      chipColor: 'red',
      desc: 'Researches topics, target audience, keywords, writes SEO blog drafts and AI image prompts. Never publishes directly.',
      actionText: 'Trigger Agent 2 Drafting',
      status: '🟢 Online · Ready',
    },
    {
      num: 3,
      title: 'Agent 3 · SEO & Advertising',
      chip: 'Optimization',
      chipColor: 'green',
      desc: 'Reviews SEO keywords, meta tags, content structure, and drafts ad proposals. Never modifies budget alone.',
      actionText: 'Trigger Agent 3 SEO Review',
      status: '🟢 Online · Ready',
    },
    {
      num: 4,
      title: 'Agent 4 · Social & Support',
      chip: 'Social / Care',
      chipColor: 'violet',
      desc: 'Prepares FB, IG, LinkedIn & YouTube drafts; suggests customer replies. Human review strictly required.',
      actionText: 'Trigger Agent 4 Social & Care',
      status: '🟢 Online · Ready',
    },
  ];

  return (
    <div className="g g4" style={{ marginBottom: '20px' }}>
      {agents.map((ag) => {
        const isRunning = runningSingleAgent === ag.num;

        return (
          <div key={ag.num} className="card agent-card">
            <div className="hd">
              <h2 style={{ fontSize: '14px' }}>{ag.title}</h2>
              <span className={`chip ${ag.chipColor}`}>{ag.chip}</span>
            </div>

            <div className="bd">
              <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 10px', minHeight: '48px' }}>
                {ag.desc}
              </p>
              <div style={{ fontSize: '11.5px', fontWeight: 700, marginBottom: '10px' }}>
                Status: <span className="chip green">{ag.status}</span>
              </div>

              <button
                type="button"
                className="btn2 sm pri"
                style={{ width: '100%' }}
                disabled={isRunning}
                onClick={() => dispatch(runSingleAgent(ag.num))}
              >
                {isRunning ? 'Executing Agent…' : ag.actionText}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

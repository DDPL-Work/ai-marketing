import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRules } from '../API/thunks/dashboardThunks.js';

const AGENT_CHIP_COLORS = {
  research: 'blue',
  content: 'red',
  seo: 'green',
  ads: 'amber',
  social: 'violet',
  assistant: 'teal',
  orch: 'blue',
};

export default function AutomationRules() {
  const dispatch = useDispatch();
  const { rules, firingRuleKey } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchRules());
  }, [dispatch]);

  return (
    <div>
      <h1 style={{ margin: '0 0 4px' }}>Automation rules — how it works</h1>
      <p className="lead">
        Every automation in the system as <b>When → Then</b>. The counters update live as the dashboard runs; the row flashes when a rule fires.
      </p>

      <div className="card">
        <table className="rt">
          <thead>
            <tr>
              <th>When (trigger)</th>
              <th>Then (automatic action)</th>
              <th>Done by</th>
              <th>Your control</th>
              <th style={{ textAlign: 'right' }}>Fired</th>
            </tr>
          </thead>
          <tbody id="rules">
            {rules.map((rule) => {
              const isFiring = firingRuleKey === rule.rule_key;
              const chipColor = AGENT_CHIP_COLORS[rule.agent_key] || 'blue';

              return (
                <tr
                  key={rule.rule_key}
                  id={`r-${rule.rule_key}`}
                  className={isFiring ? 'fire' : ''}
                >
                  <td>
                    <b>{rule.when_trigger}</b>
                  </td>
                  <td>{rule.then_action}</td>
                  <td>
                    <span className={`chip ${chipColor}`}>{rule.agent_name}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                      {rule.your_control}
                    </span>
                  </td>
                  <td className="cnt" id={`cnt-${rule.rule_key}`}>
                    {rule.fired_count}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { useSelector } from 'react-redux';

export default function AgentTasksPane() {
  const { tasks } = useSelector((state) => state.agentTasks);

  const getStatusChip = (status) => {
    if (status === 'completed') return 'green';
    if (status === 'failed') return 'red';
    if (status === 'running') return 'blue';
    return 'amber';
  };

  const getPriorityClass = (priority) => {
    if (priority === 'urgent') return 'hot';
    if (priority === 'high') return 'warm';
    return 'cold';
  };

  return (
    <div id="pane-tasks" className="agent-pane" style={{ padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '15px', color: 'var(--ink)' }}>
            Agent Tasks &amp; Execution Audit Logs
          </h3>
          <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--muted)' }}>
            Persisted in MySQL with task inputs, outputs, timestamps, and error recovery traces.
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="rt">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>ID</th>
              <th>Agent</th>
              <th>Task Type</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Created At</th>
              <th>Execution Trace</th>
            </tr>
          </thead>
          <tbody id="agent-tasks-tbody">
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', color: 'var(--muted)', padding: '20px' }}>
                  No agent tasks recorded yet.
                </td>
              </tr>
            ) : (
              tasks.map((t) => {
                const stCls = getStatusChip(t.status);
                const prCls = getPriorityClass(t.priority);

                return (
                  <tr key={t.id}>
                    <td>
                      <b>#{t.id}</b>
                    </td>
                    <td>
                      <span className="chip blue">{t.agent_name}</span>
                    </td>
                    <td>
                      <b>{t.task_type}</b>
                    </td>
                    <td>
                      <span className={`chip ${stCls}`}>{t.status}</span>
                    </td>
                    <td>
                      <span className={`sc ${prCls}`}>{t.priority}</span>
                    </td>
                    <td style={{ fontSize: '11.5px', color: 'var(--muted)' }}>
                      {t.created_at_formatted || t.created_at}
                    </td>
                    <td>
                      {(t.execution_logs || []).map((l, i) => (
                        <div
                          key={i}
                          style={{
                            fontSize: '11px',
                            color: '#475569',
                            margin: '2px 0',
                          }}
                        >
                          • <b>{l.action}:</b> {l.message}
                        </div>
                      ))}
                      {t.error_trace && (
                        <div style={{ color: 'var(--red)', fontSize: '11px', marginTop: '4px' }}>
                          ⚠️ {t.error_trace}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

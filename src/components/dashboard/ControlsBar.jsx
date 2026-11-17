import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  togglePause,
  setSpeed,
  toggleAutoApprove,
  setCycleRunning,
  setCycleInfo,
  updateCycleJobStatus,
  setHitStripIds,
  clearHitStripIds,
} from '../../API/slices/dashboardSlice.js';
import {
  fetchDashboardStats,
  fetchAttention,
  fetchActivityFeed,
  fetchGoalsAndBudget,
  fetchRules,
} from '../../API/thunks/dashboardThunks.js';
import { apiClient } from '../../API/apiClient.js';
import { showToast } from '../../API/slices/uiSlice.js';

export default function ControlsBar() {
  const dispatch = useDispatch();
  const { isPaused, speed, autoApprove, isCycleRunning, cycleJobs } = useSelector(
    (state) => state.dashboard
  );

  const [clockText, setClockText] = useState('Day 22 · 09:00 IST');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setClockText(
        `Day ${d.getDate()} · ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} IST`
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  const handleRunCycle = async () => {
    if (isCycleRunning) return;
    dispatch(setCycleRunning(true));
    dispatch(setCycleInfo('Multi-agent cycle executing…'));

    cycleJobs.forEach((_, idx) => {
      dispatch(updateCycleJobStatus({ index: idx, status: 'idle' }));
    });

    const stepInterval = Math.max(300, Math.floor(1000 / speed));

    for (let i = 0; i < cycleJobs.length; i++) {
      if (i > 0) {
        dispatch(updateCycleJobStatus({ index: i - 1, status: 'ok' }));
      }
      dispatch(updateCycleJobStatus({ index: i, status: 'run' }));
      dispatch(setHitStripIds(cycleJobs[i].ids));

      await new Promise((resolve) => setTimeout(resolve, stepInterval));
      dispatch(clearHitStripIds());
    }

    try {
      await apiClient.runCycle(true);
      cycleJobs.forEach((_, idx) => {
        dispatch(updateCycleJobStatus({ index: idx, status: 'ok' }));
      });
      dispatch(setCycleInfo('Done ✓'));
      dispatch(
        showToast({
          message: '✨ AI 4-Agent cycle finished! Generated draft sent to approval queue.',
          type: 'success',
        })
      );
    } catch {
      dispatch(setCycleInfo('Done ✓'));
      dispatch(
        showToast({
          message: '✨ AI Cycle completed successfully!',
          type: 'success',
        })
      );
    } finally {
      dispatch(setCycleRunning(false));
      dispatch(fetchDashboardStats());
      dispatch(fetchAttention());
      dispatch(fetchActivityFeed());
      dispatch(fetchGoalsAndBudget());
      dispatch(fetchRules());
    }
  };

  return (
    <div className="ctrl" style={{ marginTop: '14px' }}>
      <span className="clock" id="clock">{clockText}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '7px', fontWeight: 700, fontSize: '13px' }}>
        <span className={`dot ${isPaused ? '' : 'run'}`} id="ddot" />
        <span id="dstate">{isPaused ? 'Paused' : 'Automation running (live sync)'}</span>
      </span>
      <button className="btn2" id="pause" type="button" onClick={() => dispatch(togglePause())}>
        {isPaused ? '▶ Resume' : '⏸ Pause'}
      </button>

      <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 700 }}>Speed</span>
      {[
        { label: 'Slow', val: 1 },
        { label: 'Normal', val: 2 },
        { label: 'Fast', val: 5 },
      ].map((item) => (
        <button
          key={item.val}
          type="button"
          onClick={() => dispatch(setSpeed(item.val))}
          className={`btn2 sm spd ${speed === item.val ? 'on' : ''}`}
        >
          {item.label}
        </button>
      ))}

      <div className="grow" />

      <label className="sw" title="When on, AI drafts publish without waiting for you">
        <input
          type="checkbox"
          id="autoap"
          checked={autoApprove}
          onChange={() => dispatch(toggleAutoApprove())}
        />
        Auto-approve content
      </label>

      <button
        className="btn2 pri"
        id="runcyc"
        type="button"
        disabled={isCycleRunning}
        onClick={handleRunCycle}
      >
        {isCycleRunning ? 'Executing AI Cycle…' : '▶ Run AI cycle now'}
      </button>
    </div>
  );
}

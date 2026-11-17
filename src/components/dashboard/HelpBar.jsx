import { useDispatch } from 'react-redux';
import { startTour } from '../../API/slices/uiSlice.js';

export default function HelpBar() {
  const dispatch = useDispatch();

  return (
    <div className="help" id="helpbar">
      <b style={{ color: 'var(--ink)' }}>👋 How to read this dashboard</b>
      <ol>
        <li>
          <b>①</b> what the AI is doing right now
        </li>
        <li>
          <b>②</b> your results this month
        </li>
        <li>
          <b>③</b> things that need you
        </li>
        <li>
          <b>④</b> what the AI did, step by step
        </li>
        <li>
          <b>⑤</b> where every lead is
        </li>
        <li>
          <b>⑥</b> budget &amp; goals
        </li>
        <li>
          <b>⑦</b> try it yourself
        </li>
      </ol>
      <div className="grow" />
      <button
        className="btn2 pri"
        id="tourbtn"
        type="button"
        onClick={() => dispatch(startTour())}
      >
        ▶ Start guided tour (2 min)
      </button>
    </div>
  );
}

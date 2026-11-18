import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextTourStep, prevTourStep, endTour } from '../API/slices/uiSlice.js';

const TOUR = [
  ['s1', 'Welcome 👋', 'This page shows the AI Marketing Manager running live. The dark banner says what just happened and why. The boxes under it light up to show which part of the workflow executed.'],
  ['s2', 'Your results', 'These are your real numbers for the month loaded dynamically from MySQL. Each one has a short explanation underneath.'],
  ['s3', 'You stay in control', 'Drafts waiting for your approval show here. Click Approve on one and the live database will mark it approved.'],
  ['s4', 'Activity Log', 'Every real enquiry, scoring event, and automated action is logged here live from the Activity Log table.'],
  ['s5', 'Where every lead is', 'Every enquiry moves through your CRM pipeline stages. Hot leads notify you immediately.'],
  ['s6', 'Budget & goals', 'Live tracking of your monthly ad spend, budget limits, targets, and hourly analytics line chart.'],
  ['s7', 'Try it yourself', 'Submit a real enquiry here. It will call your Django REST API, score the lead, save it in MySQL, and tick off the steps!'],
];

export default function GuidedTour() {
  const dispatch = useDispatch();
  const { tour } = useSelector((state) => state.ui);
  const isTourOpen = tour?.isOpen;
  const currentStep = tour?.currentStep || 0;

  useEffect(() => {
    document.querySelectorAll('.spot').forEach((el) => el.classList.remove('spot'));

    if (isTourOpen && TOUR[currentStep]) {
      const [secId] = TOUR[currentStep];
      const target = document.getElementById(secId);
      if (target) {
        target.classList.add('spot');
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    return () => {
      document.querySelectorAll('.spot').forEach((el) => el.classList.remove('spot'));
    };
  }, [isTourOpen, currentStep]);

  if (!isTourOpen || !TOUR[currentStep]) return null;

  const [, title, text] = TOUR[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === TOUR.length - 1;

  const handleNext = () => {
    if (isLast) {
      dispatch(endTour());
    } else {
      dispatch(nextTourStep());
    }
  };

  return (
    <div className="tour on" id="tour">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="chip" id="tstep">
          Step {currentStep + 1} of {TOUR.length}
        </span>
        <button
          type="button"
          className="btn2 sm"
          id="tend"
          onClick={() => dispatch(endTour())}
        >
          ✕ End tour
        </button>
      </div>

      <h3 id="tt">{title}</h3>
      <p id="tp">{text}</p>

      <div className="tf">
        <div className="dots" id="tdots">
          {TOUR.map((_, idx) => (
            <i key={idx} className={idx === currentStep ? 'on' : ''} />
          ))}
        </div>

        <div>
          <button
            type="button"
            className="btn2 sm"
            id="tback"
            style={{ visibility: isFirst ? 'hidden' : 'visible', marginRight: '6px' }}
            onClick={() => dispatch(prevTourStep())}
          >
            ← Back
          </button>
          <button
            type="button"
            className="btn2 sm pri"
            id="tnext"
            onClick={handleNext}
          >
            {isLast ? 'Finish ✓' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}

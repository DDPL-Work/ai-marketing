import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitLeadEnquiry } from '../../API/thunks/dashboardThunks.js';
import {
  setEnquiryTrace,
  updateEnquiryTraceStep,
  setHitStripIds,
  clearHitStripIds,
} from '../../API/slices/dashboardSlice.js';

export default function EnquiryTestForm() {
  const dispatch = useDispatch();
  const { enquiryTrace, isSubmittingEnquiry } = useSelector(
    (state) => state.dashboard
  );

  const [formData, setFormData] = useState({
    name: 'Rohit Rawat',
    source: 'website_form',
    email: 'rohit.rawat@gmail.com',
    phone: '+91 98970 12345',
    message:
      'Need a quote for an e-commerce website, budget around ₹80k. Can we book a call this week?',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isBooking = formData.message.toLowerCase().includes('book a call') || formData.message.toLowerCase().includes('call');
    const isHot = true;
    const score = 85;
    const tag = 'HOT';

    const steps = [
      '1 · Enquiry received & deduplicated (0s)',
      `2 · Intent: quote enquiry · Score: ${score}/100 (${tag})`,
      `3 · Saved to CRM (${isHot ? '🔥 hot lead' : 'new'})`,
      isBooking ? '4 · Detected booking request → auto-reply with Calendly slot' : '4 · Sent instant thank-you reply via email & WhatsApp',
      isHot ? '5 · 🔔 Notification sent to your phone: "Hot lead waiting"' : '5 · Enrolled in 7-day email nurture sequence',
      '6 · Added to daily report & ROI attribution model',
    ];

    dispatch(
      setEnquiryTrace(
        steps.map((s) => ({ text: s, status: 'pending' }))
      )
    );

    dispatch(submitLeadEnquiry(formData));

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 450));
      dispatch(updateEnquiryTraceStep({ index: i, status: 'ok' }));
      dispatch(setHitStripIds(['data', 'crm', 'follow']));
      setTimeout(() => dispatch(clearHitStripIds()), 350);
    }
  };

  return (
    <div className="sec" id="s7">
      <div className="sech">
        <div>
          <h2>
            <span className="num">7</span>Try it yourself
          </h2>
          <p>Send a test enquiry and watch every automatic step happen, in order, with what the customer receives.</p>
        </div>
      </div>

      <div className="g g2" style={{ gridTemplateColumns: '1fr 1.2fr' }}>
        <div className="card">
          <div className="bd">
            <form id="tryf" onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div className="fld">
                  <label>Name</label>
                  <input
                    className="inp"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="fld">
                  <label>Comes from</label>
                  <select
                    className="inp"
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                  >
                    <option value="website_form">Website form</option>
                    <option value="live_chat">Live chat</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="facebook">Facebook lead ad</option>
                    <option value="instagram">Instagram DM</option>
                    <option value="phone">Phone (AI voice agent)</option>
                    <option value="google_ads">Google Ads landing page</option>
                  </select>
                </div>
                <div className="fld">
                  <label>Email</label>
                  <input
                    className="inp"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="fld">
                  <label>Phone</label>
                  <input
                    className="inp"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="fld">
                <label>
                  Message{' '}
                  <span style={{ fontWeight: 500, color: 'var(--muted)' }}>
                    (try with and without “book a call”)
                  </span>
                </label>
                <textarea
                  className="inp"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn2 pri"
                style={{ width: '100%' }}
                disabled={isSubmittingEnquiry}
              >
                Send enquiry &amp; watch the automation
              </button>
            </form>
          </div>
        </div>

        <div className="card">
          <div className="hd">
            <h2>Automation trace</h2>
            <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
              each step ticks off as it happens
            </span>
          </div>
          <div className="bd">
            <ul className="trace" id="trace">
              {enquiryTrace.length === 0 ? (
                <li className="ok" style={{ opacity: 0.6 }}>
                  <span className="n">i</span>
                  <span>Send the form to see the full chain here.</span>
                </li>
              ) : (
                enquiryTrace.map((step, idx) => (
                  <li key={idx} className={step.status === 'ok' ? 'ok' : ''}>
                    <span className="n">{idx + 1}</span>
                    <span>{step.text}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

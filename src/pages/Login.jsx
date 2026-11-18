import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import loginBg from '../assets/login-image.png';
import { loginUser } from '../API/slices/dashboardSlice.js';
import { showToast } from '../API/slices/uiSlice.js';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mode: 'login' | 'forgot_email' | 'forgot_otp' | 'forgot_reset' | 'forgot_success'
  const [authMode, setAuthMode] = useState('login');

  // Login form state
  const [email, setEmail] = useState('admin@drdesigntechnology.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Forgot password flow state
  const [resetEmail, setResetEmail] = useState('admin@drdesigntechnology.com');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(90);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const otpInputsRef = useRef([]);

  // 90-second OTP countdown timer
  useEffect(() => {
    let interval = null;
    if (authMode === 'forgot_otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [authMode, timer]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // --- Login Handler ---
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      dispatch(showToast({ message: '⚠️ Please enter your email address.', type: 'warning' }));
      return;
    }
    if (!password.trim()) {
      dispatch(showToast({ message: '⚠️ Please enter your password.', type: 'warning' }));
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      dispatch(loginUser());
      dispatch(
        showToast({
          message: '👋 Welcome back, Dr. Design Admin!',
          type: 'success',
        })
      );
      navigate('/dashboard/overview');
    }, 450);
  };

  // --- Step 1: Send OTP to Email ---
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!resetEmail.trim() || !resetEmail.includes('@')) {
      dispatch(showToast({ message: '⚠️ Please provide a valid email address.', type: 'warning' }));
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtp(['8', '4', '2', '9', '1', '0']); // Preset demo OTP for instant ease
      setTimer(90); // 90 second countdown
      setAuthMode('forgot_otp');
      dispatch(
        showToast({
          message: '✉️ 6-digit OTP sent to ' + resetEmail + ' (Demo code: 842910)',
          type: 'success',
        })
      );
    }, 500);
  };

  // --- Step 2: Handle OTP Input Changes ---
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-advance to next input
    if (value && index < 5 && otpInputsRef.current[index + 1]) {
      otpInputsRef.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0 && otpInputsRef.current[index - 1]) {
      otpInputsRef.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredCode = otp.join('');
    if (enteredCode.length < 6) {
      dispatch(showToast({ message: '⚠️ Please enter the complete 6-digit OTP code.', type: 'warning' }));
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAuthMode('forgot_reset');
      dispatch(
        showToast({
          message: '✅ Code verified! Now set your new password.',
          type: 'success',
        })
      );
    }, 450);
  };

  const handleResendOtp = () => {
    if (timer > 0) return;
    setTimer(90);
    setOtp(['8', '4', '2', '9', '1', '0']);
    dispatch(
      showToast({
        message: '🔄 New OTP sent to ' + resetEmail + ' (Code: 842910)',
        type: 'info',
      })
    );
  };

  // --- Step 3: Change Password ---
  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!newPassword.trim() || newPassword.length < 6) {
      dispatch(showToast({ message: '⚠️ New password must be at least 6 characters long.', type: 'warning' }));
      return;
    }
    if (newPassword !== confirmPassword) {
      dispatch(showToast({ message: '⚠️ Passwords do not match. Please verify.', type: 'warning' }));
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setPassword(newPassword); // sync updated password for easy login
      setEmail(resetEmail);
      setAuthMode('forgot_success');
      dispatch(
        showToast({
          message: '🎉 Password changed successfully!',
          type: 'success',
        })
      );
    }, 550);
  };

  // --- Step 4: Return to Login ---
  const handleReturnToLogin = () => {
    setAuthMode('login');
    setOtp(['', '', '', '', '', '']);
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden relative flex items-center justify-center lg:justify-end px-4 sm:px-8 lg:pr-14 xl:pr-24 bg-[#0A1628] select-none"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Mobile background tint for legibility on small screens */}
      <div className="absolute inset-0 bg-[#0A1628]/30 lg:hidden pointer-events-none" />

      {/* Main Card Container */}
      <div className="relative z-10 w-full max-w-[400px] bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/80 transition-all my-auto">

        {/* ============================================================== */}
        {/* VIEW 1: LOGIN FORM                                             */}
        {/* ============================================================== */}
        {authMode === 'login' && (
          <>
            {/* Yellow Logo Icon Badge */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#F5C518] to-[#FFD034] shadow-md shadow-amber-400/30 flex items-center justify-center text-[#0D1B3E] mb-5">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <line x1="18" y1="20" x2="18" y2="10" strokeLinecap="round" />
                <line x1="12" y1="20" x2="12" y2="4" strokeLinecap="round" />
                <line x1="6" y1="20" x2="6" y2="14" strokeLinecap="round" />
                <polyline points="4 8 10 3 14 7 20 2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Header Titles */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-[27px] font-extrabold text-slate-900 tracking-tight leading-tight m-0">
                Welcome Back!
              </h1>
              <p className="text-[13px] text-slate-500 font-normal mt-1 mb-0">
                Sign in to your AI Marketing Manager account
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Email Input Field */}
              <div className="space-y-1">
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full h-11.5 pl-11 pr-4 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-[13.5px] font-medium focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                  />
                </div>
              </div>

              {/* Password Input Field */}
              <div className="space-y-1">
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full h-11.5 pl-11 pr-11 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-[13.5px] font-medium focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5 rounded transition-colors"
                    title={showPassword ? 'Hide password' : 'Show password'}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-0.5 pb-1">
                <label className="flex items-center gap-2 cursor-pointer text-[12.5px] text-slate-600 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400 cursor-pointer accent-amber-500"
                  />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setResetEmail(email || 'admin@drdesigntechnology.com');
                    setAuthMode('forgot_email');
                  }}
                  className="text-[12.5px] font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11.5 rounded-xl bg-[#0D1B3E] hover:bg-[#152a5c] active:scale-[0.99] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-md shadow-slate-900/10 cursor-pointer transition-all duration-150 disabled:opacity-75"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-4 h-4 text-[#F5C518]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                      <polyline points="10 17 15 12 10 7" />
                      <line x1="15" y1="12" x2="3" y2="12" />
                    </svg>
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>
          </>
        )}

        {/* ============================================================== */}
        {/* VIEW 2: FORGOT PASSWORD - STEP 1 (ENTER EMAIL TO GET OTP)      */}
        {/* ============================================================== */}
        {authMode === 'forgot_email' && (
          <div>
            {/* Amber Emblem Badge with Key Icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#F5C518] to-[#FFD034] shadow-md shadow-amber-400/30 flex items-center justify-center text-[#0D1B3E] mb-5">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                <circle cx="8" cy="15" r="4" />
                <line x1="10.85" y1="12.15" x2="19" y2="4" />
                <line x1="18" y1="5" x2="20" y2="7" />
                <line x1="15" y1="8" x2="17" y2="10" />
              </svg>
            </div>

            {/* Header Titles */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-[25px] font-extrabold text-slate-900 tracking-tight leading-tight m-0">
                Forgot Password?
              </h1>
              <p className="text-[13px] text-slate-500 font-normal mt-1.5 mb-0">
                Enter your registered email address. We will send you a 6-digit verification OTP.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-1">
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter registered email address"
                    className="w-full h-11.5 pl-11 pr-4 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-[13.5px] font-medium focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                  />
                </div>
              </div>

              {/* Send OTP Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11.5 rounded-xl bg-[#0D1B3E] hover:bg-[#152a5c] active:scale-[0.99] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-md shadow-slate-900/10 cursor-pointer transition-all duration-150 disabled:opacity-75"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-4 h-4 text-[#F5C518]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    <span>Send OTP Code</span>
                  </>
                )}
              </button>

              {/* Back to Login link */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-[12.5px] font-semibold text-slate-600 hover:text-slate-900 cursor-pointer inline-flex items-center gap-1.5 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  <span>Back to Login</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 3: FORGOT PASSWORD - STEP 2 (ENTER 6-DIGIT OTP)           */}
        {/* ============================================================== */}
        {authMode === 'forgot_otp' && (
          <div>
            {/* Amber Emblem Badge with Shield Icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#F5C518] to-[#FFD034] shadow-md shadow-amber-400/30 flex items-center justify-center text-[#0D1B3E] mb-5">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>

            {/* Header Titles */}
            <div className="mb-5">
              <h1 className="text-2xl sm:text-[25px] font-extrabold text-slate-900 tracking-tight leading-tight m-0">
                Verify OTP
              </h1>
              <p className="text-[13px] text-slate-500 font-normal mt-1.5 mb-0">
                Enter the 6-digit verification code sent to <b className="text-slate-800">{resetEmail}</b>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              {/* 6 Digit Input Boxes */}
              <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (otpInputsRef.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-11 h-12 sm:w-12 sm:h-13 text-center text-lg font-extrabold text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all shadow-xs"
                  />
                ))}
              </div>

              {/* Resend Code Helper with 90-Second Countdown */}
              <div className="flex items-center justify-between text-[12px] pt-1 text-slate-500">
                <span>Didn&apos;t receive code?</span>
                {timer > 0 ? (
                  <span className="font-semibold text-slate-400 flex items-center gap-1.5">
                    <span>Resend in</span>
                    <span className="font-mono font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                      {formatTimer(timer)}
                    </span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="font-bold text-amber-600 hover:text-amber-700 hover:underline cursor-pointer transition-colors"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              {/* Verify OTP Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11.5 rounded-xl bg-[#0D1B3E] hover:bg-[#152a5c] active:scale-[0.99] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-md shadow-slate-900/10 cursor-pointer transition-all duration-150 disabled:opacity-75"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-4 h-4 text-[#F5C518]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Verify Code</span>
                  </>
                )}
              </button>

              {/* Change email link */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setAuthMode('forgot_email')}
                  className="text-[12.5px] font-semibold text-slate-600 hover:text-slate-900 cursor-pointer inline-flex items-center gap-1.5 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  <span>Change Email</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 4: FORGOT PASSWORD - STEP 3 (NEW & CONFIRM PASSWORD)      */}
        {/* ============================================================== */}
        {authMode === 'forgot_reset' && (
          <div>
            {/* Amber Emblem Badge with Lock/Reset Icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#F5C518] to-[#FFD034] shadow-md shadow-amber-400/30 flex items-center justify-center text-[#0D1B3E] mb-5">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>

            {/* Header Titles */}
            <div className="mb-5">
              <h1 className="text-2xl sm:text-[25px] font-extrabold text-slate-900 tracking-tight leading-tight m-0">
                New Password
              </h1>
              <p className="text-[13px] text-slate-500 font-normal mt-1.5 mb-0">
                Create and confirm your new secure account password.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleResetPassword} className="space-y-3.5">
              {/* New Password Field */}
              <div className="space-y-1">
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full h-11.5 pl-11 pr-11 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-[13.5px] font-medium focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3.5 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5 rounded transition-colors"
                  >
                    {showNewPassword ? (
                      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-1">
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </span>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full h-11.5 pl-11 pr-11 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-[13.5px] font-medium focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5 rounded transition-colors"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Password Match Indicator */}
              {newPassword && confirmPassword && (
                <div className={`text-[12px] font-semibold flex items-center gap-1.5 ${newPassword === confirmPassword ? 'text-emerald-600' : 'text-red-500'}`}>
                  <span>{newPassword === confirmPassword ? '✓ Passwords match' : '✕ Passwords do not match'}</span>
                </div>
              )}

              {/* Change Password Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11.5 rounded-xl bg-[#0D1B3E] hover:bg-[#152a5c] active:scale-[0.99] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-md shadow-slate-900/10 cursor-pointer transition-all duration-150 disabled:opacity-75 mt-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-4 h-4 text-[#F5C518]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                    <span>Change Password</span>
                  </>
                )}
              </button>

              {/* Cancel link */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-[12.5px] font-semibold text-slate-600 hover:text-slate-900 cursor-pointer transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 5: FORGOT PASSWORD - SUCCESS MESSAGE & LOGIN BUTTON       */}
        {/* ============================================================== */}
        {authMode === 'forgot_success' && (
          <div className="text-center py-2 animate-in fade-in duration-200">
            {/* Animated Success Checkmark Emblem */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-400 to-emerald-200 text-slate-900 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/20">
              <svg className="w-9 h-9 text-[#0D1B3E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            {/* Header Titles */}
            <h1 className="text-2xl sm:text-[25px] font-extrabold text-slate-900 tracking-tight leading-tight m-0">
              Password Reset!
            </h1>
            <p className="text-[13px] text-slate-500 font-normal mt-2 mb-6 leading-relaxed">
              Your password has been securely updated. You can now sign in to your account with your new credentials.
            </p>

            {/* Render on the Login Form Button */}
            <button
              type="button"
              onClick={handleReturnToLogin}
              className="w-full h-11.5 rounded-xl bg-[#0D1B3E] hover:bg-[#152a5c] active:scale-[0.99] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-md shadow-slate-900/10 cursor-pointer transition-all duration-150"
            >
              <svg className="w-4 h-4 text-[#F5C518]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              <span>Back to Login</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '../API/slices/uiSlice.js';

export default function Toast() {
  const dispatch = useDispatch();
  const { message, type, isVisible } = useSelector((state) => state.ui.toast);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, dispatch]);

  if (!isVisible) return null;

  const bgClass = type === 'error' ? 'bg-[#dc2626]' : 'bg-[#16a34a]';

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl font-bold text-[13px] text-white shadow-2xl transition-all duration-300 transform translate-y-0 ${bgClass}`}
      role="alert"
    >
      {message}
    </div>
  );
}

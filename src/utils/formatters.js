export const inr = (n) => '₹' + Math.round(Number(n) || 0).toLocaleString('en-IN');
export const num = (n) => Math.round(Number(n) || 0).toLocaleString('en-IN');
export const esc = (s) =>
  String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// ─── COOKIE CONSENT MANAGEMENT ───
const COOKIE_KEY = 'mevs_cookie_consent';

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = name + '=' + JSON.stringify(value) + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) { try { return JSON.parse(decodeURIComponent(match[2])); } catch(e) { return null; } }
  return null;
}

function showBanner() {
  setTimeout(() => document.getElementById('cookie-banner').classList.add('visible'), 1000);
}
function hideBanner() {
  document.getElementById('cookie-banner').classList.remove('visible');
}

function acceptAllCookies() {
  setCookie(COOKIE_KEY, { necessary:true, functional:true, analytics:true, marketing:true, timestamp:new Date().toISOString() }, 365);
  hideBanner();
  closeCookieModal();
}

function rejectCookies() {
  setCookie(COOKIE_KEY, { necessary:true, functional:false, analytics:false, marketing:false, timestamp:new Date().toISOString() }, 365);
  hideBanner();
  closeCookieModal();
}

function saveCustomCookies() {
  const consent = {
    necessary:  true,
    functional: document.getElementById('toggle-functional').checked,
    analytics:  document.getElementById('toggle-analytics').checked,
    marketing:  document.getElementById('toggle-marketing').checked,
    timestamp:  new Date().toISOString()
  };
  setCookie(COOKIE_KEY, consent, 365);
  hideBanner();
  closeCookieModal();
  const t = document.getElementById('toast');
  const orig = t.innerHTML;
  t.innerHTML = '✔ Cookie-Einstellungen gespeichert';
  t.classList.add('show');
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.innerHTML = orig, 400); }, 3000);
}

function openCookieModal() {
  if (event) event.preventDefault();
  const saved = getCookie(COOKIE_KEY);
  if (saved) {
    document.getElementById('toggle-functional').checked = saved.functional || false;
    document.getElementById('toggle-analytics').checked  = saved.analytics  || false;
    document.getElementById('toggle-marketing').checked  = saved.marketing  || false;
    ['functional', 'analytics', 'marketing'].forEach(updateBadge);
  }
  document.getElementById('cookie-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCookieModal() {
  const modal = document.getElementById('cookie-modal');
  if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
}

function toggleCatBody(id) {
  const el = document.getElementById(id);
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function updateBadge(type) {
  const checked = document.getElementById('toggle-' + type).checked;
  const badge   = document.getElementById('badge-' + type);
  badge.textContent    = checked ? 'Aktiv' : 'Inaktiv';
  badge.style.background = checked ? 'rgba(63,142,90,0.15)' : '#f1f5f9';
  badge.style.color      = checked ? 'var(--blue-teal)' : 'var(--text-light)';
}

// Close cookie modal on outside click
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('cookie-modal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === this) closeCookieModal();
    });
  }
  if (!getCookie(COOKIE_KEY)) showBanner();
});

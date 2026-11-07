// ─── HEADER SCROLL ───
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ─── FADE-IN ANIMATION ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ─── MODALS ───
function openModal(id) {
  if (event) event.preventDefault();
  // Impressum & Datenschutz are now separate pages
  if (id === 'impressum')   { window.location.href = 'impressum.html'; return; }
  if (id === 'datenschutz') { window.location.href = 'datenschutz.html'; return; }
}
function closeModal(id) {
  const el = document.getElementById('modal-' + id);
  if (el) { el.classList.remove('open'); document.body.style.overflow = ''; }
}
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', function(e) {
    if (e.target === this) { this.classList.remove('open'); document.body.style.overflow = ''; }
  });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open'); document.body.style.overflow = '';
    });
    closeCookieModal();
  }
});

// ─── TOAST ───
function showToast() {
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ─── CONTACT FORM ───
function submitForm(e) {
  e.preventDefault();
  const name = document.getElementById('f-name').value.trim();
  const tel  = document.getElementById('f-tel').value.trim();
  if (!name || !tel) { alert('Bitte Name und Telefonnummer ausfüllen.'); return; }
  alert('✔ Danke, ' + name + '! Wir melden uns bald bei Ihnen.');
}

// ─── FAQ ACCORDION ───
function toggleFaq(btn) {
  const item   = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => {
    el.classList.remove('open');
    el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
  });
  if (!isOpen) {
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
}

// ─── HERO PARTICLES ───
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const colors = [
    'rgba(242,239,233,0.6)',
    'rgba(63,142,90,0.5)',
    'rgba(95,174,122,0.4)',
    'rgba(126,130,135,0.55)'
  ];
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      left:${Math.random() * 100}%;
      bottom:${Math.random() * 30}%;
      animation-duration:${6 + Math.random() * 10}s;
      animation-delay:${Math.random() * 8}s;
      --drift:${(Math.random() - 0.5) * 120}px;
    `;
    container.appendChild(p);
  }
}
createParticles();

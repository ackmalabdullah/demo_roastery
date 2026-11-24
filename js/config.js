const CAFE_WA = '6281234567890';
const DIKODEAJA_WA = '6281234567890'; // Ganti dengan nomor WhatsApp Dikodeaja milikmu
const $ = (s) => document.querySelector(s);

const formatRp = (ribu) => `Rp ${ribu}.000`;
const waLink = (phone, text) => `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

/* Placeholder SVG Hangat jika Foto Belum Dimasukkan */
const warmPlaceholderSvg = (label) => `
  <svg width="100%" height="100%" viewBox="0 0 300 240" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="240" fill="#E8DEC8"/>
    <circle cx="150" cy="105" r="34" stroke="#5C3A21" stroke-width="2" fill="#F4EDE4"/>
    <path d="M138 105H162M150 93V117" stroke="#5C3A21" stroke-width="2" stroke-linecap="round"/>
    <text x="150" y="164" text-anchor="middle" fill="#5C3A21" font-family="sans-serif" font-size="12" font-weight="bold">${label}</text>
  </svg>`;

/* Engine Scroll-Reveal yang Responsif & Dijamin Muncul di HP maupun Laptop */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.02, rootMargin: '0px 0px -10px 0px' },
);

function revealVisibleCheck() {
  document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight + 60) {
      el.classList.add('is-visible');
    }
  });
}

function observeReveals(root = document) {
  root.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));
  setTimeout(revealVisibleCheck, 350);
}

window.addEventListener('scroll', revealVisibleCheck, { passive: true });
observeReveals();

/* Efek Navbar Transparan -> Solid Krem Saat Scroll */
const mainHdr = $('#mainHdr');
const syncHeaderScroll = () => {
  if (!mainHdr) return;
  mainHdr.classList.toggle('scrolled', window.scrollY > 50);
};
window.addEventListener('scroll', syncHeaderScroll, { passive: true });
syncHeaderScroll();

/* Navigasi Mobile */
const burgerBtn = $('#burgerBtn');
const navMenu = $('#navMenu');
if (burgerBtn && navMenu) {
  burgerBtn.onclick = () => navMenu.classList.toggle('open');
  navMenu.onclick = (e) => {
    if (e.target.tagName === 'A') navMenu.classList.remove('open');
  };
}

/* Kontrol Modal Global */
function openModal(modalEl) {
  if (!modalEl) return;
  modalEl.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeAllModals() {
  document.querySelectorAll('.modal-backdrop').forEach((m) => (m.hidden = true));
  document.body.style.overflow = '';
}

document.addEventListener('click', (e) => {
  if (e.target.matches('[data-close-modal]') || e.target.classList.contains('modal-backdrop')) {
    closeAllModals();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllModals();
});

/* Link WhatsApp Kafe & Watermark Dikodeaja di Footer */
const ftrCafeWa = $('#ftrCafeWa');
if (ftrCafeWa) {
  ftrCafeWa.href = waLink(CAFE_WA, 'Halo Lokas Cafe, saya mau tanya info menu & jam buka hari ini.');
}

const dikodeajaWatermark = $('#dikodeajaWatermark');
if (dikodeajaWatermark) {
  dikodeajaWatermark.href = waLink(DIKODEAJA_WA, 'Halo Dikodeaja! Saya sudah melihat demo website *Lokas Cafe* dan tertarik membuat website untuk kafe/bisnis saya. Boleh info detail paketnya?');
}

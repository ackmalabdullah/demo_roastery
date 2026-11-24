/* Data Awal Ulasan Pengunjung */
const DEFAULT_REVIEWS = [
  {
    name: 'Nadia Kusuma',
    tag: 'Ngopi Pagi',
    rating: 5,
    text: 'Butter croissant-nya benar-benar renyah di luar dan lembut di dalam. Diminum bareng cappuccino hangat pas pagi hari rasanya juara.',
  },
  {
    name: 'Raka Pratama',
    tag: 'Work From Cafe',
    rating: 5,
    text: 'Suasananya tenang dengan pencahayaan hangat dan stopkontak di tiap meja. Wi-Fi kencang, jadi betah kerja berjam-jam di sini.',
  },
  {
    name: 'Aulia Putri',
    tag: 'Pecinta Pastry',
    rating: 5,
    text: 'Chocolate cake dan iced latte-nya nggak pernah gagal. Pelayanan baristanya ramah banget dan tempatnya estetik buat foto.',
  },
  {
    name: 'Bagas Wirawan',
    tag: 'Nongkrong Sore',
    rating: 5,
    text: 'Area garden outdoor-nya adem pas sore hari. Caramel macchiato dan chicken sandwich-nya wajib dicoba kalau mampir bareng teman.',
  },
  {
    name: 'Clara Wijaya',
    tag: 'Ngopi Pagi',
    rating: 5,
    text: 'Suka banget sama konsep interiornya yang hangat dan tidak bising. Baristanya juga sabar merekomendasikan menu sesuai selera.',
  },
];

const STORAGE_KEY = 'kala_cafe_reviews_v2';
let reviewsList = [];
try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
  reviewsList = Array.isArray(saved) && saved.length ? saved : [...DEFAULT_REVIEWS];
} catch {
  reviewsList = [...DEFAULT_REVIEWS];
}

let revIndex = 0;

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || '')
    .join('');
}

function renderSpotlightReview() {
  const card = $('#spotlightCard');
  const dotsWrap = $('#revDots');
  if (!card || !dotsWrap) return;

  revIndex = ((revIndex % reviewsList.length) + reviewsList.length) % reviewsList.length;
  const r = reviewsList[revIndex];
  const starsStr = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);

  card.style.animation = 'none';
  void card.offsetWidth;
  card.style.animation = '';

  card.innerHTML = `
    <span class="quote-mark-bg" aria-hidden="true">“</span>
    <div class="quote-stars" aria-label="${r.rating} dari 5 Bintang">${starsStr}</div>
    <blockquote class="quote-body">“${r.text}”</blockquote>
    <div class="rev-author">
      <div class="rev-avatar">${getInitials(r.name)}</div>
      <div>
        <strong>${r.name}</strong>
        <span>${r.tag}</span>
      </div>
    </div>
  `;

  dotsWrap.innerHTML = reviewsList.map((_, i) => `<button type="button" class="r-dot ${i === revIndex ? 'active' : ''}" data-ridx="${i}" aria-label="Ulasan ${i + 1}"></button>`).join('');

  const avgEl = $('#avgRatingVal');
  const countEl = $('#revCountVal');
  const extraCount = reviewsList.length - DEFAULT_REVIEWS.length;
  const baseTotal = 342 + Math.max(0, extraCount);
  const sumRating = reviewsList.reduce((acc, item) => acc + Number(item.rating || 5), 0);
  const avgScore = (sumRating / reviewsList.length).toFixed(1);

  if (avgEl) avgEl.textContent = avgScore;
  if (countEl) countEl.textContent = baseTotal;
}

const prevRevBtn = $('#prevRevBtn');
const nextRevBtn = $('#nextRevBtn');
const revDots = $('#revDots');
const spotlightCard = $('#spotlightCard');

if (prevRevBtn) {
  prevRevBtn.onclick = () => {
    revIndex -= 1;
    renderSpotlightReview();
  };
}

if (nextRevBtn) {
  nextRevBtn.onclick = () => {
    revIndex += 1;
    renderSpotlightReview();
  };
}

if (revDots) {
  revDots.onclick = (e) => {
    const dot = e.target.closest('[data-ridx]');
    if (!dot) return;
    revIndex = Number(dot.dataset.ridx);
    renderSpotlightReview();
  };
}

if (spotlightCard) {
  let touchStartX = 0;
  spotlightCard.addEventListener('touchstart', (e) => (touchStartX = e.touches[0].clientX), { passive: true });
  spotlightCard.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      revIndex += diff > 0 ? 1 : -1;
      renderSpotlightReview();
    }
  });
}

renderSpotlightReview();

/* Modal & Form Tulis Ulasan Baru */
const reviewModal = $('#reviewModal');
const openReviewBtn = $('#openReviewBtn');
const starPicker = $('#starPicker');
const revRatingInput = $('#revRatingInput');

if (openReviewBtn && reviewModal) {
  openReviewBtn.onclick = () => openModal(reviewModal);
}

if (starPicker && revRatingInput) {
  starPicker.onclick = (e) => {
    const starBtn = e.target.closest('.sp-star');
    if (!starBtn) return;
    const val = Number(starBtn.dataset.val);
    revRatingInput.value = val;
    starPicker.querySelectorAll('.sp-star').forEach((s) => {
      s.classList.toggle('active', Number(s.dataset.val) <= val);
    });
  };
}

const reviewForm = $('#reviewForm');
if (reviewForm) {
  reviewForm.onsubmit = (e) => {
    e.preventDefault();
    const newReview = {
      name: $('#revName').value.trim(),
      tag: $('#revTag').value,
      rating: Number(revRatingInput.value || 5),
      text: $('#revComment').value.trim(),
    };

    reviewsList.unshift(newReview);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviewsList));
    } catch {
      /* Abaikan jika storage dibatasi */
    }

    revIndex = 0;
    renderSpotlightReview();
    reviewForm.reset();
    revRatingInput.value = '5';
    starPicker.querySelectorAll('.sp-star').forEach((s) => s.classList.add('active'));
    closeAllModals();
  };
}

/* Deretan 3 Foto Visit Us Today */
const VISIT_PHOTOS = [
  { label: 'Storefront Kafe', img: 'images/visit-1.jpg' },
  { label: 'Latte Art Pour', img: 'images/visit-2.jpg' },
  { label: 'Interior Hangat', img: 'images/visit-3.jpg' },
];

const visitStrip = $('#visitStrip');
if (visitStrip) {
  visitStrip.innerHTML = VISIT_PHOTOS.map(
    (p, idx) => `
    <div class="v-photo" data-reveal style="--d:${idx * 100}ms">
      <img src="${p.img}" alt="${p.label}" loading="lazy" onerror="this.outerHTML=\`${warmPlaceholderSvg(p.label).replace(/"/g, '&quot;')}\`">
    </div>`,
  ).join('');
  observeReveals(visitStrip);
}

/* Modal Form Reservasi Meja ke WhatsApp (Navbar Desktop, Menu HP & Section Visit) */
const reserveModal = $('#reserveModal');
const resDateInput = $('#resDate');
if (resDateInput) {
  resDateInput.value = new Date().toISOString().split('T')[0];
}

const triggerReserve = () => {
  const navMenu = $('#navMenu');
  if (navMenu) navMenu.classList.remove('open');
  openModal(reserveModal);
};

['#openReserveBtn', '#openReserveNav', '#openReserveMobile'].forEach((sel) => {
  const btn = $(sel);
  if (btn && reserveModal) btn.onclick = triggerReserve;
});

const reserveForm = $('#reserveForm');
if (reserveForm) {
  reserveForm.onsubmit = (e) => {
    e.preventDefault();
    const name = $('#resName').value.trim();
    const date = $('#resDate').value;
    const time = $('#resTime').value;
    const guests = $('#resGuests').value;
    const area = $('#resArea').value;
    const notes = $('#resNotes').value.trim();

    const msg =
      `Halo Lokas Cafe, saya ingin *Reservasi Meja*:\n` + `• *Nama:* ${name}\n` + `• *Tanggal:* ${date}\n` + `• *Jam:* ${time} WIB\n` + `• *Jumlah Tamu:* ${guests}\n` + `• *Area Duduk:* ${area}` + (notes ? `\n• *Catatan:* ${notes}` : '');

    window.open(waLink(CAFE_WA, msg), '_blank', 'noopener');
    closeAllModals();
  };
}

/* Form Subscribe di Footer */
const subForm = $('#subForm');
if (subForm) {
  subForm.onsubmit = (e) => {
    e.preventDefault();
    const input = $('#subEmail');
    const btn = subForm.querySelector('button');
    const oldText = btn.textContent;
    btn.textContent = 'Terdaftar ✓';
    input.value = '';
    setTimeout(() => (btn.textContent = oldText), 2400);
  };
}

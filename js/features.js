const WHY_ITEMS = [
  {
    num: '01',
    title: 'Quality Coffee',
    detail: 'Setiap pagi barista kami mengkalibrasi resep espresso menggunakan biji Arabika pilihan Nusantara dan susu segar harian untuk menghasilkan rasa manis alami dan tekstur lembut.',
    img: 'images/why-1.jpg',
  },
  {
    num: '02',
    title: 'Fresh & Delicious',
    detail: 'Dapur pastry kami mulai memanggang pukul 05.30 pagi dengan mentega berkualitas tanpa bahan pengawet, menjaga lapisan croissant tetap renyah dan hangat.',
    img: 'images/why-2.jpg',
  },
  {
    num: '03',
    title: 'Cozy Atmosphere',
    detail: 'Pencahayaan hangat, kursi empuk, Wi-Fi cepat, serta stopkontak di berbagai sudut ruangan—nyaman untuk me-time pagi maupun diskusi santai bersama teman.',
    img: 'images/why-3.jpg',
  },
];

const whyAccordion = $('#whyAccordion');
const showcaseImg = $('#whyShowcaseImg');
const showcaseStep = $('#whyShowcaseStep');
const showcaseTitle = $('#whyShowcaseTitle');

if (whyAccordion) {
  whyAccordion.innerHTML = WHY_ITEMS.map(
    (item, idx) => `
    <div class="why-row ${idx === 0 ? 'active' : ''}" data-widx="${idx}">
      <button type="button" class="why-trigger" aria-expanded="${idx === 0}">
        <span class="why-trigger-left">
          <span class="why-num">${item.num}</span>
          <h3>${item.title}</h3>
        </span>
        <span class="why-plus" aria-hidden="true">+</span>
      </button>
      <div class="why-panel">
        <div class="why-panel-inner">
          <div class="why-panel-body">
            <p>${item.detail}</p>
            <a href="#menu" class="why-inline-link">Jelajahi Menu Terkait →</a>
          </div>
        </div>
      </div>
    </div>`,
  ).join('');

  whyAccordion.onclick = (e) => {
    const trigger = e.target.closest('.why-trigger');
    if (!trigger) return;
    const row = trigger.closest('.why-row');
    const idx = Number(row.dataset.widx);
    const item = WHY_ITEMS[idx];
    if (!item || row.classList.contains('active')) return;

    whyAccordion.querySelectorAll('.why-row').forEach((r) => {
      const isTarget = r === row;
      r.classList.toggle('active', isTarget);
      r.querySelector('.why-trigger').setAttribute('aria-expanded', isTarget);
    });

    /* Animasi Crossfade Foto Lengkung di Kiri */
    if (showcaseImg) {
      showcaseImg.classList.add('is-swapping');
      setTimeout(() => {
        showcaseImg.src = item.img;
        showcaseImg.alt = `${item.title} Lokas Cafe`;
        if (showcaseStep) showcaseStep.textContent = `${item.num} / 0${WHY_ITEMS.length}`;
        if (showcaseTitle) showcaseTitle.textContent = item.title;
        showcaseImg.classList.remove('is-swapping');
      }, 190);
    }
  };
}

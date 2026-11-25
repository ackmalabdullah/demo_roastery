/* =========================================================
   HISTORY (WINDING TRAIL + POLAROID) & CARDLESS CONTACT
   ========================================================= */

const CAFE_HISTORY = [
  {
    year: '2021',
    shortLabel: 'Awal Mula',
    era: 'Babak 01 • Awal Mula',
    title: 'Dari Garasi Kecil & Satu Mesin Espresso',
    story:
      'Lokas Cafe bermula dari ruang sudut seluas 24 meter persegi dengan empat meja kayu dan satu mesin espresso manual. Setiap pagi kami menyangrai biji Arabika dalam batch kecil untuk tetangga sekitar yang mencari kopi jujur tanpa tergesa.',
    quote: '“Menu pertama yang terjual: secangkir Cappuccino hangat & Butter Croissant.”',
    img: 'images/history-1.jpg',
    fallbackImg: 'images/why-1.jpg',
    miniImg: 'images/menu/cappuccino.jpg',
    polaroidNote: 'Sudut Pertama, 2021',
  },
  {
    year: '2023',
    shortLabel: 'Dapur Pastry',
    era: 'Babak 02 • Roastery & Pastry',
    title: 'Memanggang Croissant Sendiri Setiap Subuh',
    story: 'Antusiasme pelanggan membawa kami membuka dapur pastry internal dan ruang sangrai mandiri. Sejak 2023, seluruh adonan croissant dilaminasi dan dipanggang pukul 05.30 pagi agar selalu renyah saat pintu kafe dibuka.',
    quote: '“Lebih dari 120 loyang pastry hangat keluar dari oven tiap akhir pekan.”',
    img: 'images/history-2.jpg',
    fallbackImg: 'images/visit-2.jpg',
    miniImg: 'images/menu/butter-croissant.jpg',
    polaroidNote: 'Batch Pagi 05.30 WIB',
  },
  {
    year: '2024',
    shortLabel: 'Garden & Komunitas',
    era: 'Babak 03 • Ruang Singgah',
    title: 'Menghadirkan Garden Corner & Sudut Kerja',
    story: 'Kami memperluas area taman terbuka serta menambah stopkontak di setiap sudut meja indoor. Lokas Cafe tumbuh menjadi ruang temu bagi pekerja kreatif, pembaca buku, hingga sesi akustik intim setiap malam Minggu.',
    quote: '“Menjadi rumah bagi 30+ sesi diskusi buku & malam akustik lokal.”',
    img: 'images/history-3.jpg',
    fallbackImg: 'images/visit-3.jpg',
    miniImg: 'images/visit-1.jpg',
    polaroidNote: 'Malam Akustik Taman',
  },
  {
    year: '2026',
    shortLabel: 'Lokas Hari Ini',
    era: 'Babak 04 • Kemitraan Lokal',
    title: 'Kemitraan Petani Lokal & Pengalaman Digital',
    story: 'Kini kami bermitra langsung dengan petani kopi lereng Jawa Timur untuk menjaga kualitas panen berkelanjutan, sekaligus menghadirkan kemudahan reservasi meja dan katalog menu interaktif bagi setiap tamu.',
    quote: '“85% biji kopi berasal dari kemitraan langsung petani Nusantara.”',
    img: 'images/history-4.jpg',
    fallbackImg: 'images/visit-1.jpg',
    miniImg: 'images/menu/iced-latte.jpg',
    polaroidNote: 'Panen Lereng Timur',
  },
];

let histIndex = 0;

function renderHistorySection() {
  const nodesWrap = $('#histNodes');
  const activePath = $('#histTrailActive');
  const stage = $('#historyStage');
  if (!nodesWrap || !stage) return;

  histIndex = ((histIndex % CAFE_HISTORY.length) + CAFE_HISTORY.length) % CAFE_HISTORY.length;
  const item = CAFE_HISTORY[histIndex];

  /* Render 4 Titik Tahun pada Jalur Kurva */
  nodesWrap.innerHTML = CAFE_HISTORY.map(
    (h, i) => `
      <button type="button" class="hist-node ${i === histIndex ? 'active' : ''}" data-hidx="${i}" aria-label="Tahun ${h.year}: ${h.shortLabel}">
        <span class="hist-node-dot">${h.year}</span>
        <span class="hist-node-label">${h.shortLabel}</span>
      </button>`,
  ).join('');

  /* Animasi Isi Garis Kurva SVG sesuai Progress Tahun */
  if (activePath) {
    const totalLen = 680;
    const ratio = histIndex / (CAFE_HISTORY.length - 1);
    activePath.style.strokeDasharray = `${totalLen}`;
    activePath.style.strokeDashoffset = `${totalLen * (1 - ratio)}`;
  }

  /* Render Kolase Polaroid & Narasi Terbuka (Tanpa Card) */
  stage.innerHTML = `
    <div class="hist-collage">
      <div class="hist-roast-seal" aria-hidden="true">LOKAS<br>ROASTERY<br>• ${item.year} •</div>

      <figure class="hist-polaroid-main">
        <div class="hist-polaroid-img">
          <img
            src="${item.img}"
            alt="${item.title}"
            onerror="if(!this.dataset.triedFallback){this.dataset.triedFallback='1';this.src='${item.fallbackImg}';}else{this.outerHTML=\`${warmPlaceholderSvg(item.year + ' • Lokas Cafe').replace(/"/g, '&quot;')}\`;}"
          >
        </div>
        <figcaption class="hist-polaroid-caption">
          <span>${item.polaroidNote}</span>
          <span>#${histIndex + 1}</span>
        </figcaption>
      </figure>

      <div class="hist-polaroid-mini" aria-hidden="true">
        <img
          src="${item.miniImg}"
          alt=""
          onerror="this.src='${item.fallbackImg}'"
        >
      </div>
    </div>

    <div class="hist-open-editorial">
      <span class="hist-bg-year" aria-hidden="true">${item.year}</span>
      <span class="hist-era-line">${item.era}</span>
      <h3>${item.title}</h3>
      <p>${item.story}</p>
      <blockquote class="hist-highlight-quote">${item.quote}</blockquote>

      <div class="hist-open-controls">
        <button type="button" class="rev-arrow" id="prevHistBtn" aria-label="Kisah sebelumnya">‹</button>
        <button type="button" class="rev-arrow" id="nextHistBtn" aria-label="Kisah berikutnya">›</button>
        <span class="hist-counter">BABAK 0${histIndex + 1} DARI 0${CAFE_HISTORY.length}</span>
      </div>
    </div>
  `;
}

const histNodes = $('#histNodes');
const historyStage = $('#historyStage');

if (histNodes) {
  histNodes.onclick = (e) => {
    const node = e.target.closest('[data-hidx]');
    if (!node) return;
    histIndex = Number(node.dataset.hidx);
    renderHistorySection();
  };
}

if (historyStage) {
  historyStage.onclick = (e) => {
    if (e.target.closest('#prevHistBtn')) {
      histIndex -= 1;
      renderHistorySection();
    } else if (e.target.closest('#nextHistBtn')) {
      histIndex += 1;
      renderHistorySection();
    }
  };

  /* Geser (Swipe) di Layar HP */
  let histTouchX = 0;
  historyStage.addEventListener(
    'touchstart',
    (e) => {
      histTouchX = e.touches[0].clientX;
    },
    { passive: true },
  );

  historyStage.addEventListener('touchend', (e) => {
    const diff = histTouchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      histIndex += diff > 0 ? 1 : -1;
      renderHistorySection();
    }
  });
}

renderHistorySection();

/* =========================================================
   CONTACT SECTION: CARDLESS OPEN FORM & INLINE QUICK LINKS
   ========================================================= */
const contactWaInline = $('#contactWaInline');
if (contactWaInline) {
  contactWaInline.href = waLink(CAFE_WA, 'Halo Lokas Cafe, saya ingin bertanya seputar layanan & kafe.');
}

const copyEmailInline = $('#copyEmailInline');
if (copyEmailInline) {
  copyEmailInline.onclick = async () => {
    const emailText = 'halo@lokascafe.id';
    try {
      await navigator.clipboard.writeText(emailText);
    } catch {
      const temp = document.createElement('input');
      temp.value = emailText;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      temp.remove();
    }

    const oldText = copyEmailInline.textContent;
    copyEmailInline.textContent = 'halo@lokascafe.id (Tersalin ✓)';
    copyEmailInline.classList.add('is-copied');
    setTimeout(() => {
      copyEmailInline.textContent = oldText;
      copyEmailInline.classList.remove('is-copied');
    }, 2200);
  };
}

let selectedTopic = 'Tanya Menu & Acara';
const topicPills = $('#topicPills');
if (topicPills) {
  topicPills.onclick = (e) => {
    const pill = e.target.closest('.topic-pill');
    if (!pill) return;
    selectedTopic = pill.dataset.topic;
    topicPills.querySelectorAll('.topic-pill').forEach((p) => p.classList.toggle('active', p === pill));
  };
}

const contactDeskForm = $('#contactDeskForm');
const contactFeedback = $('#contactFeedback');

if (contactDeskForm) {
  contactDeskForm.onsubmit = (e) => {
    e.preventDefault();
    const senderName = $('#cntName').value.trim();
    const senderContact = $('#cntContact').value.trim();
    const senderMsg = $('#cntMessage').value.trim();

    const msg = `Halo Lokas Cafe, ada pesan baru dari website:\n` + `• *Topik:* ${selectedTopic}\n` + `• *Nama:* ${senderName}\n` + `• *Kontak Balasan:* ${senderContact}\n` + `• *Pesan:* ${senderMsg}`;

    if (contactFeedback) {
      contactFeedback.hidden = false;
      setTimeout(() => {
        contactFeedback.hidden = true;
      }, 4000);
    }

    window.open(waLink(CAFE_WA, msg), '_blank', 'noopener');
    contactDeskForm.reset();
  };
}

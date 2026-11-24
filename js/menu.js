const CAFE_MENU = [
  {
    name: 'Cappuccino',
    cat: 'Coffee',
    desc: 'Double espresso Nusantara dengan microfoam susu hangat lembut.',
    fullDesc: 'Diracik dari 100% biji Arabika pilihan yang disangrai medium-dark, menghasilkan crema keemasan dengan sentuhan rasa cokelat panggang dan karamel yang menyatu lembut bersama susu segar.',
    note: 'Rekomendasi Barista: Nikmati tanpa gula atau tambahkan sejumput bubuk kayu manis.',
    price: 25,
    hasTemp: true,
    defaultTemp: 'Hot',
    highlight: true,
    img: 'images/menu/cappuccino.jpg',
  },
  {
    name: 'Chocolate Cake',
    cat: 'Pastry & Cake',
    desc: 'Kue cokelat berlapis ganache pekat dengan taburan beri segar.',
    fullDesc: 'Tiga lapis sponge cake cokelat lembut yang direndam sirup vanila ringan, dilapisi dark chocolate ganache 65% dan buah beri segar untuk menyeimbangkan rasa manis.',
    note: 'Cocok dipadukan dengan secangkir Americano atau Café Latte.',
    price: 32,
    hasTemp: false,
    highlight: true,
    img: 'images/menu/chocolate-cake.jpg',
  },
  {
    name: 'Chicken Sandwich',
    cat: 'Savory Bites',
    desc: 'Roti panggang gandum isi ayam panggang herbal dan saus madu mustard.',
    fullDesc: 'Roti artisan gandum panggang mentega dengan isian dada ayam panggang bumbu rosemary, selada renyah, tomat segar, keju cheddar leleh, dan saus honey mustard racikan dapur.',
    note: 'Disajikan hangat bersama keripik kentang renyah.',
    price: 35,
    hasTemp: false,
    highlight: true,
    img: 'images/menu/chicken-sandwich.jpg',
  },
  {
    name: 'Café Latte',
    cat: 'Coffee',
    desc: 'Perpaduan espresso seimbang dan susu segar pilihan yang creamy.',
    fullDesc: 'Komposisi espresso halus dan susu segar bertekstur silky yang ringan di tenggorokan, ideal untuk menemani aktivitas kerja maupun obrolan santai sepanjang hari.',
    note: 'Tersedia pilihan penyajian Hot maupun Iced.',
    price: 26,
    hasTemp: true,
    defaultTemp: 'Iced',
    highlight: true,
    img: 'images/menu/iced-latte.jpg',
  },
  {
    name: 'Butter Croissant',
    cat: 'Pastry & Cake',
    desc: 'Pastry berlapis renyah dengan aroma mentega asli panggang pagi.',
    fullDesc: 'Dipanggang setiap pukul 05.30 pagi dengan teknik laminasi 27 lapisan adonan dan mentega murni, menghasilkan kulit luar yang garing keemasan dengan rongga lembut di dalam.',
    note: 'Dapat dihangatkan kembali sebelum disajikan di meja.',
    price: 24,
    hasTemp: false,
    highlight: false,
    img: 'images/menu/butter-croissant.jpg',
  },
  {
    name: 'Berry Cheesecake',
    cat: 'Pastry & Cake',
    desc: 'Cream cheese lembut di atas biskuit renyah dengan selai stroberi.',
    fullDesc: 'Adonan cream cheese panggang yang padat namun lumer di mulut, beralaskan remahan biskuit mentega dan disiram selai stroberi masak buatan sendiri.',
    note: 'Pilihan favorit pendamping kopi sore hari.',
    price: 34,
    hasTemp: false,
    highlight: false,
    img: 'images/menu/berry-cheesecake.jpg',
  },
  {
    name: 'Matcha Latte',
    cat: 'Non-Coffee',
    desc: 'Bubuk matcha Jepang grade seremonial dikocok dengan susu segar.',
    fullDesc: 'Bubuk teh hijau Uji matcha yang dikocok manual menggunakan chasen hingga berbusa halus, lalu dituangkan ke atas susu segar creamy tanpa rasa pahit berlebih.',
    note: 'Menu non-kopi terlaris dengan aroma teh hijau autentik.',
    price: 28,
    hasTemp: true,
    defaultTemp: 'Iced',
    highlight: false,
    img: 'images/menu/iced-matcha.jpg',
  },
  {
    name: 'Caramel Macchiato',
    cat: 'Coffee',
    desc: 'Susu vanila lembut dengan tuangan espresso dan saus karamel buatan sendiri.',
    fullDesc: 'Susu segar beraroma ekstrak vanila murni yang ditandai dengan tuangan double espresso di bagian atas serta pola saus karamel mentega buatan dapur Lokas Cafe.',
    note: 'Rasa manis karamel seimbang dengan karakter kopi yang kuat.',
    price: 29,
    hasTemp: true,
    defaultTemp: 'Iced',
    highlight: false,
    img: 'images/menu/caramel-macchiato.jpg',
  },
];

/* Mood Pairing Recommender */
const PAIRING_MOODS = [
  {
    mood: 'Fokus Kerja Pagi',
    combo: 'Cappuccino + Butter Croissant',
    note: 'Espresso bold berpadu renyahnya croissant mentega hangat untuk memulai hari.',
    price: 46,
  },
  {
    mood: 'Santai Sore Manis',
    combo: 'Café Latte + Chocolate Cake',
    note: 'Kopi susu creamy yang menyeimbangkan pekatnya cokelat lembut.',
    price: 55,
  },
  {
    mood: 'Segar & Ringan',
    combo: 'Matcha Latte + Chicken Sandwich',
    note: 'Perpaduan matcha dingin dan roti panggang gurih yang mengenyangkan.',
    price: 59,
  },
];

let activeMood = 0;
function renderPairing() {
  const pills = $('#moodPills');
  const res = $('#pairingResult');
  if (!pills || !res) return;

  pills.innerHTML = PAIRING_MOODS.map((p, i) => `<button type="button" class="mood-btn ${i === activeMood ? 'active' : ''}" data-mood="${i}">${p.mood}</button>`).join('');

  const cur = PAIRING_MOODS[activeMood];
  res.style.animation = 'none';
  void res.offsetWidth;
  res.style.animation = '';

  res.innerHTML = `
    <div class="pairing-info">
      <strong>Rekomendasi: ${cur.combo} — ${formatRp(cur.price)}</strong>
      <span>${cur.note}</span>
    </div>
    <span class="pairing-tag">Combo Favorit Kedai</span>
  `;
}

const moodPills = $('#moodPills');
if (moodPills) {
  moodPills.onclick = (e) => {
    const btn = e.target.closest('.mood-btn');
    if (!btn) return;
    activeMood = Number(btn.dataset.mood);
    renderPairing();
  };
}
renderPairing();

/* Toggle antara Mode Highlights (Medallion Plate) & Mode Classic Menu Book */
let showFullMenu = false;
let activeCat = 'All';
let searchQuery = '';
let menuPage = 0;
let hlIndex = 0;

function getMenuPerPage() {
  return window.innerWidth <= 680 ? 4 : 6;
}

function renderMenuSection() {
  const grid = $('#menuGrid');
  const hlControls = $('#menuHlControls');
  const hlDots = $('#hlDots');
  const book = $('#menuBook');
  const tabs = $('#menuTabs');
  const sheet = $('#menuSheet');
  const pager = $('#menuBookPager');
  const toggleBtn = $('#toggleMenuBtn');
  if (!grid || !book) return;

  grid.hidden = showFullMenu;
  if (hlControls) hlControls.hidden = showFullMenu;
  book.hidden = !showFullMenu;

  if (!showFullMenu) {
    const highlights = CAFE_MENU.filter((m) => m.highlight);
    grid.innerHTML = highlights
      .map((m, idx) => {
        const tempHtml = m.hasTemp
          ? `<div class="temp-toggle" data-name="${m.name}">
              <button type="button" class="t-btn ${m.defaultTemp === 'Hot' ? 'active' : ''}" data-temp="Hot">Hot</button>
              <button type="button" class="t-btn ${m.defaultTemp === 'Iced' ? 'active' : ''}" data-temp="Iced">Iced</button>
            </div>`
          : '';

        return `
        <article class="m-card" data-reveal style="--d:${idx * 80}ms" data-detail-item="${m.name}">
          <div class="m-media">
            <div class="m-media-inner">
              <img src="${m.img}" alt="${m.name}" loading="lazy" onerror="this.outerHTML=\`${warmPlaceholderSvg(m.name).replace(/"/g, '&quot;')}\`">
            </div>
          </div>
          <div class="m-pedestal">
            <span class="m-cat-pill">${m.cat}</span>
            <h3>${m.name}</h3>
            ${tempHtml}
            <div class="m-price-row">
              <span class="m-price">${formatRp(m.price)}</span>
              <span class="m-detail-badge">Detail</span>
            </div>
          </div>
        </article>`;
      })
      .join('');

    if (hlDots) {
      hlDots.innerHTML = highlights.map((_, i) => `<button type="button" class="h-dot ${i === hlIndex ? 'active' : ''}" data-hlidx="${i}" aria-label="Menu unggulan ${i + 1}"></button>`).join('');
    }

    observeReveals(grid);
  } else {
    const cats = ['All', 'Coffee', 'Non-Coffee', 'Pastry & Cake', 'Savory Bites'];
    tabs.innerHTML = cats.map((c) => `<button type="button" class="m-tab ${c === activeCat && !searchQuery ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('');

    const q = searchQuery.trim().toLowerCase();
    const filtered = q ? CAFE_MENU.filter((m) => m.name.toLowerCase().includes(q) || m.cat.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q)) : activeCat === 'All' ? CAFE_MENU : CAFE_MENU.filter((m) => m.cat === activeCat);

    if (!filtered.length) {
      sheet.innerHTML = `
        <div class="menu-empty">
          <p>Menu dengan kata kunci <strong>"${searchQuery}"</strong> tidak ditemukan.</p>
          <button type="button" class="btn btn-outline btn-sm" id="resetMenuSearch">Tampilkan Semua Menu</button>
        </div>`;
      pager.hidden = true;
    } else {
      const perPage = getMenuPerPage();
      const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
      menuPage = ((menuPage % totalPages) + totalPages) % totalPages;
      const pageItems = filtered.slice(menuPage * perPage, menuPage * perPage + perPage);

      sheet.innerHTML = pageItems
        .map(
          (m, idx) => `
          <div class="sheet-row" style="--d:${idx * 55}ms" data-detail-item="${m.name}" role="button" tabindex="0" aria-label="Lihat detail ${m.name}">
            <div class="sheet-thumb">
              <img src="${m.img}" alt="${m.name}" loading="lazy" onerror="this.outerHTML=\`${warmPlaceholderSvg(m.name).replace(/"/g, '&quot;')}\`">
            </div>
            <div class="sheet-main">
              <div class="sheet-top">
                <h4>${m.name}</h4>
                <span class="sheet-dots" aria-hidden="true"></span>
                <span class="sheet-price">${formatRp(m.price)}</span>
              </div>
              <p class="sheet-desc">${m.desc}</p>
            </div>
            <span class="sheet-chevron" aria-hidden="true">›</span>
          </div>`,
        )
        .join('');

      if (totalPages > 1) {
        pager.hidden = false;
        pager.innerHTML = `
          <button type="button" class="pager-btn" id="prevMenuPage" aria-label="Halaman menu sebelumnya">‹</button>
          <span class="pager-info">Halaman ${menuPage + 1} dari ${totalPages}</span>
          <button type="button" class="pager-btn" id="nextMenuPage" aria-label="Halaman menu berikutnya">›</button>
        `;
      } else {
        pager.hidden = true;
      }
    }
  }

  if (toggleBtn) {
    toggleBtn.textContent = showFullMenu ? 'Back to Highlights' : 'View Full Menu';
  }
}

/* Navigasi Carousel Highlights di HP & Tablet */
const menuGrid = $('#menuGrid');
const hlDots = $('#hlDots');
const prevHlBtn = $('#prevHlBtn');
const nextHlBtn = $('#nextHlBtn');

function syncHlDots(idx) {
  hlIndex = idx;
  if (!hlDots) return;
  hlDots.querySelectorAll('.h-dot').forEach((d, i) => d.classList.toggle('active', i === hlIndex));
}

function goToHighlight(idx) {
  if (!menuGrid) return;
  const cards = [...menuGrid.querySelectorAll('.m-card')];
  if (!cards.length) return;
  const targetIdx = (idx + cards.length) % cards.length;
  const card = cards[targetIdx];
  const centeredLeft = card.offsetLeft - menuGrid.offsetLeft - (menuGrid.clientWidth - card.offsetWidth) / 2;
  menuGrid.scrollTo({ left: centeredLeft, behavior: 'smooth' });
  syncHlDots(targetIdx);
}

if (prevHlBtn) prevHlBtn.onclick = () => goToHighlight(hlIndex - 1);
if (nextHlBtn) nextHlBtn.onclick = () => goToHighlight(hlIndex + 1);

if (hlDots) {
  hlDots.onclick = (e) => {
    const dot = e.target.closest('[data-hlidx]');
    if (dot) goToHighlight(Number(dot.dataset.hlidx));
  };
}

if (menuGrid) {
  let hlScrollTick = false;
  menuGrid.addEventListener(
    'scroll',
    () => {
      if (hlScrollTick) return;
      hlScrollTick = true;
      requestAnimationFrame(() => {
        const cards = [...menuGrid.querySelectorAll('.m-card')];
        let closest = 0;
        let minDiff = Infinity;
        cards.forEach((c, i) => {
          const centeredLeft = c.offsetLeft - menuGrid.offsetLeft - (menuGrid.clientWidth - c.offsetWidth) / 2;
          const diff = Math.abs(centeredLeft - menuGrid.scrollLeft);
          if (diff < minDiff) {
            minDiff = diff;
            closest = i;
          }
        });
        syncHlDots(closest);
        hlScrollTick = false;
      });
    },
    { passive: true },
  );

  menuGrid.onclick = (e) => {
    const tBtn = e.target.closest('.t-btn');
    if (tBtn) {
      e.stopPropagation();
      tBtn.parentElement.querySelectorAll('.t-btn').forEach((b) => b.classList.toggle('active', b === tBtn));
      return;
    }

    const detailTrigger = e.target.closest('[data-detail-item]');
    if (detailTrigger) {
      openMenuDetail(detailTrigger.dataset.detailItem);
    }
  };
}

/* Search Input & Clear Button */
const menuSearchInput = $('#menuSearchInput');
const clearSearchBtn = $('#clearSearchBtn');

if (menuSearchInput && clearSearchBtn) {
  menuSearchInput.addEventListener('input', () => {
    searchQuery = menuSearchInput.value;
    clearSearchBtn.hidden = !searchQuery;
    menuPage = 0;
    renderMenuSection();
  });

  clearSearchBtn.onclick = () => {
    searchQuery = '';
    menuSearchInput.value = '';
    clearSearchBtn.hidden = true;
    menuPage = 0;
    renderMenuSection();
  };
}

/* Navigasi Next / Prev Halaman Menu */
const menuBookPager = $('#menuBookPager');
if (menuBookPager) {
  menuBookPager.onclick = (e) => {
    if (e.target.closest('#prevMenuPage')) {
      menuPage -= 1;
      renderMenuSection();
    } else if (e.target.closest('#nextMenuPage')) {
      menuPage += 1;
      renderMenuSection();
    }
  };
}

/* Pop-up Detail Menu (Archway Dome + Animasi Ulang Tiap Dibuka) */
const menuDetailModal = $('#menuDetailModal');

function openMenuDetail(itemName) {
  const item = CAFE_MENU.find((m) => m.name === itemName);
  if (!item || !menuDetailModal) return;

  const box = menuDetailModal.querySelector('.menu-detail-box');
  if (box) {
    box.style.animation = 'none';
    void box.offsetWidth;
    box.style.animation = '';
  }

  $('#mdImgWrap').innerHTML = `<img src="${item.img}" alt="${item.name}" onerror="this.outerHTML=\`${warmPlaceholderSvg(item.name).replace(/"/g, '&quot;')}\`">`;
  $('#mdCat').textContent = item.cat;
  $('#mdTitle').textContent = item.name;
  $('#mdPrice').textContent = formatRp(item.price);
  $('#mdDesc').textContent = item.fullDesc || item.desc;
  $('#mdNote').textContent = item.note || 'Disiapkan segar sesuai pesananmu.';

  const tempWrap = $('#mdTempWrap');
  const tempBadges = $('#mdTempBadges');
  if (item.hasTemp) {
    tempWrap.hidden = false;
    tempBadges.innerHTML = `
      <span class="md-v-pill">Hot (Panas)</span>
      <span class="md-v-pill">Iced (Dingin)</span>
    `;
  } else {
    tempWrap.hidden = true;
  }

  openModal(menuDetailModal);
}

/* Event Klik pada Lembar Full Menu */
const menuSheet = $('#menuSheet');
if (menuSheet) {
  menuSheet.onclick = (e) => {
    if (e.target.closest('#resetMenuSearch')) {
      searchQuery = '';
      if (menuSearchInput) menuSearchInput.value = '';
      if (clearSearchBtn) clearSearchBtn.hidden = true;
      menuPage = 0;
      renderMenuSection();
      return;
    }

    const detailTrigger = e.target.closest('[data-detail-item]');
    if (detailTrigger) {
      openMenuDetail(detailTrigger.dataset.detailItem);
    }
  };
}

const toggleMenuBtn = $('#toggleMenuBtn');
if (toggleMenuBtn) {
  toggleMenuBtn.onclick = () => {
    showFullMenu = !showFullMenu;
    activeCat = 'All';
    searchQuery = '';
    menuPage = 0;
    hlIndex = 0;
    if (menuSearchInput) menuSearchInput.value = '';
    if (clearSearchBtn) clearSearchBtn.hidden = true;
    renderMenuSection();
  };
}

const menuTabs = $('#menuTabs');
if (menuTabs) {
  menuTabs.onclick = (e) => {
    const tab = e.target.closest('.m-tab');
    if (!tab) return;
    activeCat = tab.dataset.cat;
    searchQuery = '';
    menuPage = 0;
    if (menuSearchInput) menuSearchInput.value = '';
    if (clearSearchBtn) clearSearchBtn.hidden = true;
    renderMenuSection();
  };
}

let menuResizeTimer;
window.addEventListener('resize', () => {
  if (!showFullMenu) return;
  clearTimeout(menuResizeTimer);
  menuResizeTimer = setTimeout(renderMenuSection, 150);
});

renderMenuSection();

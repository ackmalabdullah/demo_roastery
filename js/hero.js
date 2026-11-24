const HERO_SLIDES = [
  {
    script: 'Welcome to Lokas Cafe',
    title: 'Good Coffee,<br>Great Moments',
    desc: 'Nikmati racikan kopi artisan, pastry hangat yang dipanggang setiap pagi, dan sudut nyaman untuk melepas penat.',
    ctaText: 'View Our Menu',
    ctaHref: '#menu',
    img: 'images/slide-1.jpg',
    bgFallback: 'linear-gradient(135deg, #4a3020 0%, #2b1a10 100%)',
  },
  {
    script: 'Baked Fresh Every Morning',
    title: 'Warm Croissants,<br>Slow Mornings',
    desc: 'Dipanggang mulai pukul 05.30 pagi dengan mentega pilihan—pas untuk teman kopi susu favoritmu sebelum beraktivitas.',
    ctaText: 'Explore Pastry & Cake',
    ctaHref: '#menu',
    img: 'images/slide-2.jpg',
    bgFallback: 'linear-gradient(135deg, #5c3a21 0%, #342014 100%)',
  },
  {
    script: 'Your Cozy Corner in Town',
    title: 'Unwind, Sip &amp;<br>Stay Awhile',
    desc: 'Pencahayaan hangat, Wi-Fi kencang, dan kursi nyaman untuk bekerja santai maupun berbincang hingga malam.',
    ctaText: 'Reservasi Meja',
    ctaHref: '#visit',
    img: 'images/slide-3.jpg',
    bgFallback: 'linear-gradient(135deg, #3e281b 0%, #1f130c 100%)',
  },
];

const slidesTrack = $('#slidesTrack');
const sliderDots = $('#sliderDots');
let currentSlide = 0;
let slideTimer = null;

if (slidesTrack && sliderDots) {
  slidesTrack.innerHTML = HERO_SLIDES.map(
    (s, i) => `
    <article class="hero-slide ${i === 0 ? 'active' : ''}" style="background:${s.bgFallback}">
      <img src="${s.img}" alt="${s.script}" onerror="this.remove()">
      <div class="hero-shade"></div>
      <div class="hero-inner">
        <span class="hero-script">${s.script}</span>
        <h1>${s.title}</h1>
        <p class="hero-desc">${s.desc}</p>
        <div class="hero-cta-row">
          <a href="${s.ctaHref}" class="btn btn-cream">${s.ctaText}</a>
        </div>
      </div>
    </article>`,
  ).join('');

  sliderDots.innerHTML = HERO_SLIDES.map((_, i) => `<button type="button" class="s-dot ${i === 0 ? 'active' : ''}" data-idx="${i}" aria-label="Slide ${i + 1}"></button>`).join('');

  const slides = [...slidesTrack.querySelectorAll('.hero-slide')];
  const dots = [...sliderDots.querySelectorAll('.s-dot')];

  const goToSlide = (idx) => {
    currentSlide = (idx + slides.length) % slides.length;
    slides.forEach((el, i) => el.classList.toggle('active', i === currentSlide));
    dots.forEach((el, i) => el.classList.toggle('active', i === currentSlide));
  };

  const resetAutoPlay = () => {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => goToSlide(currentSlide + 1), 5500);
  };

  $('#prevSlide').onclick = () => {
    goToSlide(currentSlide - 1);
    resetAutoPlay();
  };

  $('#nextSlide').onclick = () => {
    goToSlide(currentSlide + 1);
    resetAutoPlay();
  };

  sliderDots.onclick = (e) => {
    const dot = e.target.closest('.s-dot');
    if (!dot) return;
    goToSlide(Number(dot.dataset.idx));
    resetAutoPlay();
  };

  /* Touch Swipe untuk HP */
  let touchStartX = 0;
  slidesTrack.addEventListener('touchstart', (e) => (touchStartX = e.touches[0].clientX), { passive: true });
  slidesTrack.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      goToSlide(currentSlide + (diff > 0 ? 1 : -1));
      resetAutoPlay();
    }
  });

  resetAutoPlay();
}

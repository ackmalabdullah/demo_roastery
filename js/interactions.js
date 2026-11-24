/* =========================================================
   INTERACTIONS: TACTILE RIPPLES, SPRING BOUNCE & SPARKLES
   ========================================================= */

(function initCafeInteractions() {
  const SPARK_COLORS = ['#b86b35', '#d68c54', '#5c3a21', '#e2a976'];

  function spawnClickSparks(x, y) {
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const count = 6;
    for (let i = 0; i < count; i++) {
      const spark = document.createElement('span');
      spark.className = 'click-spark';

      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.45;
      const dist = 24 + Math.random() * 24;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist - 8;

      spark.style.left = `${x - 3.5}px`;
      spark.style.top = `${y - 3.5}px`;
      spark.style.background = SPARK_COLORS[i % SPARK_COLORS.length];
      spark.style.setProperty('--dx', `${dx.toFixed(1)}px`);
      spark.style.setProperty('--dy', `${dy.toFixed(1)}px`);
      spark.style.setProperty('--rot', `${Math.round(90 + Math.random() * 140)}deg`);

      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 650);
    }
  }

  function triggerRipple(container, clientX, clientY) {
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = (clientX || rect.left + rect.width / 2) - rect.left - size / 2;
    const y = (clientY || rect.top + rect.height / 2) - rect.top - size / 2;

    if (getComputedStyle(container).position === 'static') {
      container.style.position = 'relative';
    }
    if (getComputedStyle(container).overflow === 'visible') {
      container.style.overflow = 'hidden';
    }

    const ripple = document.createElement('span');
    ripple.className = 'tap-ripple';
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    container.appendChild(ripple);
    setTimeout(() => ripple.remove(), 620);
  }

  function bounceCard(cardEl) {
    if (!cardEl) return;
    cardEl.classList.remove('is-card-tapped');
    void cardEl.offsetWidth;
    cardEl.classList.add('is-card-tapped');
  }

  document.addEventListener('pointerdown', (e) => {
    if (e.button !== undefined && e.button !== 0 && e.pointerType === 'mouse') return;

    const target = e.target;

    const cardTarget = target.closest(
      '.m-card, .sheet-row, .pairing-box, .rating-stamp, .quote-frame, .postcard-box, .v-photo, .about-arch, .hist-polaroid-main'
    );

    if (cardTarget) {
      bounceCard(cardTarget);

      const rippleHost = cardTarget.classList.contains('m-card')
        ? cardTarget.querySelector('.m-pedestal')
        : cardTarget;

      triggerRipple(rippleHost, e.clientX, e.clientY);
    }

    const interactiveEl = target.closest(
      '.btn, .mood-btn, .m-tab, .t-btn, .hl-arrow, .pager-btn, .rev-arrow, .slider-arrow, .sp-star, .why-item, .why-btn, .topic-pill'
    );

    if (interactiveEl) {
      triggerRipple(interactiveEl, e.clientX, e.clientY);
    }

    if (
      target.closest(
        '.m-card, .sheet-row, .mood-btn, .m-tab, .btn-brown, .v-photo, .sp-star, .hist-node, .topic-pill, .contact-inline-link'
      )
    ) {
      spawnClickSparks(e.clientX, e.clientY);
    }
  });
})();
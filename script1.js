/* ============================================================
   HA CARPENTRY — MAIN JAVASCRIPT
   Features: Navbar · Hamburger · Stats Counter · Carousels
             Lightbox · Door Filter · Scroll Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. NAVBAR SCROLL ─────────────────────────────────────── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── 2. HAMBURGER MENU ────────────────────────────────────── */
  const ham      = document.querySelector('.hamburger');
  const mobMenu  = document.querySelector('.mob-menu');
  const mobOvl   = document.querySelector('.mob-overlay');

  if (ham && mobMenu && mobOvl) {
    const openMenu  = () => { ham.classList.add('open'); mobMenu.classList.add('open'); mobOvl.classList.add('show'); document.body.style.overflow = 'hidden'; };
    const closeMenu = () => { ham.classList.remove('open'); mobMenu.classList.remove('open'); mobOvl.classList.remove('show'); document.body.style.overflow = ''; };

    ham.addEventListener('click', () => mobMenu.classList.contains('open') ? closeMenu() : openMenu());
    mobOvl.addEventListener('click', closeMenu);
    document.querySelectorAll('.mob-links a').forEach(a => a.addEventListener('click', closeMenu));
  }

  /* ── 3. ACTIVE NAV LINK ───────────────────────────────────── */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nb-links a, .mob-links a').forEach(a => {
    if (a.getAttribute('href') === page || (page === '' && a.getAttribute('href') === 'index.html'))
      a.classList.add('active');
  });

  /* ── 4. SCROLL ANIMATIONS (Intersection Observer) ────────── */
  const aosIO = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); aosIO.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.aos').forEach(el => aosIO.observe(el));

  /* ── 5. STATS COUNTER ─────────────────────────────────────── */
  function runCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 2200;
    const step     = target / (duration / 16);
    let   current  = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current).toLocaleString();
      if (current >= target) clearInterval(timer);
    }, 16);
  }

  const statsIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.cnt').forEach(runCounter);
        statsIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.35 });
  const statsEl = document.querySelector('.stats-sec');
  if (statsEl) statsIO.observe(statsEl);

  /* ── 6. TOP SERVICES CAROUSEL (Mobile) ───────────────────── */
  /* On mobile the rail scroll-snaps; dots are purely visual cues */
  const srvRail = document.querySelector('.srv-rail');
  const srvDots = document.querySelectorAll('.srv-dot');

  if (srvRail && srvDots.length) {
    const cards = srvRail.querySelectorAll('.srv-card');

    const updateDot = () => {
      const w = srvRail.scrollWidth / cards.length;
      const idx = Math.round(srvRail.scrollLeft / w);
      srvDots.forEach((d, i) => d.classList.toggle('active', i === idx));
    };

    srvRail.addEventListener('scroll', updateDot, { passive: true });
    srvDots[0]?.classList.add('active');

    srvDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        const w = srvRail.scrollWidth / cards.length;
        srvRail.scrollTo({ left: i * w, behavior: 'smooth' });
      });
    });
  }

  /* ── 7. REVIEWS CAROUSEL ──────────────────────────────────── */
  const revTrack = document.querySelector('.rev-track');
  const revPrev  = document.querySelector('.rev-prev');
  const revNext  = document.querySelector('.rev-next');

  if (revTrack) {
    const revCards = Array.from(revTrack.querySelectorAll('.rev-card'));
    let   revIdx   = 0;
    let   revAuto;

    /* Cards visible at once based on screen width */
    function revPerView() {
      const w = window.innerWidth;
      if (w >= 1100) return 3;
      if (w >= 680)  return 2;
      return 1;
    }

    /* Step size = rendered card width + gap (24px = 1.5rem) */
    function getStepW() {
      if (!revCards[0]) return 384;
      return revCards[0].getBoundingClientRect().width + 24;
    }

    function slideReviews() {
      const pv  = revPerView();
      const max = Math.max(0, revCards.length - pv);
      revIdx    = Math.min(Math.max(0, revIdx), max);
      revTrack.style.transform = `translateX(-${revIdx * getStepW()}px)`;
    }

    function goNext() {
      const max = Math.max(0, revCards.length - revPerView());
      revIdx = revIdx >= max ? 0 : revIdx + 1;
      slideReviews();
    }
    function goPrev() {
      const max = Math.max(0, revCards.length - revPerView());
      revIdx = revIdx <= 0 ? max : revIdx - 1;
      slideReviews();
    }

    revNext?.addEventListener('click', goNext);
    revPrev?.addEventListener('click', goPrev);

    const stopAuto  = () => clearInterval(revAuto);
    const startAuto = () => { stopAuto(); revAuto = setInterval(goNext, 4500); };

    /* Wait for layout to settle before first slide */
    setTimeout(slideReviews, 150);
    startAuto();

    revTrack.addEventListener('mouseenter', stopAuto);
    revTrack.addEventListener('mouseleave', startAuto);

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(slideReviews, 200);
    }, { passive: true });
  }

  /* ── 8. LIGHTBOX ──────────────────────────────────────────── */
  const lb      = document.querySelector('.lightbox');
  const lbImg   = lb?.querySelector('img');
  const lbClose = lb?.querySelector('.lb-close');

  if (lb && lbImg) {
    const openLb  = src => { lbImg.src = src; lb.classList.add('open'); document.body.style.overflow = 'hidden'; };
    const closeLb = ()  => { lb.classList.remove('open'); document.body.style.overflow = ''; setTimeout(() => lbImg.src = '', 300); };

    document.querySelectorAll('[data-lb]').forEach(el => {
      el.addEventListener('click', () => openLb(el.getAttribute('data-lb')));
    });

    lbClose?.addEventListener('click', closeLb);
    lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && lb.classList.contains('open')) closeLb(); });
  }

  /* ── 9. DOOR PAGE FILTER ──────────────────────────────────── */
  const filterTabs  = document.querySelectorAll('.ftab');
  const filterCards = document.querySelectorAll('.dpg-card');

  if (filterTabs.length) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.dataset.filter;

        filterCards.forEach(card => {
          const show = cat === 'all' || card.dataset.cat === cat;
          card.style.display   = show ? '' : 'none';
          card.style.animation = show ? 'fadeIn .35s ease' : '';
        });
      });
    });
  }

  /* ── 10. HERO PARALLAX ────────────────────────────────────── */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      heroBg.style.transform = `translateY(${window.pageYOffset * 0.38}px)`;
    }, { passive: true });
  }

  /* ── 11. SCROLL TO NEXT SECTION ───────────────────────────── */
  document.querySelector('.hero-scroll')?.addEventListener('click', () => {
    document.querySelector('.stats-sec')?.scrollIntoView({ behavior: 'smooth' });
  });

  /* ── 12. FADE-IN KEYFRAME (injected once) ─────────────────── */
  const s = document.createElement('style');
  s.textContent = '@keyframes fadeIn{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}';
  document.head.appendChild(s);

  console.log('%c HA Carpentry ✦ Website Loaded ', 'background:#C9A96E;color:#1C1C1C;font-weight:bold;border-radius:4px;padding:4px 8px');
});

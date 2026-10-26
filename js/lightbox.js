/* ==========================================================================
   AARAV KAPOOR PHOTOGRAPHY - LIGHTBOX ENGINE
   Full-screen luxury modal with close, prev/next, keyboard controls,
   and touch swipe support.
   ========================================================================== */

class Lightbox {
  constructor() {
    this.items = [];
    this.currentIndex = 0;
    this.isOpen = false;
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.initDOM();
    this.bindEvents();
  }

  initDOM() {
    // If lightbox element doesn't exist, inject it dynamically
    if (!document.getElementById('ak-lightbox')) {
      const modal = document.createElement('div');
      modal.id = 'ak-lightbox';
      modal.className = 'lightbox-modal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-label', 'Image Lightbox');

      modal.innerHTML = `
        <button class="lightbox-close" id="lightbox-close-btn" aria-label="Close Lightbox">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="lightbox-content" id="lightbox-content-box">
          <div class="lightbox-img-wrapper">
            <img src="" alt="" class="lightbox-image" id="lightbox-img" />
          </div>
          <div class="lightbox-caption-bar">
            <div>
              <h3 id="lightbox-title" class="font-serif text-lg font-medium text-white tracking-wide"></h3>
              <p id="lightbox-meta" class="text-xs text-amber-200/80 font-sans tracking-wider uppercase mt-1"></p>
            </div>
            <div id="lightbox-counter" class="text-xs font-mono tracking-widest text-neutral-400">
              01 / 20
            </div>
          </div>
        </div>

        <div class="lightbox-controls">
          <button class="lightbox-btn" id="lightbox-prev-btn" aria-label="Previous Image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button class="lightbox-btn" id="lightbox-next-btn" aria-label="Next Image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      `;

      document.body.appendChild(modal);
    }

    this.modalEl = document.getElementById('ak-lightbox');
    this.imgEl = document.getElementById('lightbox-img');
    this.titleEl = document.getElementById('lightbox-title');
    this.metaEl = document.getElementById('lightbox-meta');
    this.counterEl = document.getElementById('lightbox-counter');
    this.closeBtn = document.getElementById('lightbox-close-btn');
    this.prevBtn = document.getElementById('lightbox-prev-btn');
    this.nextBtn = document.getElementById('lightbox-next-btn');
  }

  bindEvents() {
    this.closeBtn.addEventListener('click', () => this.close());
    this.prevBtn.addEventListener('click', (e) => { e.stopPropagation(); this.prev(); });
    this.nextBtn.addEventListener('click', (e) => { e.stopPropagation(); this.next(); });

    // Click outside image box to close
    this.modalEl.addEventListener('click', (e) => {
      if (e.target === this.modalEl) {
        this.close();
      }
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    // Mobile Swipe Gestures
    this.modalEl.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.modalEl.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });
  }

  handleSwipe() {
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        this.next(); // swipe left -> next
      } else {
        this.prev(); // swipe right -> prev
      }
    }
  }

  open(items, startIndex = 0) {
    if (!items || !items.length) return;
    this.items = items;
    this.currentIndex = Math.max(0, Math.min(startIndex, items.length - 1));
    this.render();
    this.modalEl.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.isOpen = true;
  }

  close() {
    this.modalEl.classList.remove('active');
    document.body.style.overflow = '';
    this.isOpen = false;
  }

  prev() {
    if (!this.items.length) return;
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.render();
  }

  next() {
    if (!this.items.length) return;
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.render();
  }

  render() {
    const current = this.items[this.currentIndex];
    if (!current) return;

    // Smooth image transition
    this.imgEl.style.opacity = '0.3';
    this.imgEl.style.transform = 'scale(0.98)';

    const newImg = new Image();
    newImg.src = current.image;
    newImg.onload = () => {
      this.imgEl.src = current.image;
      this.imgEl.alt = current.title;
      this.imgEl.style.opacity = '1';
      this.imgEl.style.transform = 'scale(1)';
    };

    this.titleEl.textContent = current.title;
    this.metaEl.textContent = `${current.categoryLabel || current.category} • ${current.location || 'India'} (${current.year || '2025'})`;
    this.counterEl.textContent = `${String(this.currentIndex + 1).padStart(2, '0')} / ${String(this.items.length).padStart(2, '0')}`;
  }
}

// Global Lightbox instance
window.portfolioLightbox = new Lightbox();

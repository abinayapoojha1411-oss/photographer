/* ==========================================================================
   AARAV KAPOOR PHOTOGRAPHY - PORTFOLIO GALLERY CONTROLLER
   Category filtering, grid rendering, and lightbox integration.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const galleryGrid = document.getElementById('portfolio-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const countBadge = document.getElementById('gallery-count-badge');

  if (!galleryGrid || typeof PORTFOLIO_ITEMS === 'undefined') return;

  let currentCategory = 'all';
  let filteredItems = [...PORTFOLIO_ITEMS];

  // Render gallery cards
  function renderGallery(items) {
    galleryGrid.innerHTML = '';

    if (items.length === 0) {
      galleryGrid.innerHTML = `
        <div class="col-span-full py-20 text-center text-neutral-400">
          <p class="font-serif text-2xl mb-2">No photographs found</p>
          <p class="text-sm font-sans">Try selecting another category.</p>
        </div>
      `;
      if (countBadge) countBadge.textContent = '0 Photographs';
      return;
    }

    if (countBadge) {
      countBadge.textContent = `${items.length} Photographs`;
    }

    items.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = `gallery-card ${item.aspect || 'portrait'} group relative overflow-hidden rounded bg-neutral-900 shadow-lg`;
      card.setAttribute('data-id', item.id);
      card.setAttribute('data-category', item.category);

      card.innerHTML = `
        <div class="w-full h-full overflow-hidden">
          <img 
            src="${item.thumb || item.image}" 
            alt="${item.title}" 
            loading="lazy"
            class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
        <div class="gallery-overlay">
          <div class="gallery-meta">
            <span class="inline-block text-[11px] font-semibold uppercase tracking-widest text-amber-200/90 mb-1">
              ${item.categoryLabel}
            </span>
            <h3 class="font-serif text-lg md:text-xl font-medium text-white leading-snug">
              ${item.title}
            </h3>
            <p class="text-xs text-neutral-300 mt-1 flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              ${item.location}
            </p>
          </div>
          <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span class="w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center backdrop-blur-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </span>
          </div>
        </div>
      `;

      // Click card to open lightbox with current filtered items list
      card.addEventListener('click', () => {
        if (window.portfolioLightbox) {
          window.portfolioLightbox.open(filteredItems, index);
        }
      });

      galleryGrid.appendChild(card);
    });
  }

  // Filter items
  function applyFilter(category) {
    currentCategory = category;

    if (category === 'all') {
      filteredItems = [...PORTFOLIO_ITEMS];
    } else {
      filteredItems = PORTFOLIO_ITEMS.filter(item => item.category === category);
    }

    // Update active filter pill
    filterButtons.forEach(btn => {
      if (btn.getAttribute('data-filter') === category) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    renderGallery(filteredItems);
  }

  // Attach button events
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-filter');
      applyFilter(cat);
    });
  });

  // Check URL hash or query param (e.g., #wedding or ?category=fashion)
  const urlParams = new URLSearchParams(window.location.search);
  const paramCategory = urlParams.get('category');
  const hashCategory = window.location.hash.replace('#', '');
  const initialCategory = paramCategory || hashCategory;

  if (initialCategory && ['wedding', 'pre-wedding', 'portrait', 'fashion', 'events'].includes(initialCategory)) {
    applyFilter(initialCategory);
  } else {
    applyFilter('all');
  }
});

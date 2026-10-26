/* ==========================================================================
   AARAV KAPOOR PHOTOGRAPHY - MAIN GLOBAL CONTROLLER
   Sticky navigation, mobile drawer menu, back-to-top, and global utilities.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation on Scroll
  const navbar = document.getElementById('main-navbar');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  function handleScroll() {
    const scrollY = window.scrollY;

    if (navbar) {
      if (scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2. Mobile Drawer Navigation
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const drawerLinks = document.querySelectorAll('.mobile-drawer a');

  function openMobileMenu() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
    }
  }

  function closeMobileMenu() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', openMobileMenu);
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeMobileMenu);
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close mobile drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // 3. Highlight Current Page in Navigation
  const currentPath = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll('.nav-link, .drawer-links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.split('?')[0].split('#')[0].toLowerCase();
    
    // Check if link matches end of current path or default index
    if (
      (currentPath.endsWith(cleanHref) && cleanHref !== '') ||
      (cleanHref === 'index.html' && (currentPath === '/' || currentPath.endsWith('/') || currentPath.endsWith('index.html')))
    ) {
      link.classList.add('active');
    }
  });

  // 4. Featured Works Lightbox Trigger on Home Page
  const featuredCards = document.querySelectorAll('.featured-work-card');
  if (featuredCards.length > 0 && typeof PORTFOLIO_ITEMS !== 'undefined') {
    featuredCards.forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.getAttribute('data-id'), 10);
        const index = PORTFOLIO_ITEMS.findIndex(item => item.id === id);
        if (index !== -1 && window.portfolioLightbox) {
          window.portfolioLightbox.open(PORTFOLIO_ITEMS, index);
        }
      });
    });
  }
});

/* ==========================================================================
   AARAV KAPOOR PHOTOGRAPHY - TESTIMONIALS SLIDER
   Smooth interactive carousel for home page client reviews.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('testimonials-track');
  const prevBtn = document.getElementById('testi-prev-btn');
  const nextBtn = document.getElementById('testi-next-btn');
  const dotsContainer = document.getElementById('testi-dots');

  if (!track) return;

  const slides = track.querySelectorAll('.testimonial-slide');
  let currentIndex = 0;
  let autoPlayTimer = null;

  // Create dot indicators
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === 0 ? 'bg-amber-300 w-8' : 'bg-neutral-600'}`;
      dot.setAttribute('aria-label', `Go to testimonial slide ${idx + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(idx);
        resetAutoPlay();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('button');
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.className = 'w-8 h-2.5 rounded-full bg-amber-300 transition-all duration-300';
      } else {
        dot.className = 'w-2.5 h-2.5 rounded-full bg-neutral-600 transition-all duration-300 hover:bg-neutral-400';
      }
    });
  }

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoPlay();
    });
  }

  function startAutoPlay() {
    autoPlayTimer = setInterval(nextSlide, 6000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startAutoPlay();
  }

  // Pause on hover
  track.parentElement.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
  track.parentElement.addEventListener('mouseleave', () => startAutoPlay());

  startAutoPlay();
});

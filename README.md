# Aarav Kapoor Photography — Portfolio Website

A complete, fully functional, elegant, and minimal portfolio website designed for professional fine-art and destination wedding photographer **Aarav Kapoor**.

---

## ✨ Features & Architecture

- **Clean, Minimal & Luxury Aesthetic**:
  - Obsidian Black (`#0D0D0D`), Pure White (`#FFFFFF`), Soft Gray (`#F5F5F5`), and Champagne Gold accents (`#C5A880`).
  - Typography: *Playfair Display* (Editorial Serif headings) + *Plus Jakarta Sans* (Modern sans-serif body).
  - Subtle film grain texture, backdrop-blur sticky navbar, and smooth micro-interactions.

- **5 Dedicated Pages**:
  1. **Home (`index.html`)**: Full-screen hero section, photographer tagline ("Capturing Timeless Moments"), CTAs, editorial narrative, 6 curated featured works with lightbox preview, interactive testimonials carousel, and reservation CTA.
  2. **Portfolio (`portfolio.html`)**: Filterable gallery across 6 categories (*All*, *Wedding*, *Pre-Wedding*, *Portrait*, *Fashion*, *Events*) with 20 high-resolution photographs, count indicator, and working fullscreen lightbox.
  3. **About (`about.html`)**: Large photographer portrait, personal story (from 35mm film in Old Delhi to global destination weddings), philosophy ("The Art of the Unstaged"), experience milestones, and gear details.
  4. **Services & Pricing (`services.html`)**: Transparent packages (*Portrait Session* from ₹8,000, *Pre-Wedding Shoot* from ₹18,000, *Wedding Photography* from ₹45,000, and *Event/Commercial* custom brief) with "Book Now" CTAs that pre-select services on the contact form.
  5. **Contact (`contact.html`)**: Complete booking inquiry form with real-time field validation, date picker, loading spinner, and celebration confirmation modal with pre-filled WhatsApp action.

- **Global Interactive Features**:
  - **Fullscreen Lightbox**: Dark overlay, close button, previous/next controls, keyboard arrow navigation (`←`/`→`/`Esc`), mobile swipe gestures, and image counter (`04 / 20`).
  - **Floating WhatsApp Button**: Pre-configured message link to `https://wa.me/919876543214`.
  - **Mobile Navigation Drawer**: Responsive slide-down navigation with animated hamburger toggle and body scroll lock.
  - **Back to Top**: Smooth scroll button.

---

## 📁 Directory Structure

```
photographers/
├── index.html            # Home page
├── portfolio.html        # Filterable Portfolio Gallery
├── about.html            # About Aarav Kapoor
├── services.html         # Services & Pricing packages
├── contact.html          # Contact & Booking inquiry form
├── css/
│   └── style.css         # Custom luxury styling & animations
├── js/
│   ├── portfolio-data.js # Curated photo archive dataset
│   ├── lightbox.js       # Lightbox engine
│   ├── portfolio.js      # Portfolio filter controller
│   ├── testimonials.js   # Testimonials carousel
│   ├── contact.js        # Form validation & success modal
│   └── main.js           # Navbar, drawer & global behaviors
└── README.md
```

---

## 🚀 Getting Started

Simply open `index.html` in any modern web browser, or serve using any static web server:

```bash
# In your terminal
npx serve .
# or
python -m http.server 8000
```

---

## 📄 License & Credits

Designed with fine art craftsmanship for **Aarav Kapoor Photography**. All curated photography assets sourced via Unsplash under standard Unsplash License.

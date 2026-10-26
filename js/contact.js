/* ==========================================================================
   AARAV KAPOOR PHOTOGRAPHY - CONTACT & BOOKING FORM CONTROLLER
   Form validation, query-string pre-selection, success modal,
   and WhatsApp transmission.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('booking-form');
  const successModal = document.getElementById('booking-success-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalWhatsappBtn = document.getElementById('modal-whatsapp-action');
  const dateInput = document.getElementById('preferred-date');

  // Prevent past dates in date picker
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  // Pre-select service from URL query params (e.g. ?service=wedding)
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service');
  const shootTypeSelect = document.getElementById('shoot-type');

  if (serviceParam && shootTypeSelect) {
    const validServices = ['portrait', 'pre-wedding', 'wedding', 'event', 'other'];
    const matched = validServices.find(s => s === serviceParam.toLowerCase());
    if (matched) {
      shootTypeSelect.value = matched;
      shootTypeSelect.classList.add('border-amber-400');
    }
  }

  if (!form) return;

  // Validation Helpers
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone) {
    // Validates standard 10 digit Indian number or international with optional '+' and spaces
    const clean = phone.replace(/[\s\-\(\)]/g, '');
    return /^\+?[0-9]{10,14}$/.test(clean);
  }

  function setError(inputEl, message) {
    const container = inputEl.closest('.form-group') || inputEl.parentElement;
    container.classList.add('input-error');
    let errorMsg = container.querySelector('.input-error-msg');
    if (!errorMsg) {
      errorMsg = document.createElement('p');
      errorMsg.className = 'input-error-msg';
      container.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
  }

  function clearError(inputEl) {
    const container = inputEl.closest('.form-group') || inputEl.parentElement;
    container.classList.remove('input-error');
  }

  // Real-time input validation clearance
  ['full-name', 'phone-number', 'email-address', 'shoot-type'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => clearError(el));
      el.addEventListener('change', () => clearError(el));
    }
  });

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('full-name');
    const phoneInput = document.getElementById('phone-number');
    const emailInput = document.getElementById('email-address');
    const shootType = document.getElementById('shoot-type');
    const dateVal = document.getElementById('preferred-date')?.value || 'Not specified';
    const messageVal = document.getElementById('message-details')?.value || '';

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      setError(nameInput, 'Please enter your full name');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Validate Phone
    if (!phoneInput.value.trim() || !validatePhone(phoneInput.value.trim())) {
      setError(phoneInput, 'Please enter a valid phone number (e.g. +91 98765 43210)');
      isValid = false;
    } else {
      clearError(phoneInput);
    }

    // Validate Email
    if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
      setError(emailInput, 'Please enter a valid email address');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Validate Shoot Type
    if (!shootType.value) {
      setError(shootType, 'Please select a shoot type');
      isValid = false;
    } else {
      clearError(shootType);
    }

    if (!isValid) {
      // Scroll smoothly to first error
      const firstError = form.querySelector('.input-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Submit state animation
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-black inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Sending Inquiry...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      // Construct WhatsApp message with user submission details for quick instant followup
      const serviceLabels = {
        portrait: 'Portrait Session',
        'pre-wedding': 'Pre-Wedding Shoot',
        wedding: 'Wedding Photography',
        event: 'Event / Commercial Shoot',
        other: 'Bespoke Photography'
      };
      const formattedService = serviceLabels[shootType.value] || shootType.value;

      const waText = encodeURIComponent(
        `Hello Aarav! I just submitted an inquiry on your website:\n` +
        `• Name: ${nameInput.value.trim()}\n` +
        `• Service: ${formattedService}\n` +
        `• Preferred Date: ${dateVal}\n` +
        `• Email: ${emailInput.value.trim()}\n` +
        `• Phone: ${phoneInput.value.trim()}\n` +
        (messageVal ? `• Details: ${messageVal}` : '')
      );

      if (modalWhatsappBtn) {
        modalWhatsappBtn.href = `https://wa.me/919876543214?text=${waText}`;
      }

      // Open Success Modal
      if (successModal) {
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      form.reset();
    }, 800);
  });

  // Close modal logic
  if (modalCloseBtn && successModal) {
    modalCloseBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});

const weddingDate = new Date('2026-06-24T17:00:00');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const form = document.getElementById('rsvp-form');
const successMessage = document.getElementById('success-message');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');
const introOverlay = document.getElementById('intro-overlay');

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

function handleSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#' || targetId.startsWith('#')) {
        event.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clearErrors() {
  document.querySelectorAll('.error-message').forEach((span) => {
    span.textContent = '';
  });
}

function showSuccess() {
  successMessage.textContent = 'Thank you! Your RSVP has been received. We can’t wait to celebrate with you.';
  form.reset();
}

function handleFormSubmit(event) {
  event.preventDefault();
  clearErrors();

  const name = document.getElementById('guest-name').value.trim();
  const email = document.getElementById('guest-email').value.trim();
  const count = document.getElementById('guest-count').value.trim();

  let hasError = false;

  if (!name) {
    document.getElementById('name-error').textContent = 'Please enter your name.';
    hasError = true;
  }

  if (!email || !validateEmail(email)) {
    document.getElementById('email-error').textContent = 'Please enter a valid email address.';
    hasError = true;
  }

  if (!count || Number(count) < 1) {
    document.getElementById('count-error').textContent = 'Please enter a valid guest count.';
    hasError = true;
  }

  if (hasError) {
    return;
  }

  showSuccess();
}

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
}

function handleGallery() {
  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        openLightbox(img.src, img.alt);
      }
    });
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const img = item.querySelector('img');
        if (img) {
          openLightbox(img.src, img.alt);
        }
      }
    });
  });
}

function handleParallax() {
  const hero = document.querySelector('.hero');
  window.addEventListener('scroll', () => {
    const offset = window.scrollY * 0.15;
    if (hero) {
      hero.style.backgroundPosition = `center calc(50% + ${offset}px)`;
    }
  });
}

function init() {
  updateCountdown();
  setInterval(updateCountdown, 1000);
  handleSmoothScroll();
  handleParallax();
  handleGallery();
  form.addEventListener('submit', handleFormSubmit);
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
  if (introOverlay) {
    introOverlay.addEventListener('click', () => {
      document.body.classList.remove('intro-active');
      introOverlay.style.display = 'none';
    });
  }

  const invitationButton = document.querySelector('.button.primary[href="#invitation"]');
  if (invitationButton) {
    invitationButton.addEventListener('click', (event) => {
      if (document.body.classList.contains('invitation-hidden')) {
        event.preventDefault();
        document.body.classList.remove('invitation-hidden');
        const target = document.querySelector('#invitation');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

init();

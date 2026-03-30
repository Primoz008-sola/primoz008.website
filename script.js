/* ============================================================
   Portfolio JavaScript — Interactivity & Animations
   ============================================================ */

(function () {
  'use strict';

  /* ── Typed Text Effect ─────────────────────────────────── */
  const typedEl = document.getElementById('typed-text');
  const phrases = [
    'Spletni Razvijalec',
    'Frontend Inženir',
    'Backend Razvijalec',
    'Full-Stack Developer',
    'UI/UX Navdušenec',
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingTimer = null;

  function type() {
    if (!typedEl) return;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typedEl.textContent = currentPhrase.substring(0, charIndex);

    let delay = isDeleting ? 60 : 110;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    typingTimer = setTimeout(type, delay);
  }

  type();

  /* ── Header scroll effect ──────────────────────────────── */
  const header = document.getElementById('header');

  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNav();
    toggleBackToTop();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Active navigation link ────────────────────────────── */
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
        });
        const activeLink = document.querySelector('.nav__link[href="#' + sectionId + '"]');
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }

  /* ── Mobile navigation toggle ──────────────────────────── */
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');

  navToggle.addEventListener('click', function () {
    const isOpen = navList.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navList.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ── Back to top ───────────────────────────────────────── */
  const backToTop = document.getElementById('back-to-top');

  function toggleBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  /* ── Reveal on scroll (Intersection Observer) ──────────── */
  const revealEls = document.querySelectorAll(
    '.about__card, .project-card, .skill-item, .skill-tag, ' +
    '.contact__card, .contact__form, .skills__group'
  );

  revealEls.forEach(function (el) {
    el.classList.add('reveal');
  });

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ── Skill progress bars ───────────────────────────────── */
  const progressBars = document.querySelectorAll('.skill-item__progress');

  const progressObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.getAttribute('data-width');
          bar.style.width = targetWidth + '%';
          progressObserver.unobserve(bar);
        }
      });
    },
    { threshold: 0.5 }
  );

  progressBars.forEach(function (bar) {
    progressObserver.observe(bar);
  });

  /* ── Contact form validation ───────────────────────────── */
  const form = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  function getField(id) {
    return document.getElementById(id);
  }

  function getError(id) {
    return document.getElementById(id + '-error');
  }

  function showError(fieldId, message) {
    var field = getField(fieldId);
    var error = getError(fieldId);
    if (field) field.classList.add('error');
    if (error) error.textContent = message;
    return false;
  }

  function clearError(fieldId) {
    var field = getField(fieldId);
    var error = getError(fieldId);
    if (field) field.classList.remove('error');
    if (error) error.textContent = '';
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (form) {
    ['name', 'email', 'subject', 'message'].forEach(function (id) {
      var field = getField(id);
      if (field) {
        field.addEventListener('input', function () {
          clearError(id);
        });
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameField = getField('name');
      var emailField = getField('email');
      var subjectField = getField('subject');
      var messageField = getField('message');

      if (!nameField || !emailField || !subjectField || !messageField) return;

      var valid = true;

      var name = nameField.value.trim();
      var email = emailField.value.trim();
      var subject = subjectField.value.trim();
      var message = messageField.value.trim();

      clearError('name');
      clearError('email');
      clearError('subject');
      clearError('message');

      if (!name) {
        valid = showError('name', 'Prosim vnesite vaše ime.');
      } else if (name.length < 2) {
        valid = showError('name', 'Ime mora vsebovati vsaj 2 znaka.');
      }

      if (!email) {
        valid = showError('email', 'Prosim vnesite e-poštni naslov.');
      } else if (!validateEmail(email)) {
        valid = showError('email', 'Vnesite veljaven e-poštni naslov.');
      }

      if (!subject) {
        valid = showError('subject', 'Prosim vnesite zadevo sporočila.');
      }

      if (!message) {
        valid = showError('message', 'Prosim vnesite sporočilo.');
      } else if (message.length < 10) {
        valid = showError('message', 'Sporočilo mora vsebovati vsaj 10 znakov.');
      }

      if (valid) {
        var submitBtn = form.querySelector('[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Pošiljanje…';

        setTimeout(function () {
          form.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML =
            'Pošlji sporočilo <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
          formSuccess.style.display = 'block';
          setTimeout(function () {
            formSuccess.style.display = 'none';
          }, 5000);
        }, 1000);
      }
    });
  }

  /* ── Set current year in footer ────────────────────────── */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

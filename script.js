/* =============================================
   script.js — Portfolio interactivity
   ============================================= */

// ---- Typed text effect ----
const typedEl = document.querySelector('.typed');
const roles = [
  'Spletni razvijalec',
  'Python programer',
  'Frontend ustvarjalec',
  'Tech navdušenec',
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;
let typePause = false;

function typeLoop() {
  if (typePause) return;
  const current = roles[roleIndex];

  if (deleting) {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, 50);
  } else {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      typePause = true;
      setTimeout(() => {
        typePause = false;
        deleting = true;
        typeLoop();
      }, 2000);
      return;
    }
    setTimeout(typeLoop, 80);
  }
}

if (typedEl) typeLoop();

// ---- Sticky nav on scroll ----
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveLink();
});

// ---- Mobile nav toggle ----
const toggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');

toggle?.addEventListener('click', () => {
  toggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    toggle?.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollPos = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav__links a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
    }
  });
}

// ---- Intersection Observer: reveal animations ----
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger, .timeline__item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ---- Skill bars animation ----
const skillBars = document.querySelectorAll('.skill-bar__fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      fill.style.width = fill.dataset.pct + '%';
      barObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => barObserver.observe(bar));

// ---- Contact form ----
const form = document.getElementById('contact-form');
const formMsg = document.getElementById('form-message');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Pošiljam…';
  btn.disabled = true;

  // Simulate async send (mailto fallback)
  setTimeout(() => {
    formMsg.textContent = '✅ Hvala! Vaše sporočilo je bilo poslano.';
    formMsg.style.color = 'var(--accent)';
    form.reset();
    btn.textContent = 'Pošlji sporočilo';
    btn.disabled = false;
    setTimeout(() => { formMsg.textContent = ''; }, 5000);
  }, 1200);
});

// ---- Smooth scroll for all anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- Parallax tilt on stat cards ----
document.querySelectorAll('.stat-card, .tech-chip').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(400px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

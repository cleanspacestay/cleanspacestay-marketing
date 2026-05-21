// ─── Mobile Menu Toggle ──────────────────────────────────────────────────────
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

navToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// ─── Smooth Scroll for anchor links ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── Nav background on scroll ────────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ─── Contact Form ────────────────────────────────────────────────────────────
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;
  
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData.entries());
  
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (response.ok) {
      btn.textContent = 'Sent! We\'ll be in touch.';
      btn.style.background = '#22c55e';
      contactForm.reset();
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    } else {
      throw new Error('Failed to send');
    }
  } catch (err) {
    btn.textContent = 'Error — try again';
    btn.style.background = '#ef4444';
    btn.disabled = false;
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
    }, 3000);
  }
});

// ─── Back to Top Button ─────────────────────────────────────────────────────
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── Scroll-triggered fade-in with stagger ──────────────────────────────────
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

// Apply staggered fade-in to groups of cards
document.querySelectorAll('.problem-card, .feature-card, .team-card, .connected-card, .contact-card').forEach((el, index) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = `${(index % 4) * 100}ms`;
  fadeObserver.observe(el);
});

// Fade in section headers
document.querySelectorAll('.section-header').forEach(el => {
  el.classList.add('fade-up');
  fadeObserver.observe(el);
});

// ─── Hero stagger animation on load ─────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const heroElements = [
    '.hero-badge',
    '.hero-title',
    '.hero-description',
    '.hero-cta',
    '.hero-stats'
  ];

  heroElements.forEach((selector, i) => {
    const el = document.querySelector(selector);
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 600ms cubic-bezier(0.23, 1, 0.32, 1) ${i * 120}ms, transform 600ms cubic-bezier(0.23, 1, 0.32, 1) ${i * 120}ms`;
      
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100);
    }
  });

  // Dashboard float in from right
  const dashboard = document.querySelector('.dashboard-preview');
  if (dashboard) {
    dashboard.style.opacity = '0';
    dashboard.style.transform = 'translateX(30px) translateY(10px)';
    dashboard.style.transition = 'opacity 800ms cubic-bezier(0.23, 1, 0.32, 1) 400ms, transform 800ms cubic-bezier(0.23, 1, 0.32, 1) 400ms';
    
    setTimeout(() => {
      dashboard.style.opacity = '1';
      dashboard.style.transform = 'translateX(0) translateY(0)';
    }, 100);
  }
});

// ─── Floating dashboard animation ───────────────────────────────────────────
// Gentle bob up and down
const dashboard = document.querySelector('.dashboard-preview');
if (dashboard) {
  dashboard.classList.add('float-animation');
}

// ─── Gradient shimmer on hero title ─────────────────────────────────────────
const gradientText = document.querySelector('.gradient-text');
if (gradientText) {
  gradientText.classList.add('shimmer');
}

// ─── Hero stats sequential reveal ──────────────────────────────────────────
const stats = document.querySelectorAll('.stat');
stats.forEach((stat, i) => {
  stat.style.opacity = '0';
  stat.style.transform = 'translateY(10px)';
  stat.style.transition = `opacity 500ms ease ${800 + i * 200}ms, transform 500ms ease ${800 + i * 200}ms`;
  
  setTimeout(() => {
    stat.style.opacity = '1';
    stat.style.transform = 'translateY(0)';
  }, 100);
});

// ─── CTA button glow pulse ──────────────────────────────────────────────────
const ctaButtons = document.querySelectorAll('.cta .btn-primary');
ctaButtons.forEach(btn => {
  btn.classList.add('glow-pulse');
});

// ─── Parallax-lite on hero ──────────────────────────────────────────────────
const hero = document.querySelector('.hero');
const heroVisual = document.querySelector('.hero-visual');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (scrolled < 800 && heroVisual) {
    const rate = scrolled * 0.03;
    heroVisual.style.transform = `translateY(${rate}px)`;
  }
});

// ─── Tilt effect on feature cards (desktop only) ────────────────────────────
if (window.matchMedia('(min-width: 768px)').matches) {
  document.querySelectorAll('.feature-card, .problem-card, .connected-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      card.style.transition = 'transform 400ms cubic-bezier(0.23, 1, 0.32, 1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 100ms ease';
    });
  });
}

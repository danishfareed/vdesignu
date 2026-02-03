/**
 * Scroll Reveal & Interactivity Module
 * Modern 2025 animations using Intersection Observer and vanilla JS
 */

// Initialize scroll reveal animations
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (!revealElements.length) return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered delay based on index within viewport
          const delay = index * 100;
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );
  
  revealElements.forEach((el) => observer.observe(el));
}

// Tilt effect for cards
function initTiltEffect() {
  const tiltCards = document.querySelectorAll('.tilt-card');
  
  tiltCards.forEach((card) => {
    const inner = card.querySelector('.tilt-card-inner') || card;
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      inner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

// Magnetic button effect
function initMagneticButtons() {
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  
  magneticBtns.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

// Parallax scroll effect for hero elements
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (!parallaxElements.length) return;
  
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach((el) => {
          const speed = parseFloat(el.dataset.parallax) || 0.5;
          const yPos = -(scrollY * speed);
          el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
        
        ticking = false;
      });
      ticking = true;
    }
  });
}

// Smooth counter animation
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  
  if (!counters.length) return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const endValue = parseInt(target.dataset.counter, 10);
          const duration = parseInt(target.dataset.duration, 10) || 2000;
          const suffix = target.dataset.suffix || '';
          const prefix = target.dataset.prefix || '';
          
          animateCounter(target, 0, endValue, duration, prefix, suffix);
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.5 }
  );
  
  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(element, start, end, duration, prefix, suffix) {
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out-expo)
    const easeOutExpo = 1 - Math.pow(2, -10 * progress);
    const current = Math.floor(start + (end - start) * easeOutExpo);
    
    element.textContent = `${prefix}${current}${suffix}`;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// Cursor glow effect (optional premium feature)
function initCursorGlow() {
  const glowElement = document.createElement('div');
  glowElement.className = 'cursor-glow';
  glowElement.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(220, 38, 38, 0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
  `;
  document.body.appendChild(glowElement);
  
  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    glowElement.style.opacity = '1';
  });
  
  document.addEventListener('mouseleave', () => {
    glowElement.style.opacity = '0';
  });
  
  function animateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    glowElement.style.left = `${glowX}px`;
    glowElement.style.top = `${glowY}px`;
    requestAnimationFrame(animateGlow);
  }
  
  animateGlow();
}

// Staggered reveal for grid items
function initStaggeredReveal() {
  const grids = document.querySelectorAll('[data-stagger]');
  
  grids.forEach((grid) => {
    const items = grid.children;
    const delay = parseInt(grid.dataset.stagger, 10) || 100;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          Array.from(items).forEach((item, index) => {
            item.style.transitionDelay = `${index * delay}ms`;
            item.classList.add('revealed');
          });
          observer.unobserve(grid);
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(grid);
  });
}

// Initialize all effects
function initInteractivity() {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Still reveal content, but without animations
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('revealed'));
    return;
  }
  
  initScrollReveal();
  initTiltEffect();
  initMagneticButtons();
  initParallax();
  initCounters();
  initStaggeredReveal();
  
  // Only enable cursor glow on desktop
  if (window.innerWidth >= 1024) {
    initCursorGlow();
  }
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initInteractivity);
} else {
  initInteractivity();
}

// Re-initialize on Astro page transitions
document.addEventListener('astro:page-load', initInteractivity);

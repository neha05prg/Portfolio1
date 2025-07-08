// main.js
// JavaScript for portfolio animations and interactivity will go here. 

// Neon blue color utility for Tailwind (if not present)
document.head.insertAdjacentHTML('beforeend', `<style>.text-neon-blue { color: #00e6fe; } .hover\:text-neon-blue:hover { color: #00e6fe; } .drop-shadow-glow { filter: drop-shadow(0 0 8px #00e6fe); }</style>`);

// Animated blobs keyframes and shadow-neon utility
const heroBlobStyles = `
@keyframes blob1 { 0%,100%{transform:translateY(0) scale(1);} 50%{transform:translateY(-30px) scale(1.1);} }
@keyframes blob2 { 0%,100%{transform:translateY(0) scale(1);} 50%{transform:translateY(30px) scale(1.05);} }
@keyframes blob3 { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(-40px,20px) scale(1.08);} }
.animate-blob1{animation:blob1 8s ease-in-out infinite;}
.animate-blob2{animation:blob2 10s ease-in-out infinite;}
.animate-blob3{animation:blob3 12s ease-in-out infinite;}
.hover\\:shadow-neon:hover, .shadow-neon { box-shadow: 0 0 16px 2px #00e6fe88, 0 2px 8px 0 #00e6fe33; }
`;
document.head.insertAdjacentHTML('beforeend', `<style>${heroBlobStyles}</style>`);

// Floating profile image animation
const aboutMeStyles = `
@keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-18px);} }
.animate-float { animation: float 4s ease-in-out infinite; }
.skill-badge {
  display: inline-block;
  background: linear-gradient(90deg, #00e6fe 10%, #a78bfa 90%);
  color: #fff;
  font-weight: 600;
  border-radius: 9999px;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  box-shadow: 0 2px 8px #00e6fe33;
  transition: transform 0.25s, box-shadow 0.25s, filter 0.25s;
  cursor: pointer;
  will-change: transform, filter;
}
.skill-badge:hover {
  transform: scale(1.12) rotateY(8deg);
  filter: brightness(1.15) drop-shadow(0 0 8px #00e6fe);
  box-shadow: 0 0 16px 2px #00e6fe88, 0 2px 8px 0 #a78bfa44;
}
.fade-up { opacity: 0; transform: translateY(32px); transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1); }
.fade-up.visible { opacity: 1; transform: translateY(0); }
.fade-up.delay-100 { transition-delay: 0.15s; }
.fade-up.delay-200 { transition-delay: 0.3s; }
`;
document.head.insertAdjacentHTML('beforeend', `<style>${aboutMeStyles}</style>`);

// Typewriter/fade-in for greeting
function typewriterEffect(element, text, speed = 60) {
  let i = 0;
  element.textContent = '';
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, text.charAt(i-1) === ' ' ? speed/2 : speed);
    }
  }
  type();
}

window.addEventListener('DOMContentLoaded', () => {
  // Greeting typewriter
  const greeting = document.getElementById('greeting');
  if (greeting) {
    greeting.style.opacity = 1;
    const greetingText = "Hi, I'm Neha 44B";
    typewriterEffect(greeting, greetingText, 60);
  }
  // Slide-up for intro
  const intro = document.getElementById('hero-intro');
  if (intro) {
    setTimeout(() => {
      intro.classList.remove('opacity-0', 'translate-y-6');
      intro.classList.add('opacity-100', 'translate-y-0', 'transition-all', 'duration-700');
    }, 1200);
  }
  animateOnScroll('.fade-up');
  animateTimeline();
});

// Navbar mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('translate-x-full');
    mobileMenu.classList.toggle('translate-x-0');
  });
  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('translate-x-full');
      navToggle.classList.remove('rotate-90');
    });
  });
}

// Smooth scroll for nav links
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70, // offset for navbar
          behavior: 'smooth'
        });
      }
    }
  });
});

// Intersection Observer for fade-up/slide-in
function animateOnScroll(selector = '.fade-up') {
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll(selector).forEach(el => observer.observe(el));
}

// Project card, badge, and button styles
const projectStyles = `
.project-card {
  transition: transform 0.35s cubic-bezier(.4,0,.2,1), box-shadow 0.35s cubic-bezier(.4,0,.2,1), filter 0.35s;
  will-change: transform, box-shadow, filter;
}
.project-card:hover {
  transform: scale(1.045) rotateY(4deg);
  box-shadow: 0 0 24px 4px #00e6fe55, 0 4px 16px 0 #a78bfa33;
  filter: brightness(1.04) drop-shadow(0 0 8px #00e6fe);
  z-index: 2;
}
.project-badge {
  display: inline-block;
  background: linear-gradient(90deg, #00e6fe 10%, #a78bfa 90%);
  color: #fff;
  font-weight: 600;
  border-radius: 9999px;
  padding: 0.3rem 1rem;
  font-size: 0.95rem;
  box-shadow: 0 2px 8px #00e6fe22;
  transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
}
.project-btn {
  background: #00e6fe;
  color: #fff;
  font-weight: 600;
  border-radius: 0.75rem;
  padding: 0.5rem 1.5rem;
  box-shadow: 0 2px 8px #00e6fe33;
  transition: transform 0.22s, box-shadow 0.22s, filter 0.22s, background 0.22s, color 0.22s;
  outline: none;
  border: none;
  display: inline-block;
  cursor: pointer;
}
.project-btn:hover, .project-btn:focus {
  transform: scale(1.08);
  box-shadow: 0 0 16px 2px #00e6fe88, 0 2px 8px 0 #a78bfa44;
  filter: brightness(1.1) drop-shadow(0 0 8px #00e6fe);
}
.project-btn.alt {
  background: #fff;
  color: #00e6fe;
  border: 2px solid #00e6fe;
}
.project-btn.alt:hover, .project-btn.alt:focus {
  background: #00e6fe;
  color: #fff;
}
.fade-up { opacity: 0; transform: translateY(32px); transition: opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1); }
.fade-up.visible { opacity: 1; transform: translateY(0); }
.fade-up.delay-100 { transition-delay: 0.15s; }
.fade-up.delay-200 { transition-delay: 0.3s; }
`;
document.head.insertAdjacentHTML('beforeend', `<style>${projectStyles}</style>`);

// Timeline styles and slide-in animations
const timelineStyles = `
.timeline { min-height: 400px; }
.timeline-marker { z-index: 10; }
@media (min-width: 768px) {
  .timeline-entry { display: flex; }
  .timeline-entry:nth-child(odd) { flex-direction: row; }
  .timeline-entry:nth-child(even) { flex-direction: row-reverse; }
}
.fade-side-right { opacity: 0; transform: translateX(48px); transition: opacity 0.8s cubic-bezier(.4,0,.2,1), transform 0.8s cubic-bezier(.4,0,.2,1); }
.fade-side-right.visible { opacity: 1; transform: translateX(0); }
.fade-side-left { opacity: 0; transform: translateX(-48px); transition: opacity 0.8s cubic-bezier(.4,0,.2,1), transform 0.8s cubic-bezier(.4,0,.2,1); }
.fade-side-left.visible { opacity: 1; transform: translateX(0); }
`;
document.head.insertAdjacentHTML('beforeend', `<style>${timelineStyles}</style>`);

// Intersection Observer for timeline slide-in
function animateTimeline() {
  const lefts = document.querySelectorAll('.fade-side-left');
  const rights = document.querySelectorAll('.fade-side-right');
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });
  lefts.forEach(el => observer.observe(el));
  rights.forEach(el => observer.observe(el));
}

// Social icon glow, floating label, and form styles
const contactStyles = `
.social-icon {
  color: #00e6fe;
  background: #fff;
  border-radius: 9999px;
  box-shadow: 0 2px 8px #00e6fe22;
  transition: box-shadow 0.25s, transform 0.25s, color 0.25s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  font-size: 1.5rem;
}
.social-icon:hover, .social-icon:focus {
  color: #fff;
  background: #00e6fe;
  box-shadow: 0 0 16px 2px #00e6fe88, 0 2px 8px 0 #a78bfa44;
  transform: scale(1.12);
}
.floating-input {
  width: 100%;
  padding: 1.1rem 1rem 0.5rem 1rem;
  border: 2px solid #e0e7ef;
  border-radius: 0.75rem;
  background: #fff;
  color: #22223b;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.floating-input:focus {
  border-color: #00e6fe;
  box-shadow: 0 0 0 2px #00e6fe33;
}
.floating-label {
  position: absolute;
  left: 1rem;
  top: 1.1rem;
  color: #7b7b93;
  font-size: 1rem;
  pointer-events: none;
  background: transparent;
  transition: all 0.2s;
}
.floating-input:focus + .floating-label,
.floating-input:not(:placeholder-shown) + .floating-label {
  top: 0.2rem;
  left: 0.9rem;
  font-size: 0.85rem;
  color: #00e6fe;
  background: #fff;
  padding: 0 0.2rem;
}
// PHP message styling handled by Tailwind classes in the HTML.
`;
document.head.insertAdjacentHTML('beforeend', `<style>${contactStyles}</style>`);

// Footer styles and scroll-to-top button
const footerStyles = `
.footer-link {
  color: #00e6fe;
  font-weight: 500;
  position: relative;
  transition: color 0.2s;
}
.footer-link:after {
  content: '';
  display: block;
  width: 0;
  height: 2px;
  background: #00e6fe;
  transition: width 0.2s;
  position: absolute;
  left: 0;
  bottom: -2px;
}
.footer-link:hover, .footer-link:focus {
  color: #a78bfa;
}
.footer-link:hover:after, .footer-link:focus:after {
  width: 100%;
}
.footer-social {
  color: #00e6fe;
  background: #fff;
  border-radius: 9999px;
  box-shadow: 0 2px 8px #00e6fe22;
  transition: box-shadow 0.25s, transform 0.25s, color 0.25s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.25rem;
}
.footer-social:hover, .footer-social:focus {
  color: #fff;
  background: #00e6fe;
  box-shadow: 0 0 16px 2px #00e6fe88, 0 2px 8px 0 #a78bfa44;
  transform: scale(1.12);
}
#scrollToTop {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}
#scrollToTop.visible {
  opacity: 1;
  pointer-events: auto;
}
`;
document.head.insertAdjacentHTML('beforeend', `<style>${footerStyles}</style>`);

// Scroll-to-top button logic
const scrollBtn = document.getElementById('scrollToTop');
if (scrollBtn) {
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });
} 
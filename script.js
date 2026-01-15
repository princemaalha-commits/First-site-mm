// Mobile nav toggle (hamburger + drawer)
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.classList.toggle("is-open");
    if (isOpen) {
      nav.classList.add("nav--open");
      navToggle.setAttribute("aria-expanded", "true");
    } else {
      nav.classList.remove("nav--open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Close menu when clicking any nav link (on mobile)
  nav.addEventListener("click", (e) => {
    if (e.target.classList.contains("nav-link") && navToggle.classList.contains("is-open")) {
      navToggle.classList.remove("is-open");
      nav.classList.remove("nav--open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Smooth scroll for internal anchors (for older browsers)
document.addEventListener("click", (e) => {
  const target = e.target.closest('a[href^="#"]');
  if (!target) return;

  const href = target.getAttribute("href");
  if (href === "#" || href.length === 0) return;

  const section = document.querySelector(href);
  if (!section) return;

  e.preventDefault();
  section.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

// Subtle entrance animation using IntersectionObserver
const revealEls = document.querySelectorAll(
  ".hero-inner, .project-card, .about-column, .footer-inner"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18
  }
);

revealEls.forEach((el) => {
  el.classList.add("will-reveal");
  observer.observe(el);
});

// Apply basic fade-up transition via JS-injected classes
const style = document.createElement("style");
style.textContent = `
  .will-reveal {
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 260ms ease-out, transform 260ms ease-out;
  }
  .will-reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// Dynamic year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

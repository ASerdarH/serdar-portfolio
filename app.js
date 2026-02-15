document.addEventListener("DOMContentLoaded", () => {
  // Active nav on scroll
  const links = Array.from(document.querySelectorAll(".nav a[href^='#']"));
  const sections = links.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);

  const setActive = (id) => links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
  }, {threshold: 0.35});
  sections.forEach(s => obs.observe(s));

  // Reveal animations
  const revealEls = document.querySelectorAll(".reveal");
  const rio = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("visible"); });
  }, {threshold: 0.14});
  revealEls.forEach(el => rio.observe(el));

  // Photo tilt
  const card = document.querySelector(".photoCard");
  if (card) {
    const damp = 16;
    const reset = () => card.style.transform = "rotateX(0deg) rotateY(0deg)";
    const move = (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateX(${(-y*damp).toFixed(2)}deg) rotateY(${(x*damp).toFixed(2)}deg)`;
    };
    card.addEventListener("mousemove", move);
    card.addEventListener("mouseleave", reset);
  }
});
  // Inline expand cards
  document.querySelectorAll('.expandable').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a, button')) return;
      card.classList.toggle('expanded');
    });
  });

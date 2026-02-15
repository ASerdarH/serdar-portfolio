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

// Experience accordion (rebuild) - single-open
(() => {
  const items = Array.from(document.querySelectorAll('[data-exp]'));
  if (!items.length) return;

  function closeItem(it){
    const btn = it.querySelector('.exp-head');
    const panel = it.querySelector('.exp-panel');
    const icon = it.querySelector('.exp-icon');
    it.classList.remove('open');
    btn?.setAttribute('aria-expanded','false');
    if (panel) panel.style.maxHeight = '0px';
    if (icon) icon.textContent = '+';
  }

  function openItem(it){
    const btn = it.querySelector('.exp-head');
    const panel = it.querySelector('.exp-panel');
    const icon = it.querySelector('.exp-icon');
    it.classList.add('open');
    btn?.setAttribute('aria-expanded','true');
    if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
    if (icon) icon.textContent = '–';
  }

  items.forEach(it => {
    const btn = it.querySelector('.exp-head');
    const panel = it.querySelector('.exp-panel');
    if (panel) panel.style.maxHeight = '0px';
    btn?.addEventListener('click', () => {
      const isOpen = it.classList.contains('open');
      items.forEach(closeItem);
      if (!isOpen) openItem(it);
    });
  });

  // Recompute on resize for opened item
  window.addEventListener('resize', () => {
    const open = items.find(i => i.classList.contains('open'));
    if (!open) return;
    const panel = open.querySelector('.exp-panel');
    if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
  });
})();

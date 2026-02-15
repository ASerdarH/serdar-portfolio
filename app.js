document.addEventListener("DOMContentLoaded", () => {
  // Smooth active nav based on scroll
  const links = Array.from(document.querySelectorAll(".menu a[href^='#']"));
  const sections = links
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const setActive = (id) => {
    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
  };

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) setActive(e.target.id);
    });
  }, {threshold: 0.35});

  sections.forEach(s => obs.observe(s));

  // Reveal animations
  const revealEls = document.querySelectorAll(".reveal");
  const rio = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("visible"); });
  }, {threshold: 0.12});
  revealEls.forEach(el => rio.observe(el));

  // Experience accordions
  document.querySelectorAll("[data-acc]").forEach(btn => {
    btn.addEventListener("click", () => {
      const panel = btn.parentElement.querySelector(".panel");
      const open = panel.classList.toggle("open");
      panel.style.maxHeight = open ? panel.scrollHeight + "px" : "0px";
      btn.querySelector("[data-chev]").textContent = open ? "–" : "+";
    });
  });

  // Photo tilt
  const card = document.querySelector(".photo-card");
  if (card) {
    const damp = 18;
    const reset = () => card.style.transform = "rotateX(0deg) rotateY(0deg)";
    const move = (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateX(${(-y * damp).toFixed(2)}deg) rotateY(${(x * damp).toFixed(2)}deg)`;
    };
    card.addEventListener("mousemove", move);
    card.addEventListener("mouseleave", reset);
  }
});
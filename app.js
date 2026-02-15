
// Active nav + reveal + carousels + modal
document.addEventListener("DOMContentLoaded", () => {
  // Active nav based on hash
  const setActive = () => {
    const hash = location.hash || "#home";
    document.querySelectorAll(".menu a").forEach(a => {
      a.classList.toggle("active", a.getAttribute("href") === hash);
    });
  };
  window.addEventListener("hashchange", setActive);
  setActive();

  // Reveal on scroll
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("visible"); });
  }, {threshold: 0.12});
  els.forEach(el => io.observe(el));

  // Carousels
  document.querySelectorAll("[data-carousel]").forEach(car => {
    const slides = Array.from(car.querySelectorAll(".slide"));
    const count = car.querySelector("[data-count]");
    let idx = 0;

    const show = (i) => {
      idx = (i + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("active", k === idx));
      if (count) count.textContent = `${idx+1}/${slides.length}`;
    };

    car.querySelector("[data-prev]")?.addEventListener("click", () => show(idx-1));
    car.querySelector("[data-next]")?.addEventListener("click", () => show(idx+1));

    // Double click to open details
    slides.forEach(s => {
      s.addEventListener("dblclick", () => openModal(s.dataset.modal));
    });

    show(0);
  });

  // Modal controls
  const modal = document.querySelector("#modal");
  const modalTitle = document.querySelector("#modalTitle");
  const modalBody = document.querySelector("#modalBody");
  const closeBtn = document.querySelector("#modalClose");

  const data = window.__DETAILS__ || {};

  function openModal(key){
    if(!key || !data[key]) return;
    modalTitle.textContent = data[key].title;
    modalBody.innerHTML = data[key].html;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }
  window.openModal = openModal;

  function closeModal(){
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
  closeBtn?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => { if(e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if(e.key === "Escape") closeModal(); });

  // "More info" buttons
  document.querySelectorAll("[data-more]").forEach(btn => {
    btn.addEventListener("click", () => openModal(btn.dataset.more));
  });
});

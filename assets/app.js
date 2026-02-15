document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector(".page");
  if (page) requestAnimationFrame(() => page.classList.add("ready"));

  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navlinks a").forEach(a => {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });

  document.querySelectorAll('a[data-transition="true"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) return;
      e.preventDefault();
      if (!page) { window.location.href = href; return; }
      page.classList.add("fade-out");
      setTimeout(() => { window.location.href = href; }, 220);
    });
  });
});
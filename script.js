/* NetherNova archive homepage: intentionally minimal, no artificial loading screens. */
document.getElementById("return-top")?.addEventListener("click", event => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
});

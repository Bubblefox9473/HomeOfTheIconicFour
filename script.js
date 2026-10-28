/* NetherNova homepage interactions. */
document.getElementById("return-top")?.addEventListener("click", event => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
});

/* Grant a single entrance animation only when navigating from the studio homepage.
   The key is consumed on Experimental/ and never set by its dossier pages. */
(() => {
  const bootKey = "nnc04:legacy-login-entry";
  const destination = new URL("Experimental/", document.baseURI);
  document.querySelectorAll('a[href]').forEach(link => {
    let url;
    try { url = new URL(link.href, document.baseURI); }
    catch { return; }
    if (url.origin !== destination.origin || url.pathname !== destination.pathname) return;

    link.addEventListener("click", event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (link.target && link.target !== "_self") return;
      try { sessionStorage.setItem(bootKey, String(Date.now())); }
      catch { /* Storage can be unavailable in a restricted browser. */ }
    });
  });
})();
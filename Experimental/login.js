/* NNC-04 entrance: the homepage sets a short-lived, one-use session marker.
   No marker = no login overlay. Returning from dossiers never sets a marker. */
(() => {
  const root = document.documentElement;
  if (!root.classList.contains('legacy-boot-pending')) return;

  const overlay = document.getElementById('legacy-login');
  if (!overlay) {
    root.classList.remove('legacy-boot-pending');
    return;
  }

  const site = document.querySelector('.legacy-wrap');
  const skip = document.getElementById('legacy-login-skip');
  const message = document.getElementById('legacy-login-message');
  const logo = document.getElementById('legacy-original-logo');
  const logoFallback = document.getElementById('legacy-login-logo-fallback');

  function showLogoFallback() {
    if (logo) logo.hidden = true;
    if (logoFallback) logoFallback.hidden = false;
  }
  logo?.addEventListener('error', showLogoFallback, { once: true });
  if (logo?.complete && !logo.naturalWidth) showLogoFallback();

  if (site) site.inert = true;
  skip?.focus({ preventScroll: true });

  let active = true;
  const scheduled = new Set();
  function after(ms, callback) {
    const id = window.setTimeout(() => {
      scheduled.delete(id);
      if (active) callback();
    }, ms);
    scheduled.add(id);
  }

  function finish(immediately = false) {
    if (!active) return;
    active = false;
    for (const id of scheduled) window.clearTimeout(id);
    scheduled.clear();

    if (site) site.inert = false;
    skip?.blur();

    if (immediately) {
      root.classList.remove('legacy-boot-pending', 'legacy-boot-dismiss');
      overlay.remove();
      return;
    }

    root.classList.add('legacy-boot-dismiss');
    window.setTimeout(() => {
      root.classList.remove('legacy-boot-pending', 'legacy-boot-dismiss');
      overlay.remove();
    }, 490);
  }

  after(820, () => {
    if (message) message.textContent = 'LEGACY FACILITY SYSTEM / RESTORING CONNECTION...';
  });
  after(1680, () => {
    if (message) message.textContent = 'LC:NN BRANCH CREDENTIALS / VERIFYING...';
  });
  after(2630, () => {
    if (message) message.textContent = 'ACCESS GRANTED / WELCOME BACK, MANAGER';
    overlay.classList.add('legacy-login-granted');
  });
  after(3450, () => finish());

  skip?.addEventListener('click', () => finish());
  overlay.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      finish();
    }
  });

  window.addEventListener('pagehide', () => finish(true), { once: true });
  window.addEventListener('pageshow', event => {
    if (event.persisted) finish(true);
  });
})();
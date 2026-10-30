/* Nyx / UMB-#14 — manually opened physical dossier with a cover-first arrival. */
(() => {
  const book = document.getElementById("nyx-book");
  const cover = document.getElementById("folder-cover");
  const replay = document.getElementById("replay-animation");
  const open = document.getElementById("open-file");
  const close = document.getElementById("close-file");
  const status = document.getElementById("sequence-status");
  const viewport = document.getElementById("stage-scroll");
  const pages = [document.getElementById("left-folio"), document.getElementById("right-folio")];
  if (!book || !cover || !replay || !open || !close || !status || !viewport || pages.some(page => !page)) return;

  const lessMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const scheduled = new Set();
  let generation = 0;
  let state = "arriving";

  function clamp(number, min, max) {
    return Math.min(max, Math.max(min, number));
  }
  function announce(message) { status.textContent = message; }
  function cancelSequence() {
    generation += 1;
    for (const id of scheduled) window.clearTimeout(id);
    scheduled.clear();
    return generation;
  }
  function schedule(callback, ms, token = generation) {
    const id = window.setTimeout(() => {
      scheduled.delete(id);
      if (generation === token) callback();
    }, ms);
    scheduled.add(id);
  }
  function setPagesAvailable(value) {
    for (const page of pages) page.inert = !value;
  }
  function syncControls() {
    const closed = state === "closed";
    open.disabled = !closed;
    open.hidden = state === "open";
    close.hidden = state !== "open";
    replay.disabled = state === "opening" || state === "closing";
  }
  function focusClosedBook() {
    if (viewport.scrollWidth <= viewport.clientWidth) return;
    const stage = viewport.querySelector(".book-stage");
    const left = (stage ? stage.offsetLeft : 0) + book.offsetLeft;
    const closedCenter = left + book.offsetWidth * 0.51;
    viewport.scrollLeft = clamp(closedCenter - viewport.clientWidth / 2, 0, viewport.scrollWidth);
  }

  function landImmediately() {
    cancelSequence();
    state = "closed";
    book.className = "book instant is-landed";
    setPagesAvailable(false);
    focusClosedBook();
    announce("FILE READY / EXAMINE COVER OR SELECT OPEN FILE");
    syncControls();
    requestAnimationFrame(() => requestAnimationFrame(() => book.classList.remove("instant")));
  }
  function retrieveFolder() {
    const token = cancelSequence();
    state = "arriving";
    book.className = "book instant";
    setPagesAvailable(false);
    announce("RETRIEVING ARCHIVE FOLDER / UMB-#14");
    syncControls();
    if (lessMotion.matches) {
      landImmediately();
      return;
    }
    requestAnimationFrame(() => {
      if (token !== generation) return;
      focusClosedBook();
      requestAnimationFrame(() => {
        if (token !== generation) return;
        book.classList.remove("instant");
        book.classList.add("is-landed");
        announce("FILE RECEIVED / PLACING FOLDER ON INSPECTION TABLE");
        schedule(() => {
          state = "closed";
          announce("FILE READY / EXAMINE COVER OR SELECT OPEN FILE");
          syncControls();
        }, 1300, token);
      });
    });
  }

  function openFolder() {
    if (state !== "closed") return;
    const token = cancelSequence();
    state = "opening";
    setPagesAvailable(false);
    announce("OPENING FOLDER / REVEALING BOTH ARCHIVE PAGES");
    book.classList.add("is-open");
    syncControls();
    schedule(() => {
      state = "open";
      setPagesAvailable(true);
      announce("FILE OPEN / UMB-#14 / BOTH PAGES AVAILABLE");
      syncControls();
      if (viewport.scrollWidth > viewport.clientWidth) {
        viewport.scrollTo({ left: 0, behavior: lessMotion.matches ? "auto" : "smooth" });
      }
    }, lessMotion.matches ? 0 : 1800, token);
  }

  function closeFolder() {
    if (state !== "open") return;
    const token = cancelSequence();
    state = "closing";
    setPagesAvailable(false);
    announce("CLOSING FOLDER / RETURNING TO COVER");
    book.classList.remove("is-open");
    book.classList.add("is-closing");
    syncControls();
    schedule(() => {
      book.classList.remove("is-closing");
      schedule(() => {
        state = "closed";
        focusClosedBook();
        announce("FILE CLOSED / COVER READY TO INSPECT");
        syncControls();
      }, lessMotion.matches ? 0 : 1250, token);
    }, lessMotion.matches ? 0 : 1700, token);
  }

  cover.addEventListener("click", () => {
    if (state === "closed") openFolder();
  });
  replay.addEventListener("click", retrieveFolder);
  open.addEventListener("click", openFolder);
  close.addEventListener("click", closeFolder);
  lessMotion.addEventListener?.("change", () => {
    if (lessMotion.matches && state === "arriving") landImmediately();
    else if (lessMotion.matches && state === "opening") {
      cancelSequence();
      state = "open"; setPagesAvailable(true); syncControls();
      announce("FILE OPEN / UMB-#14 / BOTH PAGES AVAILABLE");
    } else if (lessMotion.matches && state === "closing") {
      landImmediately();
    }
  });

  retrieveFolder();
})();

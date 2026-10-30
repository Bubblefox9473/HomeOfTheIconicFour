/* Nyx / UMB-#14 — manually opened physical dossier, with optional local-only cover decorations.
   All decals are archival presentation details and never change the subject's lore. */
(() => {
  const book = document.getElementById("nyx-book");
  const cover = document.getElementById("folder-cover");
  const front = cover?.querySelector(".cover-front");
  const layer = document.getElementById("cover-decoration-layer");
  const replay = document.getElementById("replay-animation");
  const open = document.getElementById("open-file");
  const close = document.getElementById("close-file");
  const status = document.getElementById("sequence-status");
  const viewport = document.getElementById("stage-scroll");
  const workshop = document.getElementById("cover-workshop");
  const workshopStatus = document.getElementById("workshop-status");
  const addButtons = [...document.querySelectorAll("[data-add-decal]")];
  const clearButton = document.getElementById("clear-decals");
  const pages = [document.getElementById("left-folio"), document.getElementById("right-folio")];
  if (!book || !cover || !front || !layer || !replay || !open || !close || !status || !viewport ||
      !workshop || !workshopStatus || !clearButton || pages.some(page => !page)) return;

  const lessMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const storageKey = "nnc04:nyx:cover-decals:v1";
  const decalTypes = Object.freeze({
    aleph: { label: "ALEPH / HIGH", name: "ALEPH classification label" },
    ally: { label: "ALLIED", name: "Allied seal" },
    archive: { label: "ARCHIVE COPY", name: "Archive tape" },
    index: { label: "UMB-#14", name: "Index tag" }
  });
  const positions = [
    [13, 15], [64, 18], [13, 77], [63, 72],
    [31, 9], [49, 83], [10, 49], [67, 46]
  ];
  const limit = 8;
  const scheduled = new Set();
  let generation = 0;
  let state = "arriving";
  let decals = [];

  function clamp(number, min, max) {
    return Math.min(max, Math.max(min, number));
  }
  function announce(message) { status.textContent = message; }
  function inform(message) { workshopStatus.textContent = message; }
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
    workshop.dataset.mode = closed ? "ready" : "inactive";
    for (const button of addButtons) button.disabled = !closed || decals.length >= limit;
    clearButton.disabled = !closed || !decals.length;
    if (state === "open") inform("FOLDER OPEN / CLOSE IT TO EDIT THE COVER.");
    else if (state === "arriving") inform("COVER AVAILABLE AFTER RETRIEVAL.");
    else if (state === "opening" || state === "closing") inform("FOLDER MOVING / STANDBY.");
    else inform("READY TO DECORATE / CLICK COVER TO OPEN.");
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

  function saveDecals() {
    try { localStorage.setItem(storageKey, JSON.stringify(decals)); }
    catch { /* Personalization works this session even if storage is unavailable. */ }
  }
  function restoreDecals() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (!Array.isArray(saved)) return;
      decals = saved.slice(0, limit).filter(d => d && Object.hasOwn(decalTypes, d.type) &&
        Number.isFinite(d.x) && Number.isFinite(d.y))
        .map(d => ({ type: d.type, x: clamp(d.x, 6, 81), y: clamp(d.y, 7, 86) }));
    } catch { decals = []; }
  }

  function renderDecals() {
    layer.replaceChildren();
    decals.forEach((decal, index) => {
      const model = decalTypes[decal.type];
      const button = document.createElement("button");
      button.type = "button";
      button.className = "cover-decal decal-" + decal.type;
      button.textContent = model.label;
      button.setAttribute("aria-label", model.name + ". Drag to move; arrow keys to reposition; Delete to remove.");
      button.title = model.name + " · Drag or use arrow keys · Delete to remove";
      button.style.left = decal.x + "%";
      button.style.top = decal.y + "%";
      button.dataset.decalIndex = String(index);

      let pointerStart = null;
      button.addEventListener("pointerdown", event => {
        if (state !== "closed" || event.button !== 0) return;
        event.stopPropagation();
        event.preventDefault();
        const rect = front.getBoundingClientRect();
        pointerStart = {
          id: event.pointerId, clientX: event.clientX, clientY: event.clientY,
          x: decal.x, y: decal.y, width: rect.width, height: rect.height
        };
        button.setPointerCapture(event.pointerId);
        button.classList.add("is-dragging");
        button.focus({ preventScroll: true });
      });
      button.addEventListener("pointermove", event => {
        if (!pointerStart || pointerStart.id !== event.pointerId) return;
        const dx = (event.clientX - pointerStart.clientX) * 100 / pointerStart.width;
        const dy = (event.clientY - pointerStart.clientY) * 100 / pointerStart.height;
        decal.x = clamp(pointerStart.x + dx, 6, 81);
        decal.y = clamp(pointerStart.y + dy, 7, 86);
        button.style.left = decal.x + "%";
        button.style.top = decal.y + "%";
      });
      function finishDrag(event) {
        if (!pointerStart || pointerStart.id !== event.pointerId) return;
        pointerStart = null;
        button.classList.remove("is-dragging");
        saveDecals();
      }
      button.addEventListener("pointerup", finishDrag);
      button.addEventListener("pointercancel", finishDrag);
      button.addEventListener("click", event => event.stopPropagation());
      button.addEventListener("keydown", event => {
        if (state !== "closed") return;
        if (event.key === "Delete" || event.key === "Backspace") {
          event.preventDefault();
          decals.splice(index, 1);
          saveDecals();
          renderDecals();
          syncControls();
          inform(model.name.toUpperCase() + " REMOVED.");
          return;
        }
        const step = event.shiftKey ? 5 : 2;
        const offsets = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
        const move = offsets[event.key];
        if (!move) return;
        event.preventDefault();
        decal.x = clamp(decal.x + move[0], 6, 81);
        decal.y = clamp(decal.y + move[1], 7, 86);
        button.style.left = decal.x + "%";
        button.style.top = decal.y + "%";
        saveDecals();
      });
      layer.append(button);
    });
  }

  addButtons.forEach(button => button.addEventListener("click", () => {
    if (state !== "closed" || decals.length >= limit) return;
    const type = button.dataset.addDecal;
    if (!Object.hasOwn(decalTypes, type)) return;
    const spot = positions[decals.length];
    decals.push({ type, x: spot[0], y: spot[1] });
    saveDecals();
    renderDecals();
    syncControls();
    inform(decalTypes[type].name.toUpperCase() + " ADDED / DRAG ON COVER TO POSITION.");
  }));
  clearButton.addEventListener("click", () => {
    if (state !== "closed") return;
    decals = [];
    saveDecals();
    renderDecals();
    syncControls();
    inform("ADDED DECORATIONS CLEARED / ORIGINAL COVER PRESERVED.");
  });

  cover.addEventListener("click", event => {
    if (event.target.closest(".cover-decal")) return;
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

  restoreDecals();
  renderDecals();
  retrieveFolder();
})();

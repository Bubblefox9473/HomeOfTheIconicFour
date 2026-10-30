/* UMB-#14 / Nyx — tactile archival booklet prototype.
   Motion is presentation-only. No new research facts or records are generated. */
(() => {
  const book = document.getElementById("nyx-book");
  const replay = document.getElementById("replay-animation");
  const skip = document.getElementById("skip-animation");
  const status = document.getElementById("sequence-status");
  const viewport = document.getElementById("stage-scroll");
  const pages = [document.getElementById("left-folio"), document.getElementById("right-folio")];
  if (!book || !replay || !skip || !status || !viewport || pages.some((page) => !page)) return;

  const prefersLessMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pending = new Set();

  function schedule(callback, ms) {
    const timer = window.setTimeout(() => {
      pending.delete(timer);
      callback();
    }, ms);
    pending.add(timer);
  }

  function cancelSequence() {
    for (const timer of pending) window.clearTimeout(timer);
    pending.clear();
  }

  function setPagesAvailable(available) {
    for (const page of pages) page.inert = !available;
  }

  function showMessage(message) {
    status.textContent = message;
  }

  function focusClosedBook() {
    if (viewport.scrollWidth <= viewport.clientWidth) return;
    const stage = viewport.querySelector(".book-stage");
    const bookLeft = (stage ? stage.offsetLeft : 0) + book.offsetLeft;
    const centerOfClosedCover = bookLeft + book.offsetWidth * 0.51;
    viewport.scrollLeft = Math.max(0, centerOfClosedCover - viewport.clientWidth / 2);
  }

  function openImmediately() {
    cancelSequence();
    book.className = "book instant is-open";
    setPagesAvailable(true);
    skip.hidden = true;
    viewport.scrollTo({ left: 0, behavior: "instant" });
    showMessage("FILE OPEN / UMB-#14 / TWO-PAGE ARCHIVE VIEW AVAILABLE");
    requestAnimationFrame(() => requestAnimationFrame(() => book.classList.remove("instant")));
  }

  function beginSequence() {
    cancelSequence();
    book.className = "book instant";
    setPagesAvailable(false);
    skip.hidden = false;
    showMessage("RETRIEVING ARCHIVE FOLDER / UMB-#14");

    if (prefersLessMotion.matches) {
      openImmediately();
      return;
    }

    // Ensure the initial off-screen pose is painted before landing the folder.
    // A double animation frame also permits replay after the page is already open.
    requestAnimationFrame(() => {
      focusClosedBook();
      requestAnimationFrame(() => {
        book.classList.remove("instant");
        book.classList.add("is-landed");
        showMessage("FILE RECEIVED / PLACING FOLDER ON INSPECTION TABLE");

        schedule(() => {
          book.classList.add("is-open");
          showMessage("RELEASING FRONT COVER / EXPOSING FILE CONTENTS");

          schedule(() => {
            setPagesAvailable(true);
            skip.hidden = true;
            showMessage("FILE OPEN / UMB-#14 / TWO-PAGE ARCHIVE VIEW AVAILABLE");
            if (viewport.scrollWidth > viewport.clientWidth) {
              viewport.scrollTo({ left: 0, behavior: "smooth" });
            }
          }, 1800);
        }, 1150);
      });
    });
  }

  replay.addEventListener("click", beginSequence);
  skip.addEventListener("click", openImmediately);

  // Reduced-motion visitors receive an immediately readable spread.
  prefersLessMotion.addEventListener?.("change", () => {
    if (prefersLessMotion.matches) openImmediately();
  });

  beginSequence();
})();

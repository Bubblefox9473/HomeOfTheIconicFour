/* NNC–04 / Special Notices file cabinet. Four known folder labels; no invented subject dossiers. */
(() => {
  const cabinet = document.getElementById("notices-cabinet");
  const drawer = document.getElementById("notices-drawer-interior");
  const toggle = document.getElementById("notices-drawer-toggle");
  const handleLabel = document.getElementById("notices-handle-label");
  const inspector = document.getElementById("notices-inspector");
  if (!cabinet || !drawer || !toggle || !handleLabel || !inspector) return;

  const folders = [...drawer.querySelectorAll(".notices-folder[data-notice]")];
  const number = inspector.querySelector("#notices-inspector-number");
  const category = inspector.querySelector("#notices-inspector-category");
  const name = inspector.querySelector("#notices-inspector-name");
  const description = inspector.querySelector("#notices-inspector-description");
  const status = inspector.querySelector("#notices-inspector-status");
  const link = inspector.querySelector("#notices-inspector-link");
  if (folders.length !== 4 || !number || !category || !name || !description || !status || !link) return;

  const records = {
    nyx: {
      count: "01 / 04",
      category: "UMB-#14 / ALEPH HIGH",
      name: "NYX",
      description: "Anomaly classified ALEPH / HIGH; allied with and considered harmless to Limbus Company.",
      status: "BOOKLET PROTOTYPE AVAILABLE",
      url: "Anomalies/Nyx/"
    },
    ifrit: {
      count: "02 / 04",
      category: "SPECIAL NOTICE / AWAITING ENTRY",
      name: "IFRIT",
      description: "This folder has been reserved. No research details have been filed yet.",
      status: "FILE PENDING",
      url: null
    },
    bahamut: {
      count: "03 / 04",
      category: "SPECIAL NOTICE / AWAITING ENTRY",
      name: "BAHAMUT",
      description: "This folder has been reserved. No research details have been filed yet.",
      status: "FILE PENDING",
      url: null
    },
    twins: {
      count: "04 / 04",
      category: "SPECIAL NOTICE / JOINT FILE",
      name: "SAELITH & VERMEIL",
      description: "One shared folder for the twins, Saelith and Vermeil. Research details are pending.",
      status: "JOINT FILE PENDING",
      url: null
    }
  };

  function selectFile(id) {
    const file = Object.hasOwn(records, id) ? records[id] : null;
    if (!file || cabinet.dataset.drawer !== "open") return;
    folders.forEach(folder => {
      const selected = folder.dataset.notice === id;
      folder.classList.toggle("is-selected", selected);
      folder.setAttribute("aria-pressed", String(selected));
    });
    number.textContent = file.count;
    category.textContent = file.category;
    name.textContent = file.name;
    description.textContent = file.description;
    status.textContent = file.status;
    status.dataset.status = file.url ? "available" : "pending";
    link.hidden = !file.url;
    if (file.url) link.setAttribute("href", file.url);
    else link.removeAttribute("href");
  }

  function setDrawer(open) {
    cabinet.dataset.drawer = open ? "open" : "closed";
    drawer.inert = !open;
    toggle.setAttribute("aria-expanded", String(open));
    handleLabel.textContent = open ? "CLOSE DRAWER" : "OPEN DRAWER";
    if (!open && drawer.contains(document.activeElement)) toggle.focus();
  }

  for (const folder of folders) {
    folder.addEventListener("click", () => selectFile(folder.dataset.notice));
  }
  toggle.addEventListener("click", () => {
    setDrawer(cabinet.dataset.drawer !== "open");
  });

  // Nyx is the previewed file by default; the other names remain pending.
  setDrawer(true);
  selectFile("nyx");
})();

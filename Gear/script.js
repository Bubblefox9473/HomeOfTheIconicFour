/* NNC-02 / Gear Registry — provenance and item type are separate fields. */
"use strict";
/* Relics are weapons recovered from the rarely spoken-of Ruins supposedly beneath the City. They are a weapon class, not a provenance category. */
const inventory = [
  {
    id: "NNC02-001", name: "The Tianyi Star", division: "faction", subdivision: "syndicates",
    kind: "weapons", type: "Star", issuer: "The Pinky", owner: "Anomidae Solenne",
    summary: "The Tianyi Star, otherwise known as the Deviance Star, is an exceptionally long ōdachi, nearly matching its wielder's height. Its dark steel blade possesses a subtle curvature, with numerous irregular fractures running across its surface.",
    note: "Faction-Issued / Syndicates / The Pinky. Issue classification confirmed.", condition: "Intact and operational. Numerous fractures are visible along the blade, though they do not compromise its structural integrity. Capable of entering a temporary shattered state under specific, currently undisclosed conditions.",
    acquisition: "Acquired. Originally held by the Pinky before being entrusted to Anomidae. Currently in her possession and serving as her primary weapon.",
    properties: [
      "Exceptionally long ōdachi, nearly matching its wielder's height.",

"Dark steel blade with distinctive fracture patterns.",

"Ceremonial hilt featuring decorative fittings and traditional wrappings.",

"Capable of separating into multiple rigid fragments without losing its overall form.",

"Fragments remain suspended through an unidentified, ashen- grey energy.",

"Shattered state allows extended reach and simultaneous attacks against multiple targets.",

"Activation conditions and the precise nature of its energy remain unknown."
    ],
  },
{
  id: "NNC02-002", name: "The Tianshang Star", division: "faction", subdivision: "syndicates",
    kind: "weapons", type: "Weapon", issuer: "The Pinky", owner: "Not documented",
      summary: "The Tianshang Star is a weapon issued by the Pinky. Its individual holder, construction, appearance, and known effects have not yet been recorded.",
        note: "Faction-Issued / Syndicates / The Pinky. Issue classification confirmed."
},
{
  id: "NNC02-003", name: "The Dihui Star", division: "faction", subdivision: "syndicates",
    kind: "weapons", type: "Weapon", issuer: "The Pinky", owner: "Not documented",
      summary: "The Dihui Star is a weapon issued by the Pinky. Its individual holder, construction, appearance, and known effects have not yet been recorded.",
        note: "Faction-Issued / Syndicates / The Pinky. Issue classification confirmed."
},
{
  id: "NNC02-004", name: "Purple Cloud", division: "original",
    kind: "weapons", type: "Weapon", owner: "Necro",
      summary: "Purple Cloud is an original weapon associated with Necro. Its construction, physical appearance, and capabilities are awaiting a full registry entry.",
        note: "Original gear / Necro. No additional capabilities have been inferred."
},
{
  id: "NNC02-005", name: "The Sword of the Father", division: "original",
    kind: "weapons", type: "Weapon", owner: "Noctis",
      summary: "The Sword of the Father is an original weapon belonging to Noctis. Its appearance, construction history, and abilities remain to be documented.",
        note: "Original gear / Noctis. The title does not by itself establish further backstory."
},
{
  id: "NNC02-006", name: "Yamato", division: "original",
    kind: "weapons", type: "Weapon", owner: "Noctis",
      summary: "Yamato is an original weapon belonging to Noctis. Its appearance, construction history, and abilities remain to be documented.",
        note: "Original gear / Noctis. No properties or external references assumed."
},
{
  id: "NNC02-007", name: "Shattered Purity", division: "original",
    kind: "weapons", type: "Weapon", owner: "Zerachiel",
      summary: "Shattered Purity is an original weapon associated with Zerachiel. Its appearance, origin details, and properties remain unfiled.",
        note: "Original gear / Zerachiel. The record confirms its association, not additional lore."
},
{
  id: "NNC02-008", name: "Zerachiel's Prophecy", division: "original",
    kind: "documents", type: "Document", form: "Document", owner: "Not documented",
      summary: "Zerachiel\'s Prophecy is a document of presently undisclosed contents and properties.",
        note: "Original / Document. Contents, custody, and creation details await confirmation."
},
{
  id: "NNC02-009", name: "Mephista's Memo", division: "original",
    kind: "documents", type: "Document", form: "Document", owner: "Not documented",
      summary: "Mephista\'s Memo is a document whose contents, holder, and effects have not been disclosed.",
        note: "Original / Document. Further details await confirmation."
},
{
  id: "NNC02-010", name: "Unknown Pocket Watch", division: "original",
    kind: "timepieces", type: "Timepiece", form: "Timepiece", owner: "Not documented",
      summary: "The Unknown Pocket Watch is a timepiece whose mechanism, properties, and present holder have not been documented.",
        note: "Original / Timepiece. No special ability has been inferred."
},
{
  id: "NNC02-011", name: "Firefist Office Armor", division: "faction", subdivision: "offices",
    kind: "armor", type: "Armor / Protective Equipment", issuer: "Firefist Office", owner: "Not documented",
      acquisition: "Stolen / Details unfiled",
        summary: "An armor set issued by Firefist Office and subsequently stolen. The issuing office remains Firefist Office; theft circumstances and current custody have not yet been recorded.",
          note: "Faction-Issued / Offices / Firefist Office. Working object designation; appearance and specifications pending."
}
];
inventory.forEach(item => {
  item.formKey = item.form === "Document" ? "documents" : item.form === "Timepiece" ? "timepieces" : null;
  item.issuer ??= "Not faction-issued";
  item.owner ??= "Not documented";
  item.condition ??= "Not documented";
  item.acquisition ??= "Not documented";
  item.properties ??= "Not documented";
});

const divisions = {
  all: {
    title: "All registered objects.", code: "NNC–02 / COMPLETE REGISTER",
    description: "Every known item, organized by provenance and equipment classification. Relics are weapons recovered from the Ruins supposedly beneath the City.",
    axis: "EQUIPMENT CLASS",
    filters: [["all", "All Objects"], ["weapons", "Weapons"], ["relics", "Relics"], ["armor", "Armor"], ["documents", "Documents"], ["timepieces", "Timepieces"], ["tools", "Tools & Devices"]]
  },
  faction: {
    title: "Faction-issued equipment.", code: "NNC–02 / ISSUANCE REGISTRY",
    description: "Items issued by associations, offices, syndicates, and other factions. The Pinky issues three registered weapons; Firefist Office issues one armor set.",
    axis: "ISSUING BODY",
    filters: [["all", "All Issuers"], ["associations", "Associations"], ["offices", "Offices"], ["syndicates", "Syndicates"], ["other", "Other Factions"]]
  },
  recovered: {
    title: "Objects reclaimed from ruins.", code: "NNC–02 / RECOVERED MATERIALS",
    description: "Objects recovered from ruins or other sites. Relics specifically refer to weapons recovered from the rarely spoken-of Ruins beneath the City. No recovered items are currently filed.",
    axis: "EQUIPMENT CLASS",
    filters: [["all", "All Recovered"], ["weapons", "Weapons"], ["relics", "Relics"], ["armor", "Armor"], ["documents", "Documents"], ["timepieces", "Timepieces"], ["tools", "Tools & Devices"]]
  },
  original: {
    title: "Independently originated objects.", code: "NNC–02 / ORIGINAL MATERIALS",
    description: "Original weapons, documents, timepieces, armor, and other objects. Ruins-recovered Relics are not classified as original gear.",
    axis: "EQUIPMENT CLASS",
    filters: [["all", "All Originals"], ["weapons", "Weapons"], ["relics", "Relics"], ["documents", "Documents"], ["timepieces", "Timepieces"], ["armor", "Armor"], ["tools", "Tools & Devices"]]
  },
  unfiled: {
    title: "Awaiting provenance.", code: "NNC–02 / UNFILED PROVENANCE",
    description: "Known objects whose provenance has not yet been established. All current entries have now been assigned.",
    axis: "EQUIPMENT CLASS",
    filters: [["all", "All Unclassified"], ["weapons", "Weapons"], ["relics", "Relics"], ["armor", "Armor"], ["documents", "Documents"], ["timepieces", "Timepieces"], ["tools", "Tools & Devices"]]
  }
};
const $ = id => document.getElementById(id);
const elements = {
  tabs: [...document.querySelectorAll(".division-tab")],
  tabBar: $("division-tabs"), registry: document.querySelector(".registry-interface"),
  panel: $("inventory-panel"), subtabs: $("sub-tabs"), caption: $("subtab-caption"),
  wall: $("catalog-wall"), search: $("gear-search"), count: $("visible-count"),
  title: $("inventory-heading"), description: $("inventory-description"), code: $("inventory-code"),
  empty: $("empty-state"), emptyTitle: $("empty-title"), emptyDescription: $("empty-description"),
  reset: $("clear-filters"), dialog: $("inspection-dialog"), close: $("close-inspection"),
  returnButton: $("return-to-catalog")
};
let activeDivision = "all", activeSubtab = "all", lastOpener = null;
function node(tag, cls, value) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (value !== undefined) e.textContent = value;
  return e;
}
function put(id, value) { const e = $(id); if (e) e.textContent = value; }
function renderProperties(value) {
  const target = $("detail-properties");
  if (!target) return;
  if (Array.isArray(value)) {
    const list = node("ul", "property-list");
    value.forEach(property => list.appendChild(node("li", "", property)));
    target.replaceChildren(list);
  } else {
    target.textContent = value ?? "Not documented";
  }
}
function pad(n) { return String(n).padStart(2, "0"); }
function typeLabel(item) { return item.form ? item.type + " / " + item.form : item.type; }
function classification(item) {
  return { faction: "FACTION-ISSUED", recovered: "RECOVERED OBJECT", original: "ORIGINAL GEAR", unfiled: "UNFILED ORIGIN" }[item.division];
}
function provenance(item) {
  if (item.division === "faction") return "Faction-Issued / " + (item.subdivision === "syndicates" ? "Syndicates" : "Offices");
  return { recovered: "Recovered Object", original: "Original Gear", unfiled: "Unclassified / Pending review" }[item.division];
}
function cardFor(item) {
  const card = node("button", "gear-card");
  card.type = "button";
  card.dataset.division = item.division;
  card.dataset.itemId = item.id;
  card.setAttribute("aria-label", "Inspect " + item.name + " — " + typeLabel(item));
  const header = node("div", "card-topline");
  header.append(node("span", "card-id", item.id), node("span", "card-origin", classification(item)));
  card.appendChild(header);
  const exhibit = node("div", "card-exhibit");
  exhibit.setAttribute("aria-hidden", "true");
  const empty = node("div", "card-empty");
  empty.append(node("span", "card-empty-icon", "◇"), node("span", "card-image-label", "IMAGE NOT ON FILE"), node("span", "card-image-status", "RECORD AWAITING ARTWORK"));
  exhibit.appendChild(empty);
  card.appendChild(exhibit);
  const plate = node("div", "card-plate"), type = node("div", "card-type");
  type.append(node("span", "", typeLabel(item).toUpperCase()), node("span", "card-mark", "✳"));
  plate.append(type, node("h4", "", item.name));
  const bottom = node("div", "card-footline");
  const caption = item.division === "faction" ? "ISSUER / " + item.issuer :
    item.division === "recovered" ? "RECOVERY DETAILS ON FILE" :
      item.division === "original" ? (item.owner === "Not documented" ? "ORIGINAL / " + item.type.toUpperCase() : "ASSOCIATED WITH / " + item.owner) : "PROVENANCE PENDING";
  bottom.append(node("span", "", caption), node("span", "inspect-arrow", "↗"));
  plate.appendChild(bottom);
  card.appendChild(plate);
  card.addEventListener("click", () => inspect(item, card));
  return card;
}
function eligible(item, q) {
  if (activeDivision !== "all" && item.division !== activeDivision) return false;
  if (activeSubtab !== "all") {
    if (activeDivision === "faction") {
      if (item.subdivision !== activeSubtab) return false;
    } else if (["documents", "timepieces"].includes(activeSubtab)) {
      if (item.formKey !== activeSubtab) return false;
    } else if (item.kind !== activeSubtab) return false;
  }
  if (!q) return true;
  return [item.name, item.id, item.type, item.form, item.issuer, item.owner, item.division, item.subdivision, item.kind, item.summary, item.note]
    .filter(Boolean).some(s => s.toLowerCase().includes(q));
}
function render() {
  const query = elements.search.value.trim().toLowerCase();
  const matches = inventory.filter(item => eligible(item, query));
  elements.wall.replaceChildren(...matches.map(cardFor));
  elements.count.textContent = pad(matches.length);
  elements.empty.hidden = matches.length > 0;
  elements.subtabs.querySelectorAll(".sub-tab").forEach(b => {
    b.setAttribute("aria-pressed", String(b.dataset.subtab === activeSubtab));
  });
  if (!matches.length) {
    elements.emptyTitle.textContent = query ? "No matching object records." : "Nothing filed here. Yet.";
    elements.emptyDescription.textContent = query
      ? "Try a different search or browse another subdivision."
      : "No records have been assigned to this subdivision yet. No fictional filler objects have been created.";
  }
}
function drawSubtabs() {
  elements.subtabs.replaceChildren();
  for (const [id, name] of divisions[activeDivision].filters) {
    const button = node("button", "sub-tab", name);
    button.type = "button"; button.dataset.subtab = id;
    button.setAttribute("aria-pressed", String(id === activeSubtab));
    button.addEventListener("click", () => { activeSubtab = id; render(); });
    elements.subtabs.appendChild(button);
  }
}
function switchDivision(division, focus = false) {
  if (!divisions[division]) return;
  activeDivision = division; activeSubtab = "all";
  elements.registry.dataset.division = division;
  elements.tabs.forEach(t => {
    const yes = t.dataset.division === division;
    t.classList.toggle("is-active", yes);
    t.setAttribute("aria-selected", String(yes));
    t.tabIndex = yes ? 0 : -1;
    if (yes && focus) t.focus({ preventScroll: true });
  });
  elements.panel.setAttribute("aria-labelledby", "division-" + division);
  const config = divisions[division];
  elements.title.textContent = config.title;
  elements.description.textContent = config.description;
  elements.code.textContent = config.code;
  elements.caption.textContent = "SECONDARY INDEX — " + config.axis;
  drawSubtabs(); render();
}
function inspect(item, opener) {
  const d = elements.dialog;
  if (!d || typeof d.showModal !== "function") return;
  lastOpener = opener;
  put("inspection-file-top", item.id);
  put("inspection-section", classification(item) + " / " + item.id);
  put("inspection-title", item.name);
  put("inspection-classification", classification(item) + " / " + typeLabel(item).toUpperCase());
  put("detail-type", typeLabel(item));
  put("detail-provenance", provenance(item));
  put("detail-issuer", item.issuer);
  put("detail-code", item.id);
  put("detail-holder", item.owner);
  put("detail-condition", item.condition);
  put("detail-acquisition", item.acquisition);
  renderProperties(item.properties);
  put("stage-number", item.id.split("-").pop());
  put("stage-caption-name", item.name.toUpperCase());
  put("inspection-summary", item.summary);
  put("inspection-note", item.note);
  d.dataset.division = item.division;
  d.showModal();
  document.body.classList.add("inspection-open");
  elements.close.focus({ preventScroll: true });
}
function closeInspect() { if (elements.dialog && elements.dialog.open) elements.dialog.close(); }
elements.tabs.forEach(t => t.addEventListener("click", () => switchDivision(t.dataset.division)));
elements.tabBar.addEventListener("keydown", event => {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  const i = elements.tabs.indexOf(document.activeElement);
  if (i < 0) return;
  event.preventDefault();
  let next = i;
  if (event.key === "ArrowRight") next = (i + 1) % elements.tabs.length;
  if (event.key === "ArrowLeft") next = (i - 1 + elements.tabs.length) % elements.tabs.length;
  if (event.key === "Home") next = 0;
  if (event.key === "End") next = elements.tabs.length - 1;
  switchDivision(elements.tabs[next].dataset.division, true);
});
elements.search.addEventListener("input", render);
elements.reset.addEventListener("click", () => {
  elements.search.value = "";
  switchDivision("all");
  elements.tabs[0].focus({ preventScroll: true });
});
elements.close.addEventListener("click", closeInspect);
elements.returnButton.addEventListener("click", closeInspect);
elements.dialog.addEventListener("click", event => {
  if (event.target === elements.dialog) closeInspect();
});
elements.dialog.addEventListener("close", () => {
  document.body.classList.remove("inspection-open");
  if (lastOpener && lastOpener.isConnected) lastOpener.focus({ preventScroll: true });
});
function countAll() {
  put("total-count", pad(inventory.length));
  put("unfiled-count", pad(inventory.filter(item => item.division === "unfiled").length));
  elements.tabs.forEach(tab => {
    const key = tab.dataset.division;
    const count = key === "all" ? inventory.length : inventory.filter(item => item.division === key).length;
    const number = tab.querySelector("b");
    if (number) number.textContent = pad(count);
  });
}
countAll();
switchDivision("all");

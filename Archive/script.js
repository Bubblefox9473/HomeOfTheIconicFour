/* LC:NN register: native navigation remains unchanged. */
(() => {
  const search=document.getElementById("record-search");
  const items=[...document.querySelectorAll(".searchable")];
  const count=document.getElementById("result-count");
  const empty=document.getElementById("empty-state");
  const groups=[[".principal-section",".principal-record"],[".associated-section",".associated-record"]];
  if(!search || !count || !empty)return;
  search.addEventListener("input",()=>{
    const term=search.value.trim().toLocaleLowerCase();
    let visible=0;
    items.forEach(item=>{
      const match=!term || (item.dataset.search || item.textContent).toLocaleLowerCase().includes(term);
      item.hidden=!match;
      if(match)visible++;
    });
    groups.forEach(([section,selector])=>{
      const container=document.querySelector(section);
      if(container)container.hidden=![...container.querySelectorAll(selector)].some(item=>!item.hidden);
    });
    count.textContent=visible+(visible===1?" RECORD":" RECORDS");
    empty.hidden=visible!==0;
  });
})();


/* The Constellation / LC:NN
   Pale spokes show catalogue membership. Colored links show documented personal
   relationships only; no ties are inferred from shared archive membership. */
(() => {
  const host = document.getElementById("constellation-graph");
  if (!host) return;

  const fallback = document.getElementById("constellation-fallback");
  if (typeof window.cytoscape !== "function") {
    if (fallback) fallback.hidden = false;
    host.hidden = true;
    return;
  }

  const personnel = [
    {id:"mephista",label:"Mephista",group:"primary",number:"01",code:"PR—0?",color:"#c98581",status:"SEALED / DATA CORRUPT",summary:"Primary personnel record. Identity details are restricted; this dossier cannot presently be opened."},
    {id:"noctis",label:"Noctis",group:"primary",number:"02",code:"PR—02",color:"#a0b6c7",status:"ON FILE",href:"noctis/"},
    {id:"necro",label:"Necro",group:"primary",number:"03",code:"PR—03",color:"#c7a2ea",status:"ON FILE",href:"necro/"},
    {id:"dark",label:"Dark",group:"primary",number:"04",code:"PR—04",color:"#99c8b7",status:"ON FILE",href:"dark/",summary:"A distant but trusted companion to the two brothers, now connected to Mephista largely through work. His only other confirmed personal connection is a hostile one with Zerachiel."},
    {id:"zen",label:"Zen",group:"associated",number:"05",color:"#f2f2f2",href:"zen/"},
    {id:"astra",label:"Astra",group:"associated",number:"06",color:"#8ccfff",href:"astra/"},
    {id:"zerachiel",label:"Zerachiel",group:"associated",number:"07",color:"#d8f2c8",href:"zerachiel/",summary:"Currently in Aethereus. Encounters with Dark have shown hostility, but neither side has revealed the cause."},
    {id:"shade",label:"Shade",group:"associated",number:"08",color:"#819de1",href:"shade/"},
    {id:"lyra",label:"Lyra",group:"associated",number:"09",color:"#d8f6ff",href:"lyra/"},
    {id:"draco",label:"Draco",group:"associated",number:"10",color:"#ff8a1c",href:"draco/"},
    {id:"nexus",label:"Nexus",group:"associated",number:"11",color:"#ff3cff",href:"nexus/"},
    {id:"exe",label:"EXE / Remiel",group:"associated",number:"12",color:"#87ec75",href:"exe/"},
    {id:"velkan",label:"Velkan",group:"associated",number:"13",color:"#ca795a",href:"velkan/"}
  ];

  const positions = {"register":{x:0,y:0}};
  const primary = personnel.filter(person => person.group === "primary");
  const associated = personnel.filter(person => person.group === "associated");
  primary.forEach((person,index) => {
    const angle = -Math.PI/2 + index*Math.PI/2;
    positions[person.id] = {x:155*Math.cos(angle),y:155*Math.sin(angle)};
  });
  associated.forEach((person,index) => {
    const angle = -Math.PI/2 + index*2*Math.PI/associated.length;
    positions[person.id] = {x:328*Math.cos(angle),y:328*Math.sin(angle)};
  });

  const nodes = [
    {data:{id:"register",label:"LC:NN",kind:"hub",group:"hub"},position:positions.register},
    ...personnel.map(person => ({
      data:{id:person.id,label:person.label,kind:"person",group:person.group,color:person.color},
      position:positions[person.id]
    }))
  ];
  // Confirmed relationships. Other character pairs remain deliberately unlinked.
  // Any ending spoilers are excluded from the public-facing relationship inspector.
  const relationships = [
    {id:"mephista-necro",source:"mephista",target:"necro",tone:"family",
     title:"Mephista ↔ Necro",category:"FOUND FAMILY / MATERNAL AFFECTION",
     reference:"MEPHISTA → MATERNAL CARE / NECRO → ADMIRATION",
     description:"Mephista views Necro with almost parental affection. Necro deeply respects and looks up to her, though he does not necessarily understand their bond in the same maternal terms."},
    {id:"noctis-necro",source:"noctis",target:"necro",tone:"family",
     title:"Noctis ↔ Necro",category:"FAMILY / BROTHERS",
     reference:"OLDER BROTHER / YOUNGER BROTHER",
     description:"Noctis is Necro's older brother. They are extremely close, watching over each other in battle. Outside it, Noctis tries to guide Necro toward more proper conduct."},
    {id:"mephista-noctis",source:"mephista",target:"noctis",tone:"complex",
     title:"Mephista ↔ Noctis",category:"DEEPLY ROOTED TRUST / COMPLICATED BOND",
     reference:"HARDSHIP / ENDURING LOYALTY",
     description:"Hardships forged their unusually close bond. Noctis trusts Mephista with his life; she treasures their friendship enough to fear anything that might place it at risk."},
    {id:"necro-dark",source:"necro",target:"dark",tone:"friend",
     title:"Necro ↔ Dark",category:"TRUSTED FRIENDS / DISTANT COMPANIONS",
     reference:"FRIENDSHIP / INFREQUENT CONTACT",
     description:"Necro and Dark remain trusted friends, although Dark's choice to stay away from the others limits their time together."},
    {id:"noctis-dark",source:"noctis",target:"dark",tone:"friend",
     title:"Noctis ↔ Dark",category:"TRUSTED FRIENDS / DISTANT COMPANIONS",
     reference:"FRIENDSHIP / INFREQUENT CONTACT",
     description:"Noctis and Dark share a trusted friendship, much like Dark's bond with Necro. Distance has limited their contact, but not severed the connection."},
    {id:"mephista-dark",source:"mephista",target:"dark",tone:"fractured",
     title:"Mephista ↔ Dark",category:"FRACTURED TRUST / PROFESSIONAL CONTACT",
     reference:"FORMER FRIENDS / SOULBOUND AUTHORITY",
     description:"Once close, they have been driven apart by Mephista's misuse of her ownership of Dark's soul. He owes his life to her, but her coercion destroyed their personal closeness. She regrets it without seeking to repair the damage, and they now interact almost exclusively for work."},
    {id:"dark-zerachiel",source:"dark",target:"zerachiel",tone:"hostile",
     title:"Dark ↔ Zerachiel",category:"ENEMIES / UNEXPLAINED HOSTILITY",
     reference:"CAUSE UNKNOWN / REPORTS INCOMPLETE",
     description:"Dark and Zerachiel have shown clear signs of mutual hatred whenever their paths cross. Dark withholds information, and Zerachiel is currently in Aethereus, leaving no account from his side. The origin of their hostility remains unknown."}
  ];

  const edges = [
    ...personnel.map(person => ({
      data:{id:"register-"+person.id,source:"register",target:person.id,kind:"index",group:person.group}
    })),
    ...relationships.map(relationship => ({
      data:{id:relationship.id,source:relationship.source,target:relationship.target,
        kind:"relationship",tone:relationship.tone}
    }))
  ];

  const cy = window.cytoscape({
    container:host,
    elements:{nodes,edges},
    layout:{name:"preset",fit:true,padding:65},
    minZoom:0.33,maxZoom:2.8,wheelSensitivity:0.22,
    boxSelectionEnabled:false,
    style:[
      {selector:"node",style:{
        "label":"data(label)","color":"#e9d6cb","font-family":"DM Mono, monospace",
        "font-size":12,"font-weight":500,"text-valign":"bottom","text-halign":"center",
        "text-margin-y":11,"text-outline-color":"#100d0c","text-outline-width":3,
        "background-color":"data(color)","background-opacity":0.2,
        "border-color":"data(color)","border-width":2.5,"width":45,"height":45,
        "overlay-opacity":0,"transition-property":"opacity, background-opacity, border-width",
        "transition-duration":170
      }},
      {selector:'node[group = "primary"]',style:{
        "width":65,"height":65,"border-width":3.5,"background-opacity":0.24,
        "font-size":13,"text-margin-y":12
      }},
      {selector:'node[kind = "hub"]',style:{
        "shape":"hexagon","width":94,"height":94,"label":"LC:NN",
        "color":"#120d0c","font-size":19,"font-weight":700,
        "text-valign":"center","text-margin-y":0,"text-outline-width":0,
        "background-color":"#ddbaa2","background-opacity":1,
        "border-color":"#ffe2c5","border-width":3
      }},
      {selector:"edge",style:{
        "width":1.5,"line-color":"#a58a82","opacity":0.48,
        "curve-style":"straight","line-cap":"round","overlay-opacity":0,
        "transition-property":"opacity, width, line-color","transition-duration":170
      }},
      {selector:'edge[kind = "index"]',style:{
        "line-style":"dotted","width":1,"opacity":0.20,"z-index":1
      }},
      {selector:'edge[kind = "relationship"]',style:{
        "width":3.5,"line-color":"#b4ccdd","opacity":0.87,"z-index":12
      }},
      {selector:'edge[tone = "family"]',style:{"line-color":"#8dbff0"}},
      {selector:'edge[tone = "friend"]',style:{"line-color":"#90d7a8"}},
      {selector:'edge[tone = "complex"]',style:{"line-color":"#cc9cda"}},
      {selector:'edge[tone = "fractured"]',style:{
        "line-color":"#d2a48e","line-style":"dashed","line-dash-pattern":[9,5]
      }},
      {selector:'edge[tone = "hostile"]',style:{
        "line-color":"#ff6575","width":4.5,"opacity":1,"z-index":25,
        "curve-style":"segments",
        "segment-weights":[0.14,0.26,0.38,0.50,0.62,0.74,0.86],
        "segment-distances":[-31,31,-31,31,-31,31,-31]
      }},
      {selector:".is-muted",style:{"opacity":0.10}},
      {selector:"node.is-focus",style:{
        "opacity":1,"background-opacity":0.56,"border-width":5
      }},
      {selector:"edge.is-focus",style:{
        "opacity":1,"width":4.5
      }},
      {selector:'edge[tone = "hostile"].is-focus',style:{
        "line-color":"#ff6575","width":6,"opacity":1
      }},
      {selector:"node.hovered",style:{
        "background-opacity":0.62,"border-width":5
      }},
      {selector:".is-hidden",style:{"display":"none"}}
    ]
  });

  const type = document.getElementById("constellation-detail-type");
  const name = document.getElementById("constellation-detail-name");
  const meta = document.getElementById("constellation-detail-meta");
  const copy = document.getElementById("constellation-detail-copy");
  const link = document.getElementById("constellation-open-file");
  const filterButtons = [...document.querySelectorAll("[data-constellation-filter]")];
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let filter = "all";

  function inspect({category,title,reference,description,href}) {
    type.textContent = category;
    name.textContent = title;
    meta.textContent = reference;
    copy.textContent = description;
    link.hidden = !href;
    if (href) link.href = href;
    else link.removeAttribute("href");
  }

  function overview() {
    cy.elements().removeClass("is-muted is-focus");
    inspect({
      category:"NETWORK / OVERVIEW",
      title:"Select a signal.",
      reference:"LC:NN / 13 PERSONNEL RECORDS",
      description:"Colored lines represent established personal relationships; the faint spokes mark archive registration. Select a node or line to inspect it. Drag to rearrange the map, or scroll and pinch to explore.",
      href:null
    });
  }

  function highlight(elements) {
    cy.elements().removeClass("is-focus is-muted");
    cy.elements(":visible").addClass("is-muted");
    elements.removeClass("is-muted").addClass("is-focus");
  }

  cy.on("tap","node",event => {
    const node = event.target;
    const related = node.union(node.connectedEdges(":visible"));
    highlight(related.union(related.connectedNodes(":visible")));
    if (node.id() === "register") {
      inspect({
        category:"ARCHIVE / PERSONNEL DIVISION",
        title:"NetherNova",
        reference:"LC:NN / CENTRAL REGISTER",
        description:"This index connects the four primary files and nine associated records with faint catalogue spokes. Colored lines between people show only the personal ties already documented.",
        href:null
      });
      return;
    }
    const person = personnel.find(entry => entry.id === node.id());
    if (!person) return;
    inspect({
      category:person.group === "primary" ? "PRIMARY / PERSONNEL" : "ASSOCIATED / PERSONNEL",
      title:person.label,
      reference:(person.code || "REGISTER—"+person.number)+" / "+(person.status || "ON FILE"),
      description:person.summary || (person.group === "primary"
        ? "One of the four central NetherNova personnel records. Select a colored connection to inspect any documented relationship."
        : "An associated personnel file within the NetherNova register. No personal ties are assumed beyond those explicitly connected."),
      href:person.href || null
    });
  });

  cy.on("tap","edge",event => {
    const edge = event.target;
    const linked = edge.connectedNodes();
    highlight(linked.union(edge));
    const relationship = relationships.find(entry => entry.id === edge.id());
    if (relationship) {
      inspect({
        category:relationship.category,
        title:relationship.title,
        reference:relationship.reference,
        description:relationship.description,
        href:null
      });
      return;
    }
    const person = personnel.find(entry => entry.id === edge.target().id());
    if (!person) return;
    inspect({
      category:"CATALOGUE / CONNECTION",
      title:"Registered affiliation",
      reference:"LC:NN ↔ "+person.label.toUpperCase(),
      description:person.label+" is listed under "+(person.group === "primary" ? "the four primary personnel files" : "associated personnel")+". This connection records archive membership only; it does not imply a personal bond.",
      href:person.href || null
    });
  });

  cy.on("tap",event => {if(event.target === cy) overview();});
  cy.on("mouseover","node",event => event.target.addClass("hovered"));
  cy.on("mouseout","node",event => event.target.removeClass("hovered"));

  function fitGraph() {
    cy.resize();
    cy.fit(cy.elements(":visible"),window.innerWidth < 650 ? 35 : 62);
  }

  filterButtons.forEach(button => button.addEventListener("click",() => {
    filter = button.dataset.constellationFilter;
    filterButtons.forEach(item => item.setAttribute("aria-pressed",String(item===button)));
    cy.nodes('[kind = "person"]').forEach(node =>
      node.toggleClass("is-hidden",filter !== "all" && node.data("group") !== filter)
    );
    cy.edges().forEach(edge =>
      edge.toggleClass("is-hidden",
        edge.source().hasClass("is-hidden") || edge.target().hasClass("is-hidden"))
    );
    overview();
    fitGraph();
  }));

  document.querySelectorAll("[data-constellation-action]").forEach(button => {
    button.addEventListener("click",() => {
      const action = button.dataset.constellationAction;
      if(action === "fit"){fitGraph();return;}
      if(action === "reset"){
        cy.nodes().positions(node => ({...positions[node.id()]}));
        overview();
        fitGraph();
        return;
      }
      const factor = action === "zoom-in" ? 1.3 : 1/1.3;
      cy.zoom({
        level:Math.max(cy.minZoom(),Math.min(cy.maxZoom(),cy.zoom()*factor)),
        renderedPosition:{x:cy.width()/2,y:cy.height()/2}
      });
    });
  });

  if(typeof ResizeObserver !== "undefined"){
    const observer = new ResizeObserver(() => {cy.resize();});
    observer.observe(host);
  } else {
    window.addEventListener("resize",() => cy.resize());
  }
  overview();
  if(!reduceMotion) cy.elements().addClass("constellation-ready");
})();

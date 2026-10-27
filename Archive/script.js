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
   Lines represent placement in the personnel register, not unconfirmed story relationships.
   Add documented personal connections here once their lore is established. */
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
    {id:"dark",label:"Dark",group:"primary",number:"04",code:"PR—04",color:"#99c8b7",status:"ON FILE",href:"dark/"},
    {id:"zen",label:"Zen",group:"associated",number:"05",color:"#f2f2f2",href:"zen/"},
    {id:"astra",label:"Astra",group:"associated",number:"06",color:"#8ccfff",href:"astra/"},
    {id:"zerachiel",label:"Zerachiel",group:"associated",number:"07",color:"#d8f2c8",href:"zerachiel/"},
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
  const edges = personnel.map(person => ({
    data:{id:"register-"+person.id,source:"register",target:person.id,group:person.group}
  }));

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
      {selector:'edge[group = "associated"]',style:{
        "line-style":"dashed","line-dash-pattern":[4,6],"opacity":0.36
      }},
      {selector:".is-muted",style:{"opacity":0.12}},
      {selector:"node.is-focus",style:{
        "opacity":1,"background-opacity":0.56,"border-width":5
      }},
      {selector:"edge.is-focus",style:{
        "opacity":0.95,"line-color":"#ebbea3","width":3
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
      description:"Select a node to inspect its personnel record. Select a line to see why two points are connected. Drag to rearrange the map, or scroll and pinch to explore.",
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
        description:"The central personnel index connects the four primary files and nine associated records. These paths show archival classification, not confirmed personal relationships.",
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
        ? "One of the four central NetherNova personnel records. Specific relationships have not yet been documented in the network."
        : "An associated personnel file within the NetherNova register. Individual relationships will appear here once documented."),
      href:person.href || null
    });
  });

  cy.on("tap","edge",event => {
    const edge = event.target;
    const linked = edge.connectedNodes();
    highlight(linked.union(edge));
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
      edge.toggleClass("is-hidden",filter !== "all" && edge.data("group") !== filter)
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

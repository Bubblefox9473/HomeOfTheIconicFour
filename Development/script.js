/* NNC-03: independently browsable filmstrips. No default selected reel. */
"use strict";
const mainTitles=[
 ["I","The Outcast"],["II","The Unloving"],["III","The Unconfronting"],
 ["IV","The Unchanging"],["V","The Evil Defining"],["VI","The Heartbreaking"],
 ["VII","The Dream Ending & The Unshining"],["VIII","The Surrendered Witnessing"],
 ["IX","The Unsevering"],["X","The Gaze Bearing"]
];
const intervalloTitles=[
 ["I","Hell's Chicken"],["II","S.E.A."],
 ["III-1","Miracle in District 20"],["III-2","Yield My Flesh to Claim Their Bones"],
 ["IV-1","Timekilling Time"],["IV-2","Murder on the WARP Express"],
 ["V-1","LCB Regular Check-up"],["V-2","Nocturnal Sweeping"],
 ["VI","Spring Cultivation"],["VII-1","Twining Threads"],
 ["VII-2","Mnestic Experience"]
];
const toMain=([number,title])=>{
 const sharedStory=number==="VII";
 return {
  id:"canto-"+number.toLowerCase(),number,title,variant:sharedStory?"hybrid":"canto",
  classification:sharedStory?"CANTO / OFFICIAL + ORIGINAL":"CANTO / MAIN STORY",
  category:sharedStory?"MAIN-STORY CANTO + ORIGINAL STORY":"MAIN-STORY CANTO",
  source:sharedStory?"LIMBUS COMPANY + NETHER NOVA ORIGINAL":"OFFICIAL LIMBUS COMPANY",
  code:"LC-CANTO-"+number,
  status:sharedStory?"SHARED STORY / MATERIAL PENDING":"REFERENCE ENTRY / NO FILE ATTACHED",
  strap:sharedStory?"OFFICIAL + ORIGINAL":"OFFICIAL MAIN NARRATIVE",
  description:sharedStory
   ?"Canto VII — "+title+". Alongside the Limbus Company story, Necro shares part of his own original narrative within this Canto, making this a combined official and NetherNova original entry."
   :"Canto "+number+" — "+title+". This is an official Limbus Company main-story chapter. The Film Department has reserved its record for future scene documentation, production notes, and associated material.",
  note:sharedStory
   ?"Necro's original contribution is only a partial story shared within Canto VII; it is not a separate official Project Moon Canto. Production materials have not yet been attached."
   :"The official story title is preserved as a reference. No NetherNova production file has been attached yet."
 };
};
const toIntervallo=([number,title])=>({
 id:"intervallo-"+number.toLowerCase(),number,title,variant:"intervallo",
 classification:"INTERVALLO / BETWEEN CANTOS",category:"INTERVALLO",
 source:"OFFICIAL LIMBUS COMPANY",code:"LC-INTERVALLO-"+number,
 status:"REFERENCE ENTRY / NO FILE ATTACHED",strap:"OFFICIAL INTERVALLO",
 description:"Intervallo "+number+" — "+title+". This is an official Limbus Company between-Canto story. The Film Department has reserved its catalogue entry for future production material.",
 note:"The official story title is preserved as a reference. No NetherNova production file has been attached yet."
});
const mephista={
 id:"mephista-9-5-2",number:"9.5–2",title:"The Unbecoming",variant:"original",
 classification:"INTERVALLO / NARRATIVE BRIDGE",
 category:"PLOT-RELEVANT ORIGINAL INTERVALLO",
 source:"NETHER NOVA ORIGINAL CONTINUITY",
 code:"NNC-03-9.5-2",status:"ORIGINAL RECORD / MATERIAL PENDING",
 strap:"BETWEEN CANTO IX & X",
 description:"Mephista's Canto carries the designation 9.5-2. Though numbered as an Intervallo, this original story is an important part of NetherNova's main narrative and belongs directly between Canto IX and Canto X.",
 note:"One record, two positions: part of the main narrative chronology and cross-indexed under Intervallos. Not an official Project Moon story."
};
const necro={
 id:"necro-9-5-3",number:"9.5–3",title:"Genesis: Concordia",variant:"original",
 classification:"INTERVALLO / NARRATIVE BRIDGE",
 category:"PLOT-RELEVANT ORIGINAL INTERVALLO",
 source:"NETHER NOVA ORIGINAL CONTINUITY",
 code:"NNC-03-9.5-3",status:"ORIGINAL RECORD / MATERIAL PENDING",
 strap:"BETWEEN CANTO IX & X",
 description:"Necro's Canto, Genesis: Concordia, carries the designation 9.5-3. It follows Mephista's 9.5-2 story and precedes Canto X in NetherNova's main narrative chronology.",
 note:"Cross-indexed as an original story under both Cantos and Intervallos. Not an official Project Moon story; production material has not yet been attached."
};
const main=mainTitles.map(toMain).flatMap(r=>r.number==="X"?[mephista,necro,r]:[r]);
const inter=[...intervalloTitles.map(toIntervallo),mephista,necro];
const all=new Map([...main,...inter].map(r=>[r.id,r]));
const motion=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth";

function add(parent,tag,cls,value){
 const node=document.createElement(tag);
 if(cls)node.className=cls;
 if(value!==undefined)node.textContent=value;
 parent.appendChild(node);
 return node;
}
function buildCard(record){
 const button=document.createElement("button");
 button.type="button";
 button.className="reel-card reel-card--"+record.variant;
 button.dataset.recordId=record.id;
 button.setAttribute("aria-pressed","false");
 button.setAttribute("aria-label","Inspect "+record.classification+": "+record.title);
 const head=add(button,"span","reel-card-top");
 add(head,"span","card-code",record.code);
 add(head,"span","card-class",record.variant==="original"?"ORIGINAL":record.variant==="hybrid"?"OFFICIAL + ORIGINAL":"REFERENCE");
 add(button,"span","reel-card-number",record.number);
 add(button,"span","reel-card-title",record.title);
 add(button,"span","reel-card-rule");
 const foot=add(button,"span","reel-card-bottom");
 add(foot,"span","",record.strap);
 add(foot,"span","","↗");
 button.addEventListener("click",()=>inspect(record,button));
 return button;
}
function populate(trackId,records,countId){
 const track=document.getElementById(trackId);
 if(!track)return;
 track.replaceChildren(...records.map(buildCard));
 const count=document.getElementById(countId);
 if(count)count.textContent=String(records.length).padStart(2,"0");
}
/* Render the catalogue without ever selecting an entry or scrolling it. */
populate("cantos-track",main,"cantos-count");
populate("intervallos-track",inter,"intervallos-count");

const viewer=document.getElementById("projector");
const glass=document.getElementById("screen-glass");
const screen=document.getElementById("screen-content");
const state=document.getElementById("inspection-state");
const back=document.getElementById("back-to-reel");
let lastSection=null,lastButton=null;
function write(id,value){
 const target=document.getElementById(id);
 if(target)target.textContent=value;
}
function inspect(record,button){
 if(!all.has(record.id)||!viewer||!screen||!glass||!state)return;
 document.querySelectorAll(".reel-card").forEach(card=>{
  card.setAttribute("aria-pressed",String(card.dataset.recordId===record.id));
 });
 lastSection=button.closest(".reel-section");
 lastButton=button;
 const original=record.variant==="original";
 glass.classList.toggle("is-original",original);
 screen.classList.add("is-loaded");
 screen.replaceChildren();
 add(screen,"span","loaded-kind",original?"NETHER NOVA / ORIGINAL CONTINUITY":record.variant==="hybrid"?"LIMBUS COMPANY + NETHER NOVA / SHARED STORY":"LIMBUS COMPANY / OFFICIAL STORY");
 add(screen,"span","loaded-number",record.number);
 add(screen,"strong","loaded-title",record.title);
 add(screen,"span","loaded-rule");
 add(screen,"span","loaded-tag",record.strap);
 write("screen-id-bottom",record.code);
 write("record-title",record.title);
 write("record-description",record.description);
 write("record-id",record.code);
 write("record-category",record.category);
 write("record-source",record.source);
 write("record-status",record.status);
 write("record-note",record.note);
 write("file-state","PRODUCTION FILE NOT YET ATTACHED");
 state.replaceChildren();
 const lamp=add(state,"i","state-light");
 lamp.setAttribute("aria-hidden","true");
 state.appendChild(document.createTextNode(" RECORD LOADED / "+record.number));
 state.classList.add("is-loaded");
 if(back)back.hidden=false;
 viewer.scrollIntoView({behavior:motion,block:"start"});
}
if(back)back.addEventListener("click",()=>{
 if(lastSection)lastSection.scrollIntoView({behavior:motion,block:"start"});
 if(lastButton)lastButton.focus({preventScroll:true});
});

function refreshArrows(track){
 if(!track)return;
 const maximum=Math.max(0,track.scrollWidth-track.clientWidth);
 document.querySelectorAll('[data-rail-target="'+track.id+'"]').forEach(button=>{
  const left=Number(button.dataset.direction)<0;
  button.disabled=maximum<3||(left?track.scrollLeft<3:track.scrollLeft>=maximum-3);
 });
}
document.querySelectorAll(".rail-arrow").forEach(arrow=>{
 arrow.addEventListener("click",()=>{
  const track=document.getElementById(arrow.dataset.railTarget);
  if(!track)return;
  const first=track.querySelector(".reel-card");
  const distance=first?first.getBoundingClientRect().width+14:240;
  track.scrollBy({left:distance*2*Number(arrow.dataset.direction),behavior:motion});
 });
});
function attachDrag(track){
 let pressed=false,dragged=false,startX=0,startLeft=0,lastDrag=-10000;
 track.addEventListener("pointerdown",e=>{
  if(e.pointerType!=="mouse"||e.button!==0)return;
  pressed=true;dragged=false;startX=e.clientX;startLeft=track.scrollLeft;
 });
 track.addEventListener("pointermove",e=>{
  if(!pressed)return;
  const dx=e.clientX-startX;
  if(Math.abs(dx)>7){
   if(!dragged){
    dragged=true;track.classList.add("is-dragging");
    track.setPointerCapture(e.pointerId);
   }
   track.scrollLeft=startLeft-dx;
  }
 });
 const finish=()=>{
  if(dragged)lastDrag=Date.now();
  pressed=false;dragged=false;
  track.classList.remove("is-dragging");
  refreshArrows(track);
 };
 track.addEventListener("pointerup",finish);
 track.addEventListener("pointercancel",finish);
 track.addEventListener("mouseleave",()=>{if(!dragged)pressed=false;});
 track.addEventListener("click",e=>{
  if(Date.now()-lastDrag<230){e.preventDefault();e.stopImmediatePropagation();}
 },true);
 track.addEventListener("keydown",e=>{
  if(e.target!==track||!["ArrowLeft","ArrowRight"].includes(e.key))return;
  e.preventDefault();
  track.scrollBy({left:e.key==="ArrowLeft"?-235:235,behavior:motion});
 });
 track.addEventListener("scroll",()=>refreshArrows(track),{passive:true});
}
document.querySelectorAll(".reel-track").forEach(attachDrag);
const refreshAll=()=>document.querySelectorAll(".reel-track").forEach(refreshArrows);
window.addEventListener("resize",refreshAll);
window.addEventListener("load",refreshAll);
requestAnimationFrame(refreshAll);

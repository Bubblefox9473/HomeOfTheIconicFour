/* NNC-03: cinematic, independent horizontal story timelines.
   Chronology is navigable without loading a record; the projection room
   activates only when a visitor explicitly selects a story. */
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
const noctis={
 id:"noctis-canto",number:"TBD",title:"Noctis' Canto",variant:"original",
 classification:"CANTO / ORIGINAL CONTINUATION",
 category:"NETHER NOVA ORIGINAL CANTO",
 source:"NETHER NOVA ORIGINAL CONTINUITY",
 code:"NNC-03-NOCTIS",status:"WORKING TITLE / MATERIAL PENDING",
 strap:"AFTER CANTO X",
 description:"Noctis' Canto follows Canto X in NetherNova's main narrative. Its formal title and numerical designation have not yet been established.",
 note:"Working title only. This is a NetherNova original story, not an official Project Moon Canto. Production material has not yet been attached."
};
const main=[...mainTitles.map(toMain).flatMap(r=>r.number==="X"?[mephista,necro,r]:[r]),noctis];
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
const accents={canto:"#d9aa92",intervallo:"#a9bbd6",hybrid:"#d5a4cc",original:"#e9a8cf"};
function buildCard(record,index,total){
 const stop=add(document.createDocumentFragment(),"div","timeline-stop");
 stop.dataset.position=String(index);
 stop.style.setProperty("--entry-accent",accents[record.variant]||accents.canto);
 stop.setAttribute("role","listitem");
 const button=add(stop,"button","reel-card reel-card--"+record.variant);
 button.type="button";
 button.dataset.recordId=record.id;
 button.setAttribute("aria-pressed","false");
 button.setAttribute("aria-label","Inspect "+record.classification+": "+record.title);
 const head=add(button,"span","reel-card-top");
 add(head,"span","card-code",record.code);
 add(head,"span","card-class",record.variant==="original"?"ORIGINAL":record.variant==="hybrid"?"SHARED STORY":"REFERENCE");
 const scene=add(button,"span","reel-card-scene");
 add(scene,"span","scene-orbit").setAttribute("aria-hidden","true");
 add(scene,"span","reel-card-number",record.number);
 add(scene,"span","scene-exposure","EXPOSURE "+String(index+1).padStart(2,"0")+" / "+String(total).padStart(2,"0"));
 add(button,"span","reel-card-title",record.title);
 const foot=add(button,"span","reel-card-bottom");
 add(foot,"span","",record.strap);
 add(foot,"span","","↗");
 const pin=add(stop,"span","timeline-pin");
 pin.setAttribute("aria-hidden","true");
 const pinCode=add(stop,"span","timeline-pin-code","FRAME "+String(index+1).padStart(2,"0"));
 pinCode.setAttribute("aria-hidden","true");
 button.addEventListener("click",()=>inspect(record,button));
 return stop;
}
function populate(trackId,records,countId){
 const track=document.getElementById(trackId);
 if(!track)return;
 const sequence=add(document.createDocumentFragment(),"div","timeline-sequence");
 sequence.setAttribute("role","list");
 sequence.setAttribute("aria-label","Story chronology, earliest to latest");
 records.forEach((record,index)=>sequence.appendChild(buildCard(record,index,records.length)));
 track.replaceChildren(sequence);
 track.dataset.total=String(records.length);
 const count=document.getElementById(countId);
 if(count)count.textContent=String(records.length).padStart(2,"0");
}
/* Preserve chronological cross-listings and keep the projection room idle. */
populate("cantos-track",main,"cantos-count");
populate("intervallos-track",inter,"intervallos-count");

const viewer=document.getElementById("projector");
const glass=document.getElementById("screen-glass");
const screen=document.getElementById("screen-content");
const state=document.getElementById("inspection-state");
const back=document.getElementById("back-to-reel");
const featuredButton=document.getElementById("load-featured");
const returnFeatured=document.getElementById("back-to-featured");
let lastSection=null,lastButton=null;
function write(id,value){
 const target=document.getElementById(id);
 if(target)target.textContent=value;
}
function renderPoster(record,isPreview=false){
 if(!screen||!glass)return;
 const theme=record.id==="mephista-9-5-2"?"unbecoming":
   record.id==="necro-9-5-3"?"genesis":
   record.id==="noctis-canto"?"noctis":
   record.variant==="hybrid"?"shared":
   record.variant==="intervallo"?"intervallo":
   record.variant==="original"?"original":"official";
 glass.className="screen-glass"+(record.variant==="original"?" is-original":"")+(isPreview?" is-featured":" is-screening");
 glass.dataset.posterTheme=theme;
 glass.style.setProperty("--poster-angle",((record.title.length*17)%90-45)+"deg");
 screen.className="screen-content poster-presentation"+(isPreview?" is-preview":" is-loaded");
 screen.replaceChildren();
 const art=add(screen,"div","poster-art");
 art.setAttribute("aria-hidden","true");
 add(art,"span","poster-art-circle");
 add(art,"span","poster-art-ray");
 add(art,"span","poster-art-mark",theme==="genesis"?"✦":theme==="intervallo"?"◇":theme==="noctis"?"☾":"✧");
 add(screen,"span","poster-eyebrow",
   isPreview?"NOW IN PRODUCTION / MEPHISTA'S CANTO":
   record.variant==="original"?"NETHER NOVA / ORIGINAL CONTINUITY":
   record.variant==="hybrid"?"OFFICIAL + ORIGINAL / SHARED STORY":
   record.variant==="intervallo"?"LIMBUS COMPANY / INTERVALLO":"LIMBUS COMPANY / MAIN CANTO");
 add(screen,"span","poster-number",record.number);
 add(screen,"strong","poster-title",record.title);
 const rule=add(screen,"span","poster-rule");
 rule.setAttribute("aria-hidden","true");
 add(screen,"span","poster-footer",
   isPreview?"NETHER NOVA ORIGINAL · TITLE CARD PREVIEW":
   record.strap+" · ARCHIVAL TITLE CARD");
 write("screen-id-bottom",isPreview?"FEATURED PREVIEW · NOT YET LOADED":record.code);
 write("projector-mode",isPreview?"PREVIEW / STANDBY":"RECORD LOADED / "+record.number);
 const footer=glass.closest(".projector-housing")?.querySelector(".projector-housing-bottom");
 if(footer)footer.firstElementChild.textContent=isPreview?"FRAME 01 / FEATURED EXPOSURE":"RECORD / "+record.code;
}
function showFeatured(scroll=false){
 if(!viewer||!glass||!screen||!state)return;
 document.querySelectorAll(".reel-card").forEach(card=>card.setAttribute("aria-pressed","false"));
 lastSection=null;lastButton=null;
 renderPoster(mephista,true);
 write("docket-index","FEATURED PRODUCTION / 9.5–2");
 write("docket-kicker","CURRENTLY IN PRODUCTION");
 write("record-title",mephista.title);
 write("record-description","Mephista's Canto is the Film Department's current featured production. It bridges Canto IX and X in NetherNova's narrative. Load the featured reel to inspect its record, or choose any chapter from the timelines above.");
 write("record-id",mephista.code);
 write("record-category","ORIGINAL INTERVALLO / FEATURED");
 write("record-source","NETHER NOVA ORIGINAL");
 write("record-status","CURRENT PRODUCTION / NOT LOADED");
 write("record-note","Featured title-card artwork is an archival placeholder. Finished illustration and production files can be added as they become available.");
 write("file-state","PRODUCTION FILE NOT YET ATTACHED");
 state.replaceChildren();
 const lamp=add(state,"i","state-light");lamp.setAttribute("aria-hidden","true");
 state.appendChild(document.createTextNode(" STANDBY / FEATURED REEL READY"));
 state.classList.remove("is-loaded");
 if(back)back.hidden=true;
 if(returnFeatured)returnFeatured.hidden=true;
 if(scroll)viewer.scrollIntoView({behavior:motion,block:"start"});
}
function inspect(record,button){
 if(!all.has(record.id)||!viewer||!screen||!glass||!state)return;
 document.querySelectorAll(".reel-card").forEach(card=>{
  card.setAttribute("aria-pressed",String(card.dataset.recordId===record.id));
 });
 const selectedButton=button||document.querySelector('.reel-card[data-record-id="'+record.id+'"]');
 lastSection=selectedButton?selectedButton.closest(".reel-section"):null;
 lastButton=selectedButton;
 renderPoster(record);
 write("docket-index","SELECTED REEL / "+record.code);
 write("docket-kicker",record.id===mephista.id?"CURRENT PRODUCTION / FEATURED":"ARCHIVE RECORD / INSPECTION");
 write("record-title",record.title);
 write("record-description",record.description);
 write("record-id",record.code);
 write("record-category",record.category);
 write("record-source",record.source);
 write("record-status",record.id===mephista.id?"CURRENT PRODUCTION / MATERIAL PENDING":record.status);
 write("record-note",record.note);
 write("file-state","PRODUCTION FILE NOT YET ATTACHED");
 state.replaceChildren();
 const lamp=add(state,"i","state-light");
 lamp.setAttribute("aria-hidden","true");
 state.appendChild(document.createTextNode(" RECORD LOADED / "+record.number));
 state.classList.add("is-loaded");
 if(back)back.hidden=!lastSection;
 if(returnFeatured)returnFeatured.hidden=false;
 viewer.scrollIntoView({behavior:motion,block:"start"});
}
if(featuredButton)featuredButton.addEventListener("click",()=>{
 const button=document.querySelector('#cantos-track .reel-card[data-record-id="mephista-9-5-2"]');
 inspect(mephista,button);
});
if(returnFeatured)returnFeatured.addEventListener("click",()=>showFeatured(true));
if(back)back.addEventListener("click",()=>{
 if(lastSection)lastSection.scrollIntoView({behavior:motion,block:"start"});
 if(lastButton)lastButton.focus({preventScroll:true});
});
showFeatured();

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
  const first=track.querySelector(".timeline-stop");
  const distance=first?first.getBoundingClientRect().width+26:290;
  track.scrollBy({left:distance*Number(arrow.dataset.direction),behavior:motion});
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
 track.addEventListener("scroll",()=>{refreshArrows(track);updateTimeline(track);},{passive:true});
 track.addEventListener("wheel",event=>{
  if(Math.abs(event.deltaX)>Math.abs(event.deltaY)||Math.abs(event.deltaY)<2)return;
  const max=Math.max(0,track.scrollWidth-track.clientWidth);
  if(max<3||(event.deltaY<0&&track.scrollLeft<=1)||(event.deltaY>0&&track.scrollLeft>=max-1))return;
  event.preventDefault();
  track.scrollLeft+=event.deltaY;
 },{passive:false});
}
document.querySelectorAll(".reel-track").forEach(attachDrag);

function updateTimeline(track){
 const total=Number(track.dataset.total||0);
 const maximum=Math.max(0,track.scrollWidth-track.clientWidth);
 const fraction=maximum?Math.max(0,Math.min(1,track.scrollLeft/maximum)):0;
 const meter=document.getElementById(track.id+"-progress");
 const progress=maximum?Math.max(4,fraction*100):total?100:0;
 if(meter)meter.style.width=progress+"%";
 const sequence=track.querySelector(".timeline-sequence");
 if(sequence)sequence.style.setProperty("--travel",progress+"%");
 const readout=document.getElementById(track.id+"-position");
 if(!total){
  if(readout)readout.textContent="00 / 00 · AWAITING STORIES";
  return;
 }
 const stops=[...track.querySelectorAll(".timeline-stop")];
 const focus=track.scrollLeft+track.clientWidth*.5;
 let nearest=0,distance=Infinity;
 stops.forEach((stop,index)=>{
  const middle=stop.offsetLeft+stop.offsetWidth*.5;
  const gap=Math.abs(middle-focus);
  if(gap<distance){distance=gap;nearest=index;}
  stop.classList.toggle("is-current",false);
 });
 if(stops[nearest])stops[nearest].classList.add("is-current");
 if(readout)readout.textContent="FRAME "+String(nearest+1).padStart(2,"0")+" / "+String(total).padStart(2,"0");
}
function initTimelineMotion(){
 const tracks=[...document.querySelectorAll(".reel-track")];
 if(!("IntersectionObserver" in window)||motion==="auto"){
  tracks.forEach(track=>track.querySelectorAll(".timeline-stop").forEach(stop=>stop.classList.add("is-visible")));
  return;
 }
 tracks.forEach(track=>{
  const observer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}});
  },{root:track,rootMargin:"0px 0px 0px 0px",threshold:0.08});
  track.classList.add("has-motion");
  track.querySelectorAll(".timeline-stop").forEach(stop=>observer.observe(stop));
 });
}
const refreshAll=()=>document.querySelectorAll(".reel-track").forEach(track=>{
 refreshArrows(track);
 updateTimeline(track);
});
initTimelineMotion();
window.addEventListener("resize",refreshAll);
window.addEventListener("load",refreshAll);
requestAnimationFrame(refreshAll);

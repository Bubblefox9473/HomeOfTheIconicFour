/* NNC-02 / Gear Registry — provenance and item type are separate fields. */
"use strict";
const weaponNames=[
 "The Tianyi Star","The Tianshang Star","The Dihui Star",
 "Purple Cloud","The Sword of the Father","Yamato","Shattered Purity"
];
const inventory=weaponNames.map((name,i)=>({
 id:"NNC02-"+String(i+1).padStart(3,"0"),name,division:"unfiled",kind:"weapons",
 type:"Weapon",issuer:"Not documented",holder:"Not documented",
 condition:"Not documented",acquisition:"Not documented",properties:"Not documented",
 summary:name+" is named among the initial weapons registered with Department 02. Its appearance, precise origin, holder, and properties have not yet been formally documented.",
 note:"Provenance unfiled. The object's type is known, but no origin or history has been assumed."
}));
inventory.push(
 {id:"NNC02-008",name:"Zerachiel's Prophecy",division:"relic",kind:"unspecified",
  type:"Relic / Form unconfirmed",issuer:"Recovery details unfiled",
  summary:"Zerachiel's Prophecy is included in the recovered relic collection. Its physical form, contents, discovery site, and properties have not been established.",
  note:"The designation does not confirm that the object is a tome or written document."},
 {id:"NNC02-009",name:"Mephista's Memo",division:"relic",kind:"documents",
  type:"Relic / Document",issuer:"Recovery details unfiled",
  summary:"Mephista's Memo is registered as a relic and documentary object. Its contents, place of recovery, and current holder remain undocumented.",
  note:"No memo content has been invented or inferred."},
 {id:"NNC02-010",name:"Unknown Pocket Watch",division:"relic",kind:"artifacts",
  type:"Relic / Timepiece",issuer:"Recovery details unfiled",
  summary:"An unidentified pocket watch in the recovered relic collection. Its mechanism, original owner, recovery location, and unusual properties, if any, are unrecorded.",
  note:"No unusual functions or ownership claims have been assigned."},
 {id:"NNC02-011",name:"Firefist Office Armor",division:"faction",subdivision:"offices",kind:"armor",
  type:"Armor / Protective Equipment",issuer:"Firefist Office",
  acquisition:"Stolen / Details unfiled",
  summary:"An armor or protective-equipment set originally issued by Firefist Office. It was stolen, but its original issuer remains Firefist Office; the circumstances of the theft and current custody are not yet recorded.",
  note:"Working registry designation. Formal product name, appearance, and specifications are pending."}
);
inventory.forEach(item=>{
 item.holder??="Not documented";
 item.condition??="Not documented";
 item.acquisition??="Recovery details pending";
 item.properties??="Not documented";
});
const divisions={
 all:{title:"All registered objects.",code:"NNC–02 / COMPLETE REGISTER",
  description:"Every initial object record, including items whose origins are awaiting confirmation.",
  axis:"OBJECT TYPE",
  filters:[["all","All Objects"],["weapons","Weapons"],["armor","Armor"],["documents","Documents"],["artifacts","Artifacts"],["unspecified","Other / Unspecified"]]},
 faction:{title:"Faction-issued equipment.",code:"NNC–02 / ISSUANCE REGISTRY",
  description:"Equipment issued by associations, offices, syndicates, and other factions. Origin, type, and custody are recorded separately.",
  axis:"ISSUING BODY",
  filters:[["all","All Issuers"],["associations","Associations"],["offices","Offices"],["syndicates","Syndicates"],["other","Other Factions"]]},
 relic:{title:"Things brought back.",code:"NNC–02 / RECOVERED MATERIALS",
  description:"Recovered objects and records. Unknown recovery details are left open.",
  axis:"OBJECT TYPE",
  filters:[["all","All Relics"],["artifacts","Artifacts"],["documents","Documents"],["tomes","Tomes"],["weapons","Weapons"],["armor","Armor"],["unspecified","Other / Unspecified"]]},
 original:{title:"Things made anew.",code:"NNC–02 / INDEPENDENT CREATIONS",
  description:"Independently created equipment, armor, devices, and other objects. No examples have been assigned a confirmed original provenance yet.",
  axis:"OBJECT TYPE",
  filters:[["all","All Creations"],["weapons","Weapons"],["armor","Armor"],["tools","Tools & Devices"],["tomes","Tomes"],["artifacts","Artifacts"]]},
 unfiled:{title:"Awaiting classification.",code:"NNC–02 / UNFILED PROVENANCE",
  description:"Known objects awaiting an established origin. This intake shelf is not another provenance classification.",
  axis:"OBJECT TYPE",
  filters:[["all","All Unclassified"],["weapons","Weapons"],["armor","Armor"],["documents","Documents"],["artifacts","Artifacts"],["unspecified","Other"]]}
};
const $=id=>document.getElementById(id);
const elements={
 tabs:[...document.querySelectorAll(".division-tab")],
 tabBar:$("division-tabs"),registry:document.querySelector(".registry-interface"),
 panel:$("inventory-panel"),subtabs:$("sub-tabs"),caption:$("subtab-caption"),
 wall:$("catalog-wall"),search:$("gear-search"),count:$("visible-count"),
 title:$("inventory-heading"),description:$("inventory-description"),code:$("inventory-code"),
 empty:$("empty-state"),emptyTitle:$("empty-title"),emptyDescription:$("empty-description"),
 reset:$("clear-filters"),dialog:$("inspection-dialog"),close:$("close-inspection"),
 returnButton:$("return-to-catalog")
};
let activeDivision="all",activeSubtab="all",lastOpener=null;
function node(tag,cls,value){
 const e=document.createElement(tag);
 if(cls)e.className=cls;
 if(value!==undefined)e.textContent=value;
 return e;
}
function put(id,value){const e=$(id);if(e)e.textContent=value;}
function pad(n){return String(n).padStart(2,"0");}
function classification(item){
 return {faction:"FACTION-ISSUED",relic:"RECOVERED RELIC",original:"ORIGINAL GEAR",unfiled:"UNFILED ORIGIN"}[item.division];
}
function provenance(item){
 return {faction:"Faction-Issued / Offices",relic:"Recovered Relic",original:"Original Gear",unfiled:"Unclassified / Pending review"}[item.division];
}
function cardFor(item){
 const card=node("button","gear-card");
 card.type="button";
 card.dataset.division=item.division;
 card.dataset.itemId=item.id;
 card.setAttribute("aria-label","Inspect "+item.name+" — "+item.type);
 const header=node("div","card-topline");
 header.append(node("span","card-id",item.id),node("span","card-origin",classification(item)));
 card.appendChild(header);
 const exhibit=node("div","card-exhibit");
 exhibit.setAttribute("aria-hidden","true");
 const empty=node("div","card-empty");
 empty.append(node("span","card-empty-icon","◇"),node("span","card-image-label","IMAGE NOT ON FILE"),node("span","card-image-status","RECORD AWAITING ARTWORK"));
 exhibit.appendChild(empty);
 card.appendChild(exhibit);
 const plate=node("div","card-plate"),type=node("div","card-type");
 type.append(node("span","",item.type.toUpperCase()),node("span","card-mark","✳"));
 plate.append(type,node("h4","",item.name));
 const bottom=node("div","card-footline");
 const caption=item.division==="faction"?"ISSUER / "+item.issuer:
   item.division==="relic"?"RECOVERY DETAILS UNFILED":
   item.division==="original"?"ORIGINAL REGISTRY":"PROVENANCE PENDING";
 bottom.append(node("span","",caption),node("span","inspect-arrow","↗"));
 plate.appendChild(bottom);
 card.appendChild(plate);
 card.addEventListener("click",()=>inspect(item,card));
 return card;
}
function eligible(item,q){
 if(activeDivision!=="all"&&item.division!==activeDivision)return false;
 if(activeSubtab!=="all"){
  if(activeDivision==="faction"){
   if(item.subdivision!==activeSubtab)return false;
  }else if(item.kind!==activeSubtab)return false;
 }
 if(!q)return true;
 return [item.name,item.id,item.type,item.issuer,item.division,item.subdivision,item.kind,item.summary,item.note]
  .filter(Boolean).some(s=>s.toLowerCase().includes(q));
}
function render(){
 const query=elements.search.value.trim().toLowerCase();
 const matches=inventory.filter(item=>eligible(item,query));
 elements.wall.replaceChildren(...matches.map(cardFor));
 elements.count.textContent=pad(matches.length);
 elements.empty.hidden=matches.length>0;
 elements.subtabs.querySelectorAll(".sub-tab").forEach(b=>{
  b.setAttribute("aria-pressed",String(b.dataset.subtab===activeSubtab));
 });
 if(!matches.length){
  elements.emptyTitle.textContent=query?"No matching object records.":"Nothing filed here. Yet.";
  elements.emptyDescription.textContent=query
   ?"Try a different search or browse another subdivision."
   :"No records have been assigned to this subdivision yet. No fictional filler objects have been created.";
 }
}
function drawSubtabs(){
 elements.subtabs.replaceChildren();
 for(const [id,name] of divisions[activeDivision].filters){
  const button=node("button","sub-tab",name);
  button.type="button";button.dataset.subtab=id;
  button.setAttribute("aria-pressed",String(id===activeSubtab));
  button.addEventListener("click",()=>{activeSubtab=id;render();});
  elements.subtabs.appendChild(button);
 }
}
function switchDivision(division,focus=false){
 if(!divisions[division])return;
 activeDivision=division;activeSubtab="all";
 elements.registry.dataset.division=division;
 elements.tabs.forEach(t=>{
  const yes=t.dataset.division===division;
  t.classList.toggle("is-active",yes);
  t.setAttribute("aria-selected",String(yes));
  t.tabIndex=yes?0:-1;
  if(yes&&focus)t.focus({preventScroll:true});
 });
 elements.panel.setAttribute("aria-labelledby","division-"+division);
 const config=divisions[division];
 elements.title.textContent=config.title;
 elements.description.textContent=config.description;
 elements.code.textContent=config.code;
 elements.caption.textContent="SECONDARY INDEX — "+config.axis;
 drawSubtabs();render();
}
function inspect(item,opener){
 const d=elements.dialog;
 if(!d||typeof d.showModal!=="function")return;
 lastOpener=opener;
 put("inspection-file-top",item.id);
 put("inspection-section",classification(item)+" / "+item.id);
 put("inspection-title",item.name);
 put("inspection-classification",classification(item)+" / "+item.type.toUpperCase());
 put("detail-type",item.type);
 put("detail-provenance",provenance(item));
 put("detail-issuer",item.issuer);
 put("detail-code",item.id);
 put("detail-holder",item.holder);
 put("detail-condition",item.condition);
 put("detail-acquisition",item.acquisition);
 put("detail-properties",item.properties);
 put("stage-number",item.id.split("-").pop());
 put("stage-caption-name",item.name.toUpperCase());
 put("inspection-summary",item.summary);
 put("inspection-note",item.note);
 d.dataset.division=item.division;
 d.showModal();
 document.body.classList.add("inspection-open");
 elements.close.focus({preventScroll:true});
}
function closeInspect(){if(elements.dialog&&elements.dialog.open)elements.dialog.close();}
elements.tabs.forEach(t=>t.addEventListener("click",()=>switchDivision(t.dataset.division)));
elements.tabBar.addEventListener("keydown",event=>{
 if(!["ArrowLeft","ArrowRight","Home","End"].includes(event.key))return;
 const i=elements.tabs.indexOf(document.activeElement);
 if(i<0)return;
 event.preventDefault();
 let next=i;
 if(event.key==="ArrowRight")next=(i+1)%elements.tabs.length;
 if(event.key==="ArrowLeft")next=(i-1+elements.tabs.length)%elements.tabs.length;
 if(event.key==="Home")next=0;
 if(event.key==="End")next=elements.tabs.length-1;
 switchDivision(elements.tabs[next].dataset.division,true);
});
elements.search.addEventListener("input",render);
elements.reset.addEventListener("click",()=>{
 elements.search.value="";
 switchDivision("all");
 elements.tabs[0].focus({preventScroll:true});
});
elements.close.addEventListener("click",closeInspect);
elements.returnButton.addEventListener("click",closeInspect);
elements.dialog.addEventListener("click",event=>{
 if(event.target===elements.dialog)closeInspect();
});
elements.dialog.addEventListener("close",()=>{
 document.body.classList.remove("inspection-open");
 if(lastOpener&&lastOpener.isConnected)lastOpener.focus({preventScroll:true});
});
function countAll(){
 put("total-count",pad(inventory.length));
 put("unfiled-count",pad(inventory.filter(item=>item.division==="unfiled").length));
 elements.tabs.forEach(tab=>{
  const key=tab.dataset.division;
  const count=key==="all"?inventory.length:inventory.filter(item=>item.division===key).length;
  const number=tab.querySelector("b");
  if(number)number.textContent=pad(count);
 });
}
countAll();
switchDivision("all");

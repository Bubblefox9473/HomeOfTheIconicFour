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

/* NNC–03 / APPROVED STORY RECAPS
   Official arcs condensed from the Limbus Company chapters; Canto VII also
   follows the author's established Vasteil / Necro continuity. Future or
   unfinished NetherNova chapters intentionally have no story synopsis.
   Reference: https://limbuscompany.wiki.gg/wiki/Category:Story_Chapters */
const cantoSynopses={
 "I":"Their first Golden Bough retrieval sends the Sinners into a ruined Lobotomy Corporation branch beneath District 4. Gregor, once a propaganda figure and unwilling soldier of the Smoke War, is confronted by the surviving veterans of Old G Corp. As the team struggles to cooperate, their young guide Yuri becomes another casualty of the facility's horrors. The Golden Bough slips into someone else's hands, leaving Gregor to carry the grief of a war that never truly ended.",
 "II":"A Golden Bough buried beneath a casino draws the crew into District 10's underworld of gambling and Syndicates. Rodion's confident smile falters when she encounters Sonya and the Yurodiviye, forcing her to revisit the murder of a corrupt pawnbroker. She believed she was saving her neighborhood, but the retaliation destroyed the people she meant to protect. The Sinners escape with their first recovered Bough; Rodion's guilt is not so easily won or left behind.",
 "III":"The journey to Calw brings Sinclair back to the hometown where his family was slaughtered by the fanatic Kromer and N Corp.'s Inquisition. Through memories of school, friendship, and betrayal, his terror of prosthetics and his own wavering convictions comes into focus. Kromer's twisted devotion to 'purity' culminates in a monstrous confrontation, and Sinclair must face the person who turned his childhood into a nightmare. He survives, though the past refuses to vanish so neatly.",
 "IV":"A mission at K Corp. reunites Yi Sang with Dongbaek and Dongrang, the broken remnants of the League of Nine Littérateurs. Beneath K Corp.'s miraculous healing technology lies an industry built on suffering, while the Golden Bough draws Yi Sang into memories of his lost companions, the Mirror, and the despair that kept him motionless. As old friendships collapse into violence, he finally rejects his resignation to an unchanging life. To live is to risk finding his wings again.",
 "V":"The Sinners cross the treacherous Great Lake in search of a Golden Bough, but for Ishmael the voyage is a return to the Pequod and the captain whose obsession ruined her life. Inside the Pallid Whale, she reunites with Queequeg and confronts Ahab, who would sacrifice anyone to destroy her quarry. Ishmael nearly loses herself to the same hatred. In the end, she chooses to strike the Whale rather than become another reflection of Ahab, finding a direction beyond revenge.",
 "VI":"Heathcliff returns to Wuthering Heights expecting to face Catherine, only to be greeted by news of her death and a household drowning in old resentments. Golden Bough distortions unravel the estate's buried cruelty and bring him face to face with the Erlking, a version of himself consumed by vengeance across Mirror Worlds. As love turns into an endless cycle of suffering, Catherine chooses to erase herself from every world to break it. Heathcliff survives with a love he can no longer fully remember, but cannot quite abandon.",
 "VII":"La Manchaland strips Don Quixote's shining fantasies down to their bloodstained foundations. She discovers that she is Sancho, a Bloodfiend who inherited her Father's name and his impossible dream of humans and Bloodfiends living together. Faced with the ruin of his family and the park he built, Sancho fights the First Kindred, lays her Father to rest, and chooses to carry that dream forward as a Sinner.\n\nAlongside her story, Vasteil makes his first appearance after spending millennia trapped within his own body. Freedom comes with little time to adjust: Limbus Company clashes with Vasteil and his Starkindred companions as old loyalties unravel. A crown is broken, and Noctis nearly loses his life. One of Vasteil's closest friends betrays him; he ultimately kills that friend with his own hands, then holds his lover, his other dearest companion, as they die. The losses shatter the world he has only just regained. Yet his story does not end in erasure: Vasteil and Necro emerge able to coexist, carrying the scars of a Canto that changed them both.",
 "VIII":"Hong Lu returns to Hongyuan as Jia Baoyu, a son of the Jia family and a reluctant contender in its brutal contest to determine H Corp.'s next Hierarch. The competition exposes a childhood spent as the elders' living spectacle, his apparent indifference hiding years of helplessness and pain. Surrounded by family members pursuing power, Hong Lu finally gives voice to what he wants: kindness. He defies the elders' hold over him and helps Jia Xichun claim the future of Hongyuan for herself.",
 "IX":"When the House of Spiders, a circle of powerful Five Fingers members who raised Ryōshū as their weapon, raids Limbus Company headquarters for its Golden Boughs, she is forced back into the life she escaped. Her Relic blade, Arayashiki, severs cherished memories whenever it is unsheathed. To protect her adopted daughter Araya, Ryōshū once hid her in a Time Vault; instead, temporal entanglement aged Araya, who later assumed the role of the Pinky Nursefather in hopes of meeting her mother again. Unable to recognize the woman before her, Ryōshū fatally wounds her own daughter and, overcome by grief, severs her contract with Dante. With Dante's help, Araya reaches her mother and uses her E.G.O to form a new scabbard, saving Ryōshū from erasing herself. Ryōshū breaks free from the House of Spiders, but loses all memory of Araya. Their connection may yet survive through the scabbard she leaves behind."
};
const intervalloSynopses={
 "I":"A competition between fried-chicken restaurants takes an absurdly dangerous turn when a grieving owner Distorts and unleashes chicken-headed monsters. The Sinners answer with a disastrous cooking contest of their own, gradually discovering that a stolen, erased family recipe is at the heart of the tragedy. Even this ridiculous assignment proves that the City's smallest comforts can carry unbearable memories.",
 "II":"Before the Great Lake crossing, the Sinners need to turn Mephistopheles into a seaworthy vessel. At the coast they hunt Trash Crabs, collect salvage, and enlist the Molar Boatworks Fixers to retrofit the bus. What ought to be a brief beachside reprieve instead exposes Ishmael's mounting dread of returning to the waters that nearly destroyed her, putting her at odds with Heathcliff and the rest of the crew.",
 "III-1":"A quest to find Heathcliff a suitable outfit leads him, Don Quixote, and Dante through the bus's Backdoors to a suspiciously cheerful gift factory in the Outskirts. Its workers are turning captured people into raw materials for presents. The Sinners intervene, rescue a young girl named Crayon, and escape the grotesque workshop. Back aboard the bus, Heathcliff receives the invitation that will draw him home to Wuthering Heights.",
 "III-2":"Caught between the Blade Lineage and the Kurokumo Clan, the Sinners rescue Aeng-du and follow her in search of the swordsman Bamboo-hatted Kim. A mysterious Monolith has amplified Kim's anguish over the slaughter of his comrades, pushing him into Distortion. Fighting through the memories of a ruined lineage, the crew must subdue him and secure the dangerous artifact before grief claims another victim.",
 "IV-1":"A colossal time-tax bill leaves the Sinners working off their debt in T Corp. Rodion, Hong Lu, Ryōshū, and Dante investigate the Time Ripper, a Distortion stealing hours from the wealthy in a City where time itself is currency. The case exposes the cruelty of T Corp.'s unequal economy and the grief behind the culprit's crusade, while confronting Rodion with uncomfortable echoes of the Yurodiviye and her own past.",
 "IV-2":"A WARP train becomes a hunting ground when the Bloodfiend Cassetti turns passengers into ravenous Bloodbags. The Sinners fight through the train's nightmare and uncover a secret hidden beneath Don Quixote's cheerful persona: without Rocinante, she is a far more powerful Bloodfiend than anyone suspected. Their escape leaves Dante with a revelation that will haunt the journey toward La Manchaland.",
 "V-1":"A routine examination at Limbus Company headquarters becomes a relentless series of combat trials under the researcher Hohenheim. The Sinners learn how their contracts with Dante shape their strength before Hohenheim deliberately triggers his own Distortion as a final experiment. Beneath his clinical detachment lie memories of a Lobotomy Corporation disaster and the guilt of being the one who survived.",
 "V-2":"On the way to Hongyuan, the Sinners are targeted by assassins seeking to eliminate Hong Lu before the Jia family's contest for power. Betrayed by a supposed guide, they are trapped in the Backstreets between hired killers, the vengeful Middle, and the city's nightly Sweepers. Surviving until dawn brings them closer to Jia Xichun, whose bid for the Hierarch's seat will shape the struggle ahead.",
 "VI":"After Hong Lu's return to Hongyuan, Jia Xichun faces a challenge to her legitimacy as the family's new Hierarch. The Sinners spend thirty days teaching her and Sinclair lessons in courage, strategy, empathy, and survival, though the trials grow steadily less innocent. An attempted political betrayal and a painful final confrontation force Xichun to decide what kind of ruler she will be. She chooses to protect her home without becoming another tyrant.",
 "VII-1":"In the aftermath of the House of Spiders' assault, the Sinners mourn their dead and investigate the strange Corridors left behind. Ryōshū follows fragments of a past her sword has cut away, encountering the Ring's artists, old family wounds, and traces of Araya's will within her scabbard. Every door offers another piece of the self she has lost, and another reason to believe those severed connections may still be restored."
};

const officialCoverIndex={I:1,II:2,III:3,IV:4,V:5,VI:6,VII:7,VIII:8,IX:9};
// Canto X's matching chapter banner is currently served by the Limbus Company Wiki.
// If that external image cannot load, the designed title-card fallback remains visible.
const cantoXCover="https://limbuscompany.wiki.gg/images/1/17/Chapter10_Begin.png";
const coverFor=number=>number==="X"?cantoXCover:officialCoverIndex[number]?"assets/canto-covers/canto-"+officialCoverIndex[number]+".png":null;
const toMain=([number,title])=>{
 const sharedStory=number==="VII";
 return {
  id:"canto-"+number.toLowerCase(),number,title,variant:sharedStory?"hybrid":"canto",
  coverImage:coverFor(number),
  classification:sharedStory?"CANTO / OFFICIAL + ORIGINAL":"CANTO / MAIN STORY",
  category:sharedStory?"MAIN-STORY CANTO + ORIGINAL STORY":"MAIN-STORY CANTO",
  source:sharedStory?"LIMBUS COMPANY + NETHER NOVA ORIGINAL":"OFFICIAL LIMBUS COMPANY",
  code:"LC-CANTO-"+number,
  status:sharedStory?"SHARED STORY / MATERIAL PENDING":"REFERENCE ENTRY / NO FILE ATTACHED",
  strap:sharedStory?"OFFICIAL + ORIGINAL":"OFFICIAL MAIN NARRATIVE",
  synopsisAvailable:Boolean(cantoSynopses[number]),
  description:cantoSynopses[number]||"Canto "+number+" has not yet entered NetherNova's completed story chronology. Its record is reserved without a story synopsis.",
  note:sharedStory
   ?"A shared Canto in NetherNova continuity: Sancho's official story runs alongside Vasteil and Necro's original arc. No finished production document is attached."
   :"Story synopsis adapted for this archive from the official Limbus Company narrative. No production document is attached."
 };
};
const officialIntervalloCovers={
 "I":"intervallo-i.png",
 "II":"intervallo-ii.png",
 "III-1":"intervallo-iii-1.png",
 "III-2":"intervallo-iii-2.png",
 "IV-1":"intervallo-iv-1.png",
 "IV-2":"intervallo-iv-2.png",
 "V-1":"intervallo-v-1.png",
 "V-2":"intervallo-v-2.png",
 "VI":"intervallo-vi.png",
 "VII-1":"intervallo-vii-1.png",
 "VII-2":"intervallo-vii-2.png"
};
const intervalloCoverFor=number=>officialIntervalloCovers[number]
 ?"assets/intervallo-covers/"+officialIntervalloCovers[number]:null;
const toIntervallo=([number,title])=>({
 id:"intervallo-"+number.toLowerCase(),number,title,variant:"intervallo",
 coverImage:intervalloCoverFor(number),
 classification:"INTERVALLO / BETWEEN CANTOS",category:"INTERVALLO",
 source:"OFFICIAL LIMBUS COMPANY",code:"LC-INTERVALLO-"+number,
 status:number==="VII-2"?"CHRONOLOGY RESERVED / SYNOPSIS PENDING":"REFERENCE ENTRY / NO FILE ATTACHED",
 strap:number==="VII-2"?"AFTER GENESIS: CONCORDIA":"OFFICIAL INTERVALLO",
 synopsisAvailable:Boolean(intervalloSynopses[number]),
 description:intervalloSynopses[number]||
  "Mnestic Experience is filed after Genesis: Concordia in NetherNova's chronology. Its synopsis remains intentionally unwritten until that story has taken place.",
 note:number==="VII-2"
  ?"Official Intervallo title retained. Its NetherNova placement is after Necro's Canto; story events have not yet been incorporated here."
  :"Story synopsis adapted for this archive from the official Limbus Company narrative. No production document is attached."
});
const mephista={
 id:"mephista-9-5-2",number:"9.5–2",title:"The Unbecoming",variant:"original",
 classification:"INTERVALLO / NARRATIVE BRIDGE",
 category:"PLOT-RELEVANT ORIGINAL INTERVALLO",
 source:"NETHER NOVA ORIGINAL CONTINUITY",
 code:"NNC-03-9.5-2",status:"CURRENT PRODUCTION / MATERIAL PENDING",
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
// Mnestic Experience remains exclusive to the Intervallos catalogue, where
// NetherNova places it immediately after Necro's Genesis: Concordia.
const officialIntervallos=intervalloTitles.map(toIntervallo);
const mnestic=officialIntervallos.find(r=>r.number==="VII-2");
if(!mnestic)throw new Error("Mnestic Experience register record is missing");
const main=[...mainTitles.map(toMain).flatMap(r=>r.number==="X"?[mephista,necro,r]:[r]),noctis];
const inter=[...officialIntervallos.filter(r=>r!==mnestic),mephista,necro,mnestic];
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
 button.setAttribute("aria-label","Inspect "+record.classification+": "+record.title+(record.id==="mephista-9-5-2"?" — current production":""));
 if(record.id==="mephista-9-5-2"){
  stop.classList.add("timeline-stop--current-production");
  button.classList.add("reel-card--current-production");
  add(button,"span","timeline-production-badge","● CURRENT PRODUCTION");
 }
 const head=add(button,"span","reel-card-top");
 add(head,"span","card-code",record.code);
 add(head,"span","card-class",record.variant==="original"?"ORIGINAL":record.variant==="hybrid"?"SHARED STORY":"REFERENCE");
 const scene=add(button,"span","reel-card-scene");
 if(record.coverImage){
  scene.classList.add("has-cover");
  const art=add(scene,"img","scene-cover");
  art.src=record.coverImage;
  art.alt="";
  art.loading="lazy";
  art.decoding="async";
  art.addEventListener("error",()=>{art.remove();scene.classList.remove("has-cover");});
 }
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
 // Official chapter covers and future optional original poster art share this stage.
 // The typography remains legible, even if an asset fails to load.
 const artSource=record.posterImage||record.coverImage;
 if(artSource){
  art.classList.add("has-cover");
  art.style.setProperty("--poster-cover-url",'url("'+artSource+'")');
  const image=add(art,"img","poster-art-image");
  image.src=artSource;
  image.alt="";
  image.loading="lazy";
  image.decoding="async";
  image.addEventListener("error",()=>{image.remove();art.classList.remove("has-cover");});
 }
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
 write("record-story-label","FEATURED PRODUCTION / SYNOPSIS IN DEVELOPMENT");
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
 write("record-story-label",record.synopsisAvailable
  ?record.variant==="hybrid"?"COMPLETED STORY / OFFICIAL + NETHER NOVA":"STORY SYNOPSIS / ARCHIVE"
  :"RECORD RESERVED / SYNOPSIS NOT FILED");
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

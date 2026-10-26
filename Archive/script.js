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

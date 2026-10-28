(() => {
  const search = document.querySelector('#anomaly-search');
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const records = [...document.querySelectorAll('#anomaly-list .entity-record')];
  const resultCount = document.querySelector('#result-count');
  const emptyState = document.querySelector('#empty-state');

  if (search && records.length && resultCount && emptyState) {
    let activeTier = 'all';
    function refresh() {
      const query = search.value.trim().toLocaleLowerCase();
      let visible = 0;
      records.forEach((record) => {
        const matchesTier = activeTier === 'all' || record.dataset.tier === activeTier;
        const matchesQuery = !query || (record.dataset.search || '').toLocaleLowerCase().includes(query);
        record.hidden = !matchesTier || !matchesQuery;
        if (!record.hidden) visible++;
      });
      const pad = n => String(n).padStart(2, '0');
      resultCount.textContent = pad(visible) + ' / ' + pad(records.length) + ' FILES';
      emptyState.hidden = visible !== 0;
    }
    search.addEventListener('input', refresh);
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        activeTier = button.dataset.filter || 'all';
        filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
        refresh();
      });
    });
    refresh();
  }

  const tabs = [...document.querySelectorAll('[role="tab"][data-tab]')];
  if (tabs.length) {
    const panels = [...document.querySelectorAll('[role="tabpanel"][data-panel]')];
    function selectTab(selected, focus = false) {
      tabs.forEach(tab => {
        const active = tab === selected;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
      });
      panels.forEach(panel => panel.hidden = panel.dataset.panel !== selected.dataset.tab);
      if (focus) selected.focus();
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectTab(tab));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) {
          event.preventDefault();
          selectTab(tabs[next], true);
        }
      });
    });
    selectTab(tabs.find(tab => tab.getAttribute('aria-selected') === 'true') || tabs[0]);
  }
})();
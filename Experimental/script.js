(() => {
  const search = document.querySelector('#anomaly-search');
  const buttons = Array.from(document.querySelectorAll('[data-filter]'));
  const records = Array.from(document.querySelectorAll('#anomaly-list .record'));
  const count = document.querySelector('#result-count');
  const empty = document.querySelector('#empty-state');
  if (!search || !records.length || !count || !empty) return;
  let currentTier = 'all';

  function updateRegistry() {
    const query = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    records.forEach((record) => {
      const searchable = (record.dataset.search || '').toLocaleLowerCase();
      const tierMatch = currentTier === 'all' || record.dataset.tier === currentTier;
      const textMatch = !query || searchable.includes(query);
      record.hidden = !(tierMatch && textMatch);
      if (!record.hidden) visible++;
    });
    count.textContent = String(visible).padStart(2, '0') + ' / ' + String(records.length).padStart(2, '0') + ' RECORDS';
    empty.hidden = visible !== 0;
  }

  search.addEventListener('input', updateRegistry);
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      currentTier = button.dataset.filter || 'all';
      buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      updateRegistry();
    });
  });
  updateRegistry();
})();
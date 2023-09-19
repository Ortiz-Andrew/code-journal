/* exported data */

let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

function beforeUnload(event) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('code-journal-entry-form', dataJSON);
}
window.addEventListener('beforeunload', beforeUnload);

const previousDataJSON = localStorage.getItem('code-journal-entry-form');

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

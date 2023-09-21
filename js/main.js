const $photo = document.querySelector('#photo');
const $image = document.querySelector('img');

$photo.addEventListener('input', function (event) {
  $image.src = event.target.value;
});
const $submitForm = document.querySelector('form');
$submitForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const $title = $submitForm.elements.title.value;
  const $photo = $submitForm.elements.photo.value;
  const $notes = $submitForm.elements.notes.value;
  const formData = {
    title: $title,
    photo: $photo,
    notes: $notes,
    entryID: data.nextEntryId,
  };

  data.nextEntryId++;
  data.entries.unshift(formData);

  $ul.prepend(renderEntry(formData));
  viewSwap('entries');

  $image.src = './images/placeholder-image-square.jpg';
  $submitForm.reset();
  toggleNoEntries();
});

function renderEntry(entry) {
  const $entryList = document.createElement('li');
  $entryList.className = 'row';
  $entryList.setAttribute('data-entry-id', entry.entryID);

  const $entryDiv = document.createElement('div');
  $entryDiv.className = 'column-half';

  const $entryImg = document.createElement('img');
  $entryImg.setAttribute('src', entry.photo);
  $entryImg.setAttribute('alt', entry.title);

  const $otherDiv = document.createElement('div');
  $otherDiv.className = 'column-half';

  const $h1Entry = document.createElement('h1');
  $h1Entry.textContent = entry.title;

  const $pencilIcon = document.createElement('i');
  $pencilIcon.className = 'fas fa-pencil-alt';

  const $pElement = document.createElement('p');
  $pElement.textContent = entry.notes;

  $entryList.appendChild($entryDiv);
  $entryDiv.appendChild($entryImg);
  $otherDiv.appendChild($h1Entry);
  $otherDiv.appendChild($pencilIcon);
  $otherDiv.appendChild($pElement);
  $entryList.appendChild($otherDiv);

  return $entryList;
}

const $ul = document.querySelector('.entry-list');
document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const $data = renderEntry(data.entries[i]);
    $ul.appendChild($data);
  }
  toggleNoEntries();
  viewSwap(data.view);
});

const $noEntries = document.querySelector('.no-entries');
function toggleNoEntries() {
  if (data.entries.length > 0) {
    $noEntries.classList.add('hidden');
  } else {
    $noEntries.classList.remove('hidden');
  }
}

const entriesView = document.querySelector('.entries');
const entryFormView = document.querySelector('.entry-form');

function viewSwap(viewName) {
  if (viewName === 'entries') {
    entriesView.classList.remove('hidden');
    entryFormView.classList.add('hidden');
  } else if (viewName === 'entry-form') {
    entriesView.classList.add('hidden');
    entryFormView.classList.remove('hidden');
  }
  data.view = viewName;
}

document.querySelector('a').addEventListener('click', function () {
  viewSwap('entries');
});

document.querySelector('.new').addEventListener('click', function () {
  viewSwap('entry-form');
});

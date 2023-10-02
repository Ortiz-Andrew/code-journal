const $photo = document.querySelector('#photo');
const $image = document.querySelector('img');
const $confirmModal = document.querySelector('.confirmModal');

$photo.addEventListener('input', function (event) {
  $image.src = event.target.value;
});
const $submitForm = document.querySelector('form');
$submitForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const $title = $submitForm.elements.title.value;
  const $photo = $submitForm.elements.photo.value;
  const $notes = $submitForm.elements.notes.value;

  if (data.editing === null) {
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
  } else {
    const editiedEntryId = data.editing.entryID;
    const editedEntryIndex = data.entries.findIndex(
      (entry) => entry.entryID === editiedEntryId
    );

    if (editedEntryIndex !== -1) {
      data.entries[editedEntryIndex].title = $title;
      data.entries[editedEntryIndex].photo = $photo;
      data.entries[editedEntryIndex].notes = $notes;

      const $editedEntry = renderEntry(data.entries[editedEntryIndex]);

      const $orginalEntry = $ul.querySelector(
        `[data-entry-id="${editiedEntryId}"]`
      );

      if ($orginalEntry) {
        $ul.replaceChild($editedEntry, $orginalEntry);
      }
    }
    const $formTitle = document.querySelector('.entry-title');
    $formTitle.textContent = 'New Entry';
    data.editing = null;
    viewSwap('entries');
  }

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

  const $imgDiv = document.createElement('div');
  $imgDiv.className = 'column-half';

  const $h1Entry = document.createElement('h1');
  $h1Entry.textContent = entry.title;

  const $pencilIcon = document.createElement('i');
  $pencilIcon.className = 'fas fa-pencil-alt';

  const $pElement = document.createElement('p');
  $pElement.textContent = entry.notes;

  const $titleWrapper = document.createElement('div');
  $titleWrapper.setAttribute('class', 'title-wrapper');

  $entryList.appendChild($entryDiv);
  $entryDiv.appendChild($entryImg);
  $entryList.appendChild($entryDiv);
  $entryList.appendChild($imgDiv);
  $imgDiv.appendChild($titleWrapper);
  $titleWrapper.appendChild($h1Entry);
  $titleWrapper.appendChild($pencilIcon);
  $imgDiv.appendChild($pElement);
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

$ul.addEventListener('click', function (event) {
  if (event.target.classList.contains('fa-pencil-alt')) {
    const entryId = event.target.closest('li').getAttribute('data-entry-id');
    const clickedEntry = data.entries.find(
      (entry) => entry.entryID === parseInt(entryId)
    );

    data.editing = clickedEntry;
    populateForm(clickedEntry);
    viewSwap('entry-form');
  }
});

function populateForm(entry) {
  const $titleInput = document.querySelector('#title');
  const $photoInput = document.querySelector('#photo');
  const $notesTextarea = document.querySelector('#notes');
  const $formTitle = document.querySelector('.entry-title');

  $titleInput.value = entry.title;
  $photoInput.value = entry.photo;
  $notesTextarea.value = entry.notes;

  $formTitle.textContent = 'Edit Entry';
}

const $deleteEntryButton = document.querySelector('.deleteEntryButton');
const $confirmDeleteButton = document.querySelector('#confirmDeleteButton');
const $cancelDeleteButton = document.querySelector('#cancelDeleteButton');

$deleteEntryButton.addEventListener('click', function (event) {
  $confirmModal.classList.remove('hidden');
});

$confirmDeleteButton.addEventListener('click', function (event) {
  $confirmModal.classList.add('hidden');
});

$cancelDeleteButton.addEventListener('click', function (event) {
  $confirmModal.classList.add('hidden');
});

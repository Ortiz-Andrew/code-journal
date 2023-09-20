const $imageInput = document.querySelector('#photo');
const $image = document.querySelector('img');
const $form = document.querySelector('form');

$imageInput.addEventListener('input', function (event) {
  $image.setAttribute('src', event.target.value);
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  const title = $form.elements.title.value;
  const photoUrl = $form.elements.photo.value;
  const notes = $form.elements.notes.value;
  const inputValues = {
    entryId: data.nextEntryId,
    title,
    photoUrl,
    notes,
  };

  data.nextEntryId++;
  data.entries.unshift(inputValues);

  $image.setAttribute('src', './images/placeholder-image-square.jpg');
  $form.reset();
});

function renderEntry(entry) {
  const $entryList = document.createElement('li');
  $entryList.className = 'row';

  const $entryDiv = document.createElement('div');
  $entryDiv.className = 'column-half';

  const $entryImg = document.createElement('img');
  $entryImg.setAttribute('src', entry.photoUrl);
  $entryImg.setAttribute('alt', entry.title);

  const $Divtwo = document.createElement('div');
  $Divtwo.className = 'column-half';

  const $h1Entry = document.createElement('h1');
  $h1Entry.textContent = entry.title;

  const $pElement = document.createElement('p');
  $pElement.textContent = entry.notes;

  $entryList.appendChild($entryDiv);
  $entryDiv.appendChild($entryImg);
  $Divtwo.appendChild($h1Entry);
  $Divtwo.appendChild($pElement);
  $entryList.appendChild($Divtwo);

  return $entryList;
}

const $ul = document.querySelector('.entry-list');
document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const $data = renderEntry(data.entries[i]);
    $ul.appendChild($data);
  }
  toggleNoEntries();
});

const $noEntries = document.querySelector('.no-entries');
function toggleNoEntries() {
  if (data.entries.length > 0) {
    $noEntries.classList.add('hidden');
  } else {
    $noEntries.classList.remove('hidden');
  }
}

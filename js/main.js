const $imageInput = document.querySelector('#photoUrl');
const $image = document.querySelector('img');
const $form = document.querySelector('form');

$imageInput.addEventListener('input', function (event) {
  $image.setAttribute('src', event.target.value);
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  const title = $form.elements.title.value;
  const photoUrl = $form.elements.photoUrl.value;
  const entryBox = $form.elements.entryBox.value;

  const inputValues = {
    entryId: data.nextEntryId,
    title,
    photoUrl,
    entryBox,
  };

  data.nextEntryId++;
  data.entries.unshift(inputValues);

  $image.setAttribute('src', './images/placeholder-image-square.jpg');
  $form.reset();
});

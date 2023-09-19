const $imageInput = document.querySelector('#photoUrl');
const $image = document.querySelector('img');

$imageInput.addEventListener('input', function (event) {
  $image.setAttribute('src', event.target.value);
});

const $saveButton = document.querySelector('button');

$saveButton.addEventListener('submit', function (event) {
  event.preventDefault();
});

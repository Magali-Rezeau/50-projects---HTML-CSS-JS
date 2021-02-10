const labels = document.querySelectorAll('.form__item-label');
const inputs = document.querySelectorAll('.form__item-input');

labels.forEach(label => {
  label.innerHTML = label.textContent
    .split('')
    .map((el, wave) =>
      `<span style="transition-delay: ${wave * 75}ms;">${el}</span>`)
    .join('');
});

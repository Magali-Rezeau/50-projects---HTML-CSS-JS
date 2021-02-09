const closeBtn = document.querySelector('.container__icon-btn-close');
const openBtn = document.querySelector('.container__icon-btn-open');
const btnContainer = document.querySelector('.container__icon-btn');
const container = document.querySelector('.container');

openBtn.addEventListener('click', () => {
  container.classList.add('show-nav');
});

closeBtn.addEventListener('click', () => {
  container.classList.remove('show-nav');
});


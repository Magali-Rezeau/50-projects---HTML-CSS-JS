const showModalBtns = document.querySelectorAll('.show-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-modal');

const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

showModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    openModal();
  });
});

closeBtn.addEventListener('click', () => {
  closeModal();
});

overlay.addEventListener('click', () => {
  closeModal();
});

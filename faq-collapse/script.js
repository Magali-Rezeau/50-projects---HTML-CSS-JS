const btns = document.querySelectorAll('.faq-cards__item-icon');

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentNode.classList.toggle('active');
  });
});
const boxImg = document.querySelectorAll('.box');

boxImg.forEach( el => {
  el.addEventListener('mouseover', e => {
    removeActiveClass();
    el.classList.add('active');
  });
});

const removeActiveClass = () => {
  boxImg.forEach( el => {
    el.classList.remove('active');
  });
};
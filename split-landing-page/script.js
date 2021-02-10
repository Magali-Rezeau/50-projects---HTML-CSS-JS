const boxLeft = document.querySelector('.box-left');
const boxRight = document.querySelector('.box-right');

boxLeft.addEventListener('mouseover', () => {
  boxLeft.style.width = "75%";
  boxRight.style.width = "25%";
});

boxRight.addEventListener('mouseover', () => {
  boxLeft.style.width = "25%";
  boxRight.style.width = "75%";
});

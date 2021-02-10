const boxes = document.querySelectorAll('.box');

window.addEventListener('scroll', displayBoxes);

function displayBoxes() {
  const startingPoint = window.innerHeight / 5 * 4;
  boxes.forEach(box => {
    const boxTop = box.getBoundingClientRect().top;
    if (boxTop < startingPoint) {
      box.classList.add('show');
    } else {
      box.classList.remove('show');
    }
  });
}

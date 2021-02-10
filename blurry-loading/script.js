const loaderText = document.querySelector('.loader__text');
const loader = document.querySelector('.loader');
const bg = document.querySelector('.bg');
const face1 = document.querySelector('.loader .face.face1');
const face2 = document.querySelector('.loader .face.face2');

let load = 0;

const map = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

const int = setInterval(timer, 100);

function timer() {
  load++;
  if (load > 99) {
    face1.style.animation = 'none';
    face2.style.animation = 'none';
    clearInterval(int);
  }

  loaderText.innerText = `${load}%`;
  loader.style.opacity = map(load, 0, 100, 1, 0);
  bg.style.filter = `blur(${map(load, 0, 100, 30, 0)}px)`;
}

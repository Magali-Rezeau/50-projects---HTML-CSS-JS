'use strict';
const slides = document.querySelectorAll('.slide');
const section = document.querySelector('.section');
const btnRight = document.querySelector('.slider-btn-right');
const btnLeft = document.querySelector('.slider-btn-left');
let currentSlide = 0;
const maxSlide = slides.length;

const setBgToSection = () => {
  const style = getComputedStyle(slides[currentSlide]).backgroundImage;
  section.style.backgroundImage = style;
};

const goToSlide = slide => {
  setBgToSection();
  slides.forEach((s, index) => {
    s.style.transform = `translateX(${100 * (index - slide)}%)`;
  });
};
goToSlide(0);

const nextSlide = () => {
  if (currentSlide === maxSlide - 1) currentSlide = 0;
  else currentSlide++;
  
  goToSlide(currentSlide);
};

const prevSlide = () => {
  if (currentSlide === 0) currentSlide = maxSlide - 1;
  else currentSlide--;
  
  goToSlide(currentSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
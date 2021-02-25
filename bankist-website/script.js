'use strict';
// Menu fade animation 
const nav = document.querySelector('.nav');
// Sticky navigation 
const header = document.querySelector('.header');
// Revealing sections of scroll
const sections = document.querySelectorAll('.section');
// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');
// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
// Button scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
// Button scrolling + Sticky navigation 
const section1 = document.querySelector('#section--1');
// Page navigation
const navLinks = document.querySelector('.nav__links');
// Tabbed component 
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations');
const tabsContent = document.querySelectorAll('.operations__content');
// Slider
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');


// Menu fade animation //
const handlerHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');

    siblings.forEach(sibling => {
      if (sibling !== link) sibling.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handlerHover.bind(.5));
nav.addEventListener('mouseout', handlerHover.bind(1));


// Sticky navigation 
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = (entries) => {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(stickyNav, headerObsOptions);
headerObserver.observe(header);


// Revealing sections of scroll
const revealSection = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  sectionObserver.unobserve(entry.target);
};

const sectionObsOptions = {
  root: null,
  threshold: .20,
};

const sectionObserver = new IntersectionObserver(revealSection, sectionObsOptions);

sections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});


// Lazy loading images
const revealImg = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  // Replace src with data-src 
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });
  imgObserver.unobserve(entry.target);
};

const imgObsOptions = {
  root: null,
  threshold: 0,
};

const imgObserver = new IntersectionObserver(revealImg, imgObsOptions);

imgTargets.forEach(img => {
  imgObserver.observe(img);
  img.classList.add('lazy-img');
});


// Modal window //
const openModal = e => {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = e => {
  e.preventDefault();
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// Button scrolling //
btnScrollTo.addEventListener('click', () => {
  // const s1coords = section1.getBoundingClientRect();
  // Scrolling (left and top position relative to the top of the page - currentPosition + currentScroll)
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset, 
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });

  // Not compatible with old browsers and safari 
  section1.scrollIntoView({ behavior: 'smooth' });
});


// Page navigation //
navLinks.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});


// Tabbed component //
tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(tab => {
    tab.classList.remove('operations__tab--active');
  });
  tabsContent.forEach(content => {
    content.classList.remove('operations__content--active');
  });

  clicked.classList.add('operations__tab--active');

  // Active content area
  const content = document.querySelector(`.operations__content--${clicked.dataset.tab}`);
  content.classList.add('operations__content--active');
});

// Slider //

let currentSlide = 0;
const maxSlide = slides.length;

const createDots = () => {
  slides.forEach((_, index) => {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${index}"></button>`);
  });
};

const activeDot = slide => {
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};

const goToSlide = slide => {
  slides.forEach((s, index) => {
    s.style.transform = `translateX(${100 * (index - slide)}%)`;
  });
};

const init = () => {
  createDots();
  activeDot(0);
  goToSlide(0);
};
init();

const nextSlide = () => {
  if (currentSlide === maxSlide - 1) currentSlide = 0;
  else currentSlide++;

  goToSlide(currentSlide);
  activeDot(currentSlide);
};

const prevSlide = () => {
  if (currentSlide === 0) currentSlide = maxSlide - 1;
  else currentSlide--;
  
  goToSlide(currentSlide);
  activeDot(currentSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') nextSlide();
  else if (e.key === 'ArrowLeft') prevSlide();
});

dotContainer.addEventListener('click', e => {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activeDot(slide);
  }
});

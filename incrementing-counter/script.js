// // First solution
// const counterTwitterEl = setInterval(counterTwitterIncrementing, 10);
// let counterTwitter = 0;
// function counterTwitterIncrementing() {
//   counterTwitter++;
//   document.querySelector('.twitter').innerHTML = counterTwitter;
//   if (counterTwitter == 1200) {
//     clearInterval(counterTwitterEl);
//   }
// }

// const counterYoutubeEl = setInterval(counterYoutubeIncrementing, 10);
// let counterYoutube = 0;
// function counterYoutubeIncrementing() {
//   counterYoutube++;
//   document.querySelector('.youtube').innerHTML = counterYoutube;
//   if (counterYoutube == 500) {
//     clearInterval(counterYoutubeEl);
//   }
// }

// const counterFacebookEl = setInterval(counterFacebookIncrementing, 10);
// let counterFacebook = 0;
// function counterFacebookIncrementing() {
//   counterFacebook++;
//   document.querySelector('.facebook').innerHTML = counterFacebook;
//   if (counterFacebook == 750) {
//     clearInterval(counterFacebookEl);
//   }
// }

// Second solution 

const countersEl = document.querySelectorAll('.counter');

countersEl.forEach((counterEl) => {
  counterEl.innerText = '0';
  const speed = 200;

  const updateCounter = () => {
    const target = +counterEl.getAttribute('data-target');
    const count = +counterEl.innerText;
    const increment = target / speed;


    if (count < target) {
      counterEl.innerText = `${Math.ceil(count + increment)}`;
      setTimeout(updateCounter, 10);
    } else {
      counterEl.innerText = target;
    }
  };
  updateCounter();
});

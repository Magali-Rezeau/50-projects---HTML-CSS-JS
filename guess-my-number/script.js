'use strict';
const body = document.querySelector('body');
const secretNumberEl = document.querySelector('.number');
const againBtn = document.querySelector('.btn.again');
const checkBtn = document.querySelector('.btn.check');
const guessEl = document.querySelector('.guess');
const scoreEl = document.querySelector('.score');
const highscoreEl = document.querySelector('.highscore');
const messageEl = document.querySelector('.message');

let score = 20;
let highscore = 0;

const getSecretNumber = () => Math.trunc(Math.random() * 20 + 1);
let secretNumber = getSecretNumber();

const displayMessage = (message) => {
  messageEl.textContent = message;
  ;
}

const resetGame = () => {
  secretNumber = getSecretNumber();
  secretNumberEl.textContent = '?';
  score = 20;
  scoreEl.textContent = 20;
  guessEl.value = '';
  body.style.backgroundColor = '#222';
  displayMessage('');
};

resetGame();

// const getSecretNumber = (min, max) => {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };
// const secretNumber = getSecretNumber(1, 20);

const checkHighscore = () => {
  if (score > highscore) {
    highscore = score;
    highscoreEl.textContent = highscore;
  }
};

const checkScore = (text) => {
  if (score > 0) {
    displayMessage(text);
    score -= 1;
    scoreEl.textContent = score;
  } else {
    displayMessage('💥 You lost the game');
  }
};

const winGame = () => {
  secretNumberEl.textContent = secretNumber;
  displayMessage('🎉 Correct number!');
  body.style.backgroundColor = '#60b347';
  checkHighscore();
};

const checkNumber = () => {
  const number = guessEl.value;
  if (!guessEl.value || guessEl.value > 20 || guessEl.value < 1) {
    displayMessage('Please enter a number between 1 and 20.');
  } else if (number > secretNumber) {
    checkScore('💥 Too hight');
  } else if (number < secretNumber) {
    checkScore('💥 Too low');
  } else {
    winGame();
  }
};

checkBtn.addEventListener('click', () => {
  checkNumber();
});

againBtn.addEventListener('click', () => {
  resetGame();
});

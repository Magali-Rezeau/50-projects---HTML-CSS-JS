const jokeEl = document.querySelector('.joke-box__text');
const btn = document.querySelector('.joke-box__btn');

async function sendRequest() {
  try {
    const reponse = await fetch('https://icanhazdadjoke.com', {
      headers: { 'Accept': 'application/json' }
    });
    const data = await reponse.json();
    jokeEl.innerText = data.joke;
  } catch (err) {
    err;
  }
}

btn.addEventListener('click', () => {
  sendRequest();
});


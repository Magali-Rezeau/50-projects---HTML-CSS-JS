const textarea = document.getElementById('textarea');
const tagsEl = document.getElementById('tags');

textarea.focus();
textarea.value = '';

textarea.addEventListener('keypress', e => {
  createElement(e.target.value);

  if (e.key === 'Enter') {
    setTimeout(() => {
      e.target.value = '';
    }, 10);
    randomSelectedElement();
  }

});

const createElement = (input) => {
  tagsEl.innerHTML = '';
  const tags = input.split(',').filter(tag => tag.trim()).map(tag => tag.trim());

  tags.forEach(tag => {
    const el = document.createElement('span');
    el.innerHTML = tag;
    el.classList.add('tag');
    tagsEl.appendChild(el);
  });

};

const randomSelectedElement = () => {
  const times = 30

  const interval = setInterval(() => {
    const randomTag = choiceRandomTag();
    changeColorTag(randomTag);

    setTimeout(() => {
      removeColorTag(randomTag)
    }, 100);

  }, 100);

  setTimeout(() => {
    clearInterval(interval)

    setTimeout(() => {
      const randomTag = choiceRandomTag();
      changeColorTag(randomTag)
    }, 100);

  }, times * 100);

};

const choiceRandomTag = () => {
  const tags = document.querySelectorAll('.tag');
  return tags[Math.floor(Math.random() * tags.length)];
};

const changeColorTag = (tag) => {
  tag.classList.add('highlight');
};

const removeColorTag = (tag) => {
  tag.classList.remove('highlight');
};

const codesEl = document.querySelectorAll('.code');

codesEl[0].focus();

codesEl.forEach((code, idx) => {
  
  code.addEventListener('keydown', e => {

    if (e.key >= 0 && e.key <= 9) {
      codesEl[idx].value = '';
      setTimeout(() => codesEl[idx + 1].focus(), 10);
    } else if (e.key === 'Backspace') {
      setTimeout(() => codesEl[idx - 1].focus(), 10);
    }

  });
});
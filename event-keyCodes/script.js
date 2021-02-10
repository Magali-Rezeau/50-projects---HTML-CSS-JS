window.addEventListener("keydown", e => {
  const output = document.getElementById('output');
  output.innerHTML = `
    <div class="key__content">
      <span>Key</span>
      <span>${e.key}</span>
    </div>
    <div class="key__content">
      <span>Code</span>
      <span>${e.code}</span>
    </div>
    `;
});

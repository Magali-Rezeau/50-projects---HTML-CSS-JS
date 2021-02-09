const btnSearch = document.querySelector('.search-bar__icon-search');
const searchBar = document.querySelector('.search-bar');
const input = document.querySelector('input');

btnSearch.addEventListener('click', () => {
  searchBar.classList.toggle('active');
  input.focus();
  // if (searchBar.classList.contains('active')) {
  //   searchBar.classList.remove('active');
  // } else {
  //   searchBar.classList.add('active');
  // }
  // input.focus();
});
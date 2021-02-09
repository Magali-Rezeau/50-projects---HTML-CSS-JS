const btnSearch = document.querySelector('.search-bar__icon-search');
const searchBar = document.querySelector('.search-bar');

btnSearch.addEventListener('click', () => {
  if (searchBar.classList.contains('active')) {
    searchBar.classList.remove('active');
  } else {
    searchBar.classList.add('active');
  }
});
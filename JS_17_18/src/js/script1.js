document.addEventListener("DOMContentLoaded", ready);
function ready() {
  var menu = document.querySelector('.menu__list');
  menu.addEventListener('mouseover', function(e) {
    e.preventDefault;
    if (e.target.className === 'menu__link') {
      e.target.style.backgroundColor = '#673AB7';
    }
  })
  menu.addEventListener('mouseout', function(e) {
    e.preventDefault;
    if (e.target.className === 'menu__link') {
      e.target.style.backgroundColor = '';
    }
  })
}

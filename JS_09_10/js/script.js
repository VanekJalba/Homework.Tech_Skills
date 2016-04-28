$(function() {
    /* jCarousel init */
    $('.jcarousel').jcarousel().jcarouselAutoscroll({
      interval: 10000,
      target: '+=1',
      autostart: true
    });
    $('.jcarousel-prev').jcarouselControl({
        target: '-=1'
    });
    $('.jcarousel-next').jcarouselControl({
        target: '+=1'
    });
    $('.jcarousel-pagination').jcarouselPagination({
        item: function(page) {
            return '<a href="#' + page + '">' + page + '</a>';
        }
    });
    /* Select plugin init */
    $('select').selectric();
    /* Custom checkboxes replaced with jQuery */
    var $labels = $('.input-jquery label');
    var $inputs = $labels.find('input');
    var $checked;
    var $disabled;
    var $span;
    var $input;
    $labels.each(function() {
        $(this).append('<span></span>');
        $(this).find('span').addClass('niceCheck');
        $input = $(this).find('input');
        $span = $(this).find('span');
        $checked = $input.attr('checked');
        $disabled = $input.attr('disabled');
        if ($checked && !$disabled) {
            $span.addClass('niceChecked');
        }
        if (!$checked && $disabled) {
            $span.addClass('niceDisabled');
        }
        if ($checked && $disabled) {
            $span.addClass('niceCheckedDisabled');
        }
        $input.hide();
    });
    $inputs.on('click', function() {
            $(this).parent().find('span').toggleClass('niceChecked');
        });
        /* Dropdown menu with jQuery */
    var $dropdown = $('.menu.jquery .dropdown');
    $dropdown.hover(function() {
        $(this).find('.submenu').eq(0).slideDown(400).animate({
            backgroundColor: '#E14B4B'
        }, {
            // queue: false,
            duration: 600
        });
    }, function() {
        $(this).find('.submenu').eq(0).slideUp(400).animate({
            backgroundColor: '#FF6464'
        }, {
            // queue: false,
            duration: 600
        });
    });
});
/* Dropdown menu with JavaScript only */

document.addEventListener('DOMContentLoaded', function() {

  var menu = document.querySelector('.menu.javaScript');
  var dropdown = menu.querySelectorAll('.dropdown');
  var submenu = menu.querySelectorAll('.submenu');
// Добавляем атрибут уровня для определения направления движения
  dropdown[0].setAttribute('data-level', 0);
  for (var i = 0; i < dropdown.length; i++) {
    submenu[i].setAttribute('data-level', i+1);
    var submenuChildren = dropdown[i].querySelectorAll('li');
    for (var x = 0; x < submenuChildren.length; x++) {
      submenuChildren[x].setAttribute('data-level', i+1);
    }
  }
  // Ловим событие mouseover над а внутри li.dropdown. Показываем меню - правого
  // соседа submenu
  var parentInTo, parentInFrom, childMenuIn, levelInTo, levelInFrom;
  menu.addEventListener('mouseover', function(e) {
    parentInTo = e.target.parentNode;
    parentInFrom = e.relatedTarget.parentNode;
    if ((parentInTo.className === 'dropdown')) {
      childMenuIn = e.target.nextElementSibling;
      childMenuIn.style.display = "block";
      slideUp(childMenuIn);
    }
  });
// Ловим событые mouseout при переходе с большего levela на меньший и
// при выходе из тела меню
  var parentOutTo, parentOutFrom, levelOutTo, levelOutFrom;
  menu.addEventListener('mouseout', function(e) {
    parentOutTo = e.relatedTarget.parentNode;
    levelOutTo = parentOutTo.getAttribute('data-level');
    parentOutFrom = e.target.parentNode;
    levelOutFrom = parentOutFrom.getAttribute('data-level');
    // Прячем при выходе из тела меню
    if ((levelOutTo === null) && (levelOutTo !== levelOutFrom)) {
      for (var y = 0; y < submenu.length; y++) {
        submenu[y].style.display = "none";
        submenu[y].style.height = "auto";
      }
    }
    // Прячем меню-правого соседа при уходе курсора с dropdown левого соседа
    if (parentOutFrom.className === 'dropdown' && parentOutTo.className !== 'dropdown' && levelOutFrom === levelOutTo && parentOutTo.className !== 'submenu') {
      slideDown(e.target.nextElementSibling);
    }
    // Прячем при при переходе с большего уровня наменьший
    if ((levelOutTo < levelOutFrom) && (levelOutTo !== null)) {
      if (e.target.parentNode.className === 'submenu') {
        slideDown(e.target.parentNode);
        for (var z = levelOutTo; z < submenu.length; z++) {
          submenu[z].style.display = "none";
          submenu[z].style.height = "auto";
        }
      }
    }
  });

  // Блок анимации slideUp / slideDown
var duration = 300;
var fps = 15;
var frameRate = duration / fps;
var oldHeight, height, step;

  function slideUp(el) {
    oldHeight = parseInt(getComputedStyle(el).height);
    el.style.height = 0;
    height = 0;
    step = oldHeight / 20;
    el.style.overflow = 'hidden';
    var timer = setInterval (function(){
      el.style.height = height + 'px';
      if (height >= oldHeight) {
        clearInterval(timer);
        el.style.overflow = 'visible';
        el.style.height = 'auto';
      } else {
        height = Math.round((height + step) * 100) / 100;
      }
    }, frameRate);
  }

  function slideDown(el) {
    height = parseInt(getComputedStyle(el).height);
    step = height / 20;
    el.style.overflow = 'hidden';
    var timer = setInterval (function(){
      el.style.height = height + 'px';
      if (height === 0 || height < 0) {
        el.style.overflow = 'visible';
        el.style.display = "none";
        el.style.height = 'auto';
        clearInterval(timer);
      } else {
        height = Math.round((height - step) * 100) / 100;
      }
    }, frameRate);
  }
});

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
  console.log('DOM is loaded');
  var dropdown = document.querySelectorAll('.menu.javaScript .dropdown');
  /* Должна быть функция анимации slideUp (фактическая высота элемента кэшируется,
текущая ставится в ноль и через setInterval плавно увеличиваем высоту до
фактической)
Проблема в том, что hover срабатывает не только на ul но и на каждом li в нем.
Если отменить всплытие, то при уходе курсора с первого li происходит mouseout
и ul исчезает*/
  function slideUp(el) {
    var elHeight = getComputedStyle(el).height;
    console.log('element ', el, ' height=',elHeight);
  }
  /* Конец функции slideUp */
  for (var i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener('mouseover', function(e) {
      this.querySelector('.submenu').style.display = "block";
      /* Отправляем  на анимацию вложенный ul.submenu*/
      slideUp(this.querySelector('.submenu'));
    });
    dropdown[i].addEventListener('mouseout', function(e) {
      this.querySelector('.submenu').style.display = "none";
    });
  }
})

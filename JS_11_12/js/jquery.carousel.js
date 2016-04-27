(function($) {

  // Резиновая карусель с минимальным функционалом. При инициализации задаем
  // количество слайдов для показа. Работает для простой структуры: ul.jcarousel>li>img
  // В перспективе можно добавить бесконечный скролл, чекбоксы для переключения
  // между слайдами, добавить больше настроек для внешнего вида

  $.fn.jcarousel = function (options) {
    var $carousel = this;
    var defaults = {
      showItems : 3 // Количество слайдов для показа по умолчанию
    }
    var settings = $.extend(defaults, options);
    // Обертываем ul в два diva
    $carousel.wrap('<div class="jcarousel-wraper"><div class="jcarousel-overflow"></div></div>');

    var $carouselItems = $carousel.find('li');
    $carouselItems.addClass('jcarousel-item');
    var elementsCount = $carouselItems.length; // Определяем сколько слайдов всего

// Логика расчета резиновой ширины следующая: например у нас пять слайдов
// ширина "ленты" 100% * 5 = 500%, окно с overflow: hidden задается через min max width
// ширина одного слайда берется из расчета того, сколько их нужно показать в окне:
// 100% / 5 = 20% ширина одного слайда на все окно. У нас показывается три слайда,
// и мы уменьшаем в три раза ширину, чтобы их уместить: 20% / 3 = 6,666666666666667%
    $carousel.css('width', (100 * elementsCount) + '%');
    $carouselItems.css('width', (100 / elementsCount) / settings.showItems + '%');

// Прирост шага зависит от количества показываемых слайдов. Задается в процентах
// чтобы сохранить резиновость карусели
    var step = 0;
    var firstStep = (100 / settings.showItems);

// Управление генерируем и добавляем скриптом
    var $left = $('<a class="jcarousel-left" href="#">');
    $carousel.closest('.jcarousel-wraper').append($left);
    $left.click(function(e) {
      e.preventDefault();
      if (step > (-(elementsCount - settings.showItems) * firstStep)) {
        step -= firstStep;
        $carousel.animate({
          left : step + '%'
        }, 500);
      }
    });

    var $right = $('<a class="jcarousel-right" href="#">');
    $carousel.closest('.jcarousel-wraper').append($right);
    $right.click(function(e) {
      e.preventDefault();
      if (step < 0) {
        step += firstStep;
        $carousel.animate({
          left : step + '%'
        }, 500);
      }
    });

    return this;
  }
}) (jQuery);

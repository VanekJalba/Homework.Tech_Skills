// Возведение целого числа base в целую степень exponent
var app = {
  pow:
  function (base, exponent) {
    // Проверка введенных данных на соответствие целому числу
    if (!app.checkNatural(base) || !app.checkNatural(exponent) || !app.isNumeric(base) || !app.isNumeric(exponent)) {
      return NaN;
    }
    var result = base;
    // Циклом умножаем основание на себя |exponent|-раз
    for (var i = 1; i < Math.abs(exponent); i++) {
      result *= base;
    }
    // Учитываем отрицательную степень. Если степень отрицательная, то 1/result
    if (exponent < 0) {
      result = (1 / result).toFixed(2);
    } else if (( +base != 0) && (+exponent === 0)) { // Если степень равна нулю, то результат всегда равен 1
      result = 1;
    }
    return result;
    },
    isNumeric: // Проверка на число
    function(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    checkNatural:
    // Проверка на наличие дробной части
    function (x) {
      return (parseInt(x) == x);
    },
    start: function() {
      // Блок выполнения. Запрос данных
      var num = prompt('Введите целое значение основания:', '');
      var exp = prompt('Введите целое значение степени:', '');
      app.result(num, exp);
    },
    result: function(num, exp){
      // Если результат функции - число, то выводим
      if (app.isNumeric(app.pow(num, exp))) {
        alert(num + ' ^ ' + exp + ' = ' + app.pow(num, exp));
      } else { //Иначе сообщение об ошибке
        alert('Что-то пошло не так! Проверьте введенные данные');
      }
    }
}
try {
  module.exports = app;
} catch (e) {}

// Возведение целого числа base в целую степень exponent
function pow(base, exponent) {
// Проверка введенных данных на соответствие целому числу
  if (!checkNatural(base) || !checkNatural(exponent) || !isNumeric(base) || !isNumeric(exponent)) {
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
}
// Проверка на число
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// Проверка на наличие дробной части
function checkNatural(x) {
  return (parseInt(x) == x);
}
// Блок выполнения. Запрос данных
var num = prompt('Введите целое значение основания:', '');
var exp = prompt('Введите целое значение степени:', '');
// Если результат функции - число, то выводим
if (isNumeric(pow(num, exp))) {
  console.log(num + ' ^ ' + exp + ' = ' + pow(num, exp));
} else { //Иначе сообщение об ошибке
  console.log('Что-то пошло не так! Проверьте введенные данные');
}

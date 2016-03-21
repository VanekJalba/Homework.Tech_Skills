// Создание массива имен. Проверка на соответствие переменной с элементом массива
var name;
var userNames = [];
// Заполняем массив с именами
for (var count = 0; count < 5; count++) {
name = prompt('Введите имена пользователей '+ (count+1)+' из 5'+':', '');
userNames.push(name);
}
// Запрос имени для сравнения
  var login = prompt('Для входа введите имя пользователя:', '');
  // Перебор массива циклом
  for (var i = 0; i < userNames.length; i++) {
    if (login === userNames[i]) {
      var enter = true; //Переключатель
      break; //Выходим и запоминаем номер элемента массива
    }
  }
  // Если переключатель - true, то приветствуем
  if (enter) {
      alert(login + ', вы успешно вошли');
  } else {
    alert('Access denied!');
  }

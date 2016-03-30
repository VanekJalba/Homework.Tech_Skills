var form = {
  action: 'index.html',
  title: 'Тест по программированию',
  boxNumber: 3,
  questionNumber: 3,
  submitText: 'Проверить мои результаты',
  create: function() {
    // Подключаем Bootstrap
    this.addBootstrap();
    // Форма
    var form = document.createElement('form');
    form.className = 'container';
    form.action = this.action;
    form.method = 'get';
    form.style.width = '800px';
    // Заголовок формы
    var p = document.createElement('p');
    p.className = 'text-center';
    p.innerHTML = this.title;
    p.style.paddingTop = '10px';
    p.style.paddingBottom = '20px';
    form.appendChild(p);
    // Поле с вопросами
    var fieldset = document.createElement('fieldset');
    fieldset.style.marginLeft = '100px';
    // Из переменной boxNumber берем количество вопросов
    for (var x = 1; x <= this.boxNumber; x++) {
      var p = document.createElement('p');
      p.className = 'questionTitle';
      p.innerHTML = x + '. Вопрос №' + x;
      fieldset.appendChild(p);
      // Из переменной questionNumber берем количество ответов
      for (var i = 1; i <= this.questionNumber; i++) {
        var div = document.createElement('div');
        div.className = 'checkbox';
        div.style.marginLeft = '25px';
        var label = document.createElement('label');
        var input = document.createElement('input');
        input.type = 'checkbox';
        input.name = 'question' + x;
        input.value = i;
        input.className = 'bg-info';
        var span = document.createTextNode('Вариант ответа №'+i);
        label.appendChild(input);
        label.appendChild(span);
        div.appendChild(label);
        fieldset.appendChild(div);
      }
      form.appendChild(fieldset);
    }
    // Кнопка
    var submit = document.createElement('input');
    submit.type = 'submit';
    submit.className = 'btn btn-info center-block';
    submit.value = this.submitText;
    submit.style.marginTop = '50px';
    submit.style.marginBottom = '50px';
    form.appendChild(submit);
    document.body.insertBefore(form, document.body.firstChild);
  },
  addBootstrap: function () {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/bootstrap.min.css';
    var insertPoint = document.getElementsByTagName('head')[0];
    insertPoint.appendChild(link);

  }
}
form.create();

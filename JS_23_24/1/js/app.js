requirejs.config({
  baseUrl: 'js/modules',
  paths: {
    'jquery': 'https://code.jquery.com/jquery-2.2.4.min',
    'tmpl': '../libs/microTemplates'
  },
  shim: {
    'tmpl': {
      exports: 'tmpl'
    }
  }
})
require (
  ['jquery', 'tmpl', 'Model', 'View', 'Controller'],
  function ($, tmpl, Model, View, Controller) {
    var firstToDoList = ['learn javascript', 'learn html', 'make coffee'];
    var model = new Model(firstToDoList);
    var view = new View(model);
    var controller = new Controller(model, view);
  }
)

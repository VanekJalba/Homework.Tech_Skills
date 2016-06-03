define(
  'View',
  [],
  function () {
    return function(model, data) {
      var self = this;
        function init() {
        var wrapper = tmpl($('#wrapper-template').html());
        $('body').append(wrapper);
        self.elements = {
          input: $('.item-value'),
          listContainer: $('.item-list')
        };
        self.renderList(model.data);
      }
      self.renderList = function (data) {
        var list = tmpl($('#list-template').html(), {data: data});
        self.elements.listContainer.html(list);
      }
      self.showEditBox = function (target, text) {
        var editBox = tmpl($('#edit-box-template').html(), {text: text});
        target.html(editBox);
        target.find('.item-edit-input').focus();
      }
      init();
    }
  }
)

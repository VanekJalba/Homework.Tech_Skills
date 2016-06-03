define(
  'Controller',
  [],
  function () {
    return function(model, view) {
      var self = this;
      view.elements.listContainer.on('click', '.item-delete', removeItem);
      view.elements.listContainer.on('dblclick', '.item-text', showEditBox);
      view.elements.listContainer.on('focusout', '.item-edit-input', editItemOk);
      view.elements.listContainer.on('keyup', '.item-edit-input', editEnterEvent);
      view.elements.input.on('keyup', newEnterEvent);

      function editEnterEvent(e) {
        if (e.keyCode === 13) {
          e.target.blur();
        }
      }
      function newEnterEvent(e) {
        if (e.keyCode === 13) {
          addItem();
          e.target.blur();
        }
      }
      function addItem() {
        var newItem = view.elements.input.val();
        model.addItem(newItem);
        view.renderList(model.data);
        view.elements.input.val('');
      }
      function removeItem() {
        var item = $(this).parent().attr('data-value');
        model.removeItem(item);
        view.renderList(model.data);
        model.itemUnderEdit = '';
      }
      function showEditBox() {
        if (model.itemUnderEdit.length > 0) {
          return;
        }
        var itemParent = $(this);
        var item = itemParent.parent().attr('data-value');
        view.showEditBox(itemParent, item);
        model.itemUnderEdit = item;
        itemParent.parent().attr('data-can-edit', false);
      }
      function editItemOk() {
        var item = model.itemUnderEdit;
        var newItem = $(this).val();
        if (newItem.length === 0) {
          model.itemUnderEdit = '';
          view.renderList(model.data);
          return;
        }
        model.editItem(item, newItem);
        view.renderList(model.data);
        model.itemUnderEdit = '';
      }
      function editItemCancel() {
        view.renderList(model.data);
        model.itemUnderEdit = '';
      }
    }
  }
)

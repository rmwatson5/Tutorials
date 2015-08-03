/**** Backbone Implimimitation for Grocery Items *******/
var GroceryItem = Backbone.Model.extend({});

var GroceryListItemView = Backbone.View.extend({
  template: void 0,
  initialize: function(options){
    var panelTemplate = $('#panelTemplate');
    this.template = _.template(panelTemplate.html());
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

var initializeBackbone = function(data){
  var $groceryListContainer = $('#elementPlaceholder');
  var groceryItem = new GroceryItem({itemName: 'Milk', inCart: true});
  var groceryListItemView = new GroceryListItemView({model: groceryItem});
  groceryListItemView.render();
  $groceryListContainer.html(groceryListItemView.$el.html());
}

$(document).ready(function (){
    initializeBackbone();
});

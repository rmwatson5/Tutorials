/**** Backbone Implimimitation for Grocery Items *******/
var GroceryItem = Backbone.Model.extend({
  defaults: {
    itemName: "",
    selected: false
  }
});

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

var GroceryListCollection = Backbone.Collection.extend({});

var GroceryListCollectionView = Backbone.View.extend({
  initialize: function(options){
    this.$el = options.$el;
    this.collection.on('reset', this.render, this);
  },
  render: function(){
    this.$el.children().remove();
    this.collection.forEach(this.appendGroceryItem, this);
  },
  appendGroceryItem: function(groceryItem){
    var groceryListItemView = new GroceryListItemView({model: groceryItem});
    groceryListItemView.render();
    this.$el.append(groceryListItemView.$el.html());
  }
});

var initializeBackbone = function(data){
  var $groceryListContainer = $('#elementPlaceholder');
  var $resetButton = $('#reset');

  var groceryListCollection = new GroceryListCollection();
  var groceryListCollectionView = new GroceryListCollectionView({collection: groceryListCollection, $el: $groceryListContainer});

  groceryListCollection.reset(data);
  $resetButton.click(function(){
    groceryListCollection.reset(data)
  });
}

var startAjaxCall = function(){
  $.ajax({
    url: 'http://tutorials.sitesbyrobert.com/testdata/grocerylistresponse.js',
    type: 'GET',
    crossDomain: true,
    dataType: 'json',
    success: function(data){
      initializeBackbone(data);
    },
    error: function(xhr, textStatus, errorThrown){
      console.log('xhr:', xhr);
      console.log('textStatus: ', textStatus);
      console.log('Error Thrown: ', errorThrown);
    }
  });
}

$(document).ready(function (){
    startAjaxCall();
});

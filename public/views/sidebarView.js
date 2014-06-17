var SidebarView = Backbone.View.extend({
  initialize: function(options) {
    this.state = options.state;
    
    this.listenTo(this.state, "change:activePageID", this.changeActivePageID);

    this.render();
  },
  
  tagName: 'div',
  id: 'sidebaraaaa',
  sidebarCatHeadingTemplate: _.template($("#sidebarCatHeadingTemplate").html()),
  
  render: function() {
    var self = this,
        pages = this.collection,
        sidebarMarkup = 'aaaaaa';
    
    // Remove any markup that might already be here.
    this.$el.html('');

    // Get all categories.
    var categories = _.uniq( pages.pluck('category') );

    // Build each category.
    _.each(categories, function(cat){
      // Build a new collection of pages in this category.
      var catPages = new Pages(
        pages.where({
          category: cat,
        })
      );

      self
        .renderTitle(cat)
        .renderPagelists(catPages);
    });
    
    return this;
  },

  // Render the provided category title.
  renderTitle: function(cat) {
    var templ = this.sidebarCatHeadingTemplate;
    this.$el.append( templ({title: cat}) );
    
    return this;
  },
  
  // Render the provided pages into an UL.
  renderPagelists: function(catPages) {
    // Sort the given pages by their 'order' attribute.
    var catPages = new Pages(
      catPages.sortBy(function(page) {
        return page.get("order");
      })
    );

    catPages.each(function(page){
      // Create a new micro-view for each page item in the list.
      var sidebarPageItemMicroView = new SidebarPageItemMicroView({
        state: this.state,
        model: page,
      });

      // Render the micro-view and attach to the end of our $el.
      this.$el.append(sidebarPageItemMicroView.render().el);
    }, this);
    
    return this;
  },
  
  changeActivePageID: function() {
    if (this.state.get('activePageID') == this.model.get('id')) {
      this.$el.addClass('selected');
    }
    else {
      this.$el.removeClass('selected');
    }
  },

});


// Micro views - only here so we can attach events to the corresponding items 
// without storing data (such as model ID) in the DOM.

var SidebarPageItemMicroView = Backbone.View.extend({

  sidebarPageItemTemplate: _.template($("#sidebarPageItemTemplate").html()),
  tagName:   "ul",

  events: {
    'click' : 'setActive',
  },
  
  initialize: function(options) {
    this.state = options.state;
  },

  render: function() {
    this.$el.html( this.sidebarPageItemTemplate(this.model.toJSON()) );
    
    return this;
  },
  
  setActive: function() {
    var modelId = this.model.get('id');
    this.state.set('activePageID', modelId);
  },

});

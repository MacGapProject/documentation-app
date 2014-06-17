var PageView = Backbone.View.extend({
  initialize: function(options) {
    this.render();
  },

  tagName:   "div",
  className: "pageDetail",
    
  template: $("#pageViewTemplate").html(),

  // Render the page. The page content is stored as markup, so we will use the
  // 'marked' library to render it to HTML for us.
  //
  // e.g. console.log(marked('I am using __markdown__.'));
  render: function() {
    var templ = _.template(this.template);
    this.$el.html(templ(this.model.toJSON()));
    
    return this;
  },
});

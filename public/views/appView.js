var AppView = Backbone.View.extend({
  initialize: function() {  
    var self = this;

    this.setup_MacGap();
      
    // Initialise the state model (for preferences and
    // maintaining app state between launches).
    //
    // Use ID 1 as per
    //   https://github.com/jeromegn/Backbone.localStorage/issues/56
    this.state = new State({id: 'state'});
    
    // Create a collection containing all the documentation pages (each page is
    // a backbone model).
    this.pages = new Pages();

    // Instantiate the sidebar view, which in turn will instantiate the main
    // page view.
    this.sidebarView = new SidebarView({
      state: this.state,
      collection: this.pages,
    });
    
    // We have a local copy of the MacGap 2 documentation git repo. Check
    // whether it is up to date and if not, do a git pull.
    this.pages.updateRepo();
  },
  
  setup_MacGap: function() {
    var self = this;
    
    // Listen to the MacGap events we're interested in.    
    document.addEventListener('appActivated', function(e) {
      if (e.data.localizedName == 'MacGap') {
        $('body').addClass('app-active');
      }
      else {
        $('body').removeClass('app-active');
      }
    }, true);
    
    // Set up our app's menus.
    // @todo
    
  },
});
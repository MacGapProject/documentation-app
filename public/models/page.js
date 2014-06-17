// The Page model is used to hold an individual documentation page.
var Page = Backbone.Model.extend({
});

var Pages = Backbone.Collection.extend({
  gitRepoPath: 'documentation/_posts',
  
  model: Page,
  
  initialize: function() {
    // Read all the documentation pages out of the local GIT repo and create a
    // page model for each one.
    this.createPageModelsFromRepo();
  },
  
  createPageModelsFromRepo: function() {
    // Dummy content for now. Deliberately out-of-order to test the view's
    // sorting code.
    this.add([
      {title: "Contributing to MacGap", category: "doc", order: 10},
      {title: "Dialog", category: "ref", order: 40},
      {title: "Notify", category: "ref", order: 140},
      {title: "App Configuration", category: "doc", order: 2},
    ]);
  },
  
  // Check whether the local copy of the documentation GIT repo is up-to-date.
  updateRepo: function() {
    
  },

  
});

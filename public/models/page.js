// The Page model is used to hold an individual documentation page.

var Page = Backbone.Model.extend({
});


var Pages = Backbone.Collection.extend({
  gitBinPath: MacGap.resourcePath + '/bin/git',
  gitRepoPath: MacGap.libraryPath + '/Application Support/MacGap Documentation/repo',
  
  model: Page,
  
  initialize: function() {
    // Read all the documentation pages out of the local GIT repo and create a
    // page model for each one.
    if (this.checkLocalRepoExists()) {
      // Turn the files into Backbone page models.
      this.createPageModelsFromRepo();
    }
    else {
      // Pull in the repository, using our app's git binary.
      this.initialiseRepo({
        success: this.createPageModelsFromRepo,
      });
    }
  },
  
  checkLocalRepoExists: function() {
    return MacGap.File.fileExistsAtPath(this.gitRepoPath);
  },

  initialiseRepo: function() {
    MacGap.notify({
      title: 'Initialising Repository',
      content: 'The repository is being pulled to ' + this.gitRepoPath,
    });
    
//    var gitTask = MacGap.Task.create(this.gitBinPath, this.gitTaskComplete);
//    gitTask.arguments = ['status'];

    var gitTask = MacGap.Task.create('/bin/sh', this.gitTaskComplete);
    gitTask.arguments = ['ls'];

    console.log(gitTask);
    gitTask.launch();
    
  },
  
  gitTaskComplete: function() {
    console.log(arguments);
    alert('git done');
  },
  
  createPageModelsFromRepo: function() {
    // Dummy content for now. Deliberately out-of-order to test the view's
    // sorting code.
    
/*
    this.collection.add([
      {title: "Contributing to MacGap", category: "doc", order: 10},
      {title: "Dialog", category: "ref", order: 40},
      {title: "Notify", category: "ref", order: 140},
      {title: "App Configuration", category: "doc", order: 2},
    ]);
*/
    
  },
  
  // Check whether the local copy of the documentation GIT repo is up-to-date.
  updateRepo: function() {
    
  },

  
});

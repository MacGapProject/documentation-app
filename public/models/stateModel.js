var State = Backbone.Model.extend({
  initialize: function() {
    var self = this;
    this.on("change", this.stateChanged, this);
    
    // Be notified when the user defaults are changed. To see what was changed,
    // we store a local snapshot of the keys of interest and compare to it.
    document.addEventListener('userDefaultsChanged', function(e) {
        self.userDefaultsChanged(e.data);
    }, true);

  },
    
  stateChanged: function(model, options) {        
    // Save to MacGap's user defaults.
  },

  userDefaultsChanged: function(userDefaults) {
    // console.log(userDefaults);
    
  },
});

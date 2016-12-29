Template.storySettings.onCreated(function() {
  Session.set('storyEditErrors', {});
});

Template.storySettings.helpers({
  errorMessage: function(field) {
    return Session.get('storyEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('storyEditErrors')[field] ? 'has-error' : '';
  }
});

Template.storySettings.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentStoryId = this._id;

    var storyProperties = {
      title: $(e.target).find('[name=title]').val()
    }

    var errors = validateStory(storyProperties);
    if (errors.title)
      return Session.set('storyEditErrors', errors);

    Stories.update(currentStoryId, {$set: storyProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('storyEdit', {_id: currentStoryId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this story?")) {
      var currentStoryId = this._id;
      Stories.remove(currentStoryId);
      Router.go('storiesList');
    }
  }
});

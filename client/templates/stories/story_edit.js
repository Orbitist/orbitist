Template.storyEdit.onCreated(function() {
  Session.set('storyEditErrors', {});
});

Template.storyEdit.helpers({
  errorMessage: function(field) {
    return Session.get('storyEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('storyEditErrors')[field] ? 'has-error' : '';
  }
});

Template.storyEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentStoryId = this._id;

    var storyProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    }

    var errors = validateStory(storyProperties);
    if (errors.title || errors.url)
      return Session.set('storyEditErrors', errors);

    Stories.update(currentStoryId, {$set: storyProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('storyPage', {_id: currentStoryId});
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

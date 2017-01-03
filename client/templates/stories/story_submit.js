Template.storySubmit.onCreated(function() {
  Session.set('storySubmitErrors', {});
});

Template.storySubmit.helpers({
  errorMessage: function(field) {
    return Session.get('storySubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('storySubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.storySubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var story = {
      title: $(e.target).find('[name=title]').val()
    };

    var errors = validateStory(story);
    if (errors.title || errors.url)
      return Session.set('storySubmitErrors', errors);

    Meteor.call('storyInsert', story, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);

      Session.set('storyMenu', 'false');
      Router.go('storyEdit', {_id: result._id});
    });
  }
});

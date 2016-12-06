Template.tileSubmit.onCreated(function() {
  Session.set('tileSubmitErrors', {});
});

Template.tileSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('tileSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('tileSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.tileSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $body = $(e.target).find('[name=body]');
    var tile = {
      body: $body.val(),
      postId: template.data._id
    };

    var errors = {};
    if (! tile.body) {
      errors.body = "Please write some content";
      return Session.set('tileSubmitErrors', errors);
    }

    Meteor.call('tileInsert', tile, function(error, tileId) {
      if (error){
        throwError(error.reason);
      } else {
        $body.val('');
      }
    });
  }
});

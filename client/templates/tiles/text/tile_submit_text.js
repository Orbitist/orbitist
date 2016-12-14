Template.tileSubmitText.onCreated(function() {
  Session.set('tileSubmitErrors', {});
});

Template.tileSubmitText.helpers({
  errorMessage: function(field) {
    return Session.get('tileSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('tileSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.tileSubmitText.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $text = $(e.target).find('[name=text]');
    var tile = {
      tileType: 'text',
      text: $text.val(),
      storyId: template.data._id
    };

    var errors = {};
    if (! tile.text) {
      errors.text = "Please write some content";
      return Session.set('tileSubmitErrors', errors);
    }

    Meteor.call('tileInsert', tile, function(error, tileId) {
      if (error){
        throwError(error.reason);
      } else {
        $text.val('');
        Session.set('tileMenu', 'false');
      }
    });
  }
});
